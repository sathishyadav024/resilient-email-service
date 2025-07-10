const MockProviderA = require('./providers/MockProviderA');
const MockProviderB = require('./providers/MockProviderB');
const retry = require('./utils/Backoff');
const RateLimiter = require('./utils/RateLimiter');

class EmailService {
  constructor() {
    this.providerA = new MockProviderA();
    this.providerB = new MockProviderB();
    this.sentEmails = new Set(); // for idempotency
    this.rateLimiter = new RateLimiter(5, 60000); // 5 emails per minute
  }

  async sendEmail(to, subject, body) {
    const idempotentKey = `${to}-${subject}-${body}`;
    if (this.sentEmails.has(idempotentKey)) {
      return { status: 'duplicate', message: 'Email already sent' };
    }

    if (!this.rateLimiter.isAllowed()) {
      return { status: 'rate_limited', message: 'Too many requests' };
    }

    try {
      const response = await retry(() => this.providerA.sendEmail(to, subject, body));
      this.sentEmails.add(idempotentKey);
      return { ...response, attempts: 1 };
    } catch (errA) {
      try {
        const response = await retry(() => this.providerB.sendEmail(to, subject, body));
        this.sentEmails.add(idempotentKey);
        return { ...response, attempts: 2 };
      } catch (errB) {
        return { status: 'failed', message: 'All providers failed' };
      }
    }
  }
}

module.exports = EmailService;
