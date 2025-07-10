const express = require('express');
const EmailService = require('./EmailService');

const app = express();
app.use(express.json());

const emailService = new EmailService();

app.post('/send-email', async (req, res) => {
  const { to, subject, body } = req.body;
  if (!to || !subject || !body) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const result = await emailService.sendEmail(to, subject, body);
  res.json(result);
});


app.get('/', (req, res) => {
  res.send('Email Service Running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
