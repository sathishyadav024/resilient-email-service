class MockProviderA {
  async sendEmail(to, subject, body) {
    console.log(`[MockProviderA] Sending email to ${to}`);
    if (Math.random() < 0.5) throw new Error("MockProviderA failed");
    return { status: "sent", provider: "MockProviderA" };
  }
}
module.exports = MockProviderA;
