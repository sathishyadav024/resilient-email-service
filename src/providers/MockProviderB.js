class MockProviderB {
  async sendEmail(to, subject, body) {
    console.log(`[MockProviderB] Sending email to ${to}`);
    if (Math.random() < 0.3) throw new Error("MockProviderB failed");
    return { status: "sent", provider: "MockProviderB" };
  }
}
module.exports = MockProviderB;
