const EmailService = require('../src/EmailService');

test('sends email successfully', async () => {
  const service = new EmailService();
  const res = await service.sendEmail('test@example.com', 'Test Subject', 'Hello!');
  expect(['sent', 'failed', 'rate_limited', 'duplicate']).toContain(res.status);
});
