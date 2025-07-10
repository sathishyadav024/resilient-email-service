
# Resilient Email Sending Service 

A mock email-sending service built using Node.js and Express, designed for reliability and fault tolerance. This was developed as part of an internship task and demonstrates features like retry logic, fallback providers, idempotency, and rate limiting.

## 🚀 Features

- ✅ **Retry logic** with exponential backoff
- 🔁 **Fallback** to alternate email provider
- 🧠 **Idempotency** – prevents duplicate emails
- ⏱️ **Rate limiting** – caps requests per minute
- 📊 **Status tracking** – shows which provider was used and how many attempts


---

## 🛠️ Technologies Used

- Node.js
- Express.js
- Jest (unit testing)
- Mock email providers (custom modules)

---

## 📦 Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/<your-username>/resilient-email-service.git
cd resilient-email-service

INSTALL DEPENDENCIES :

npm install

START THE SERVER     :

npm start
```

## How to Test Locally - use curl
```
curl -X POST http://localhost:3000/send-email \
  -H "Content-Type: application/json" \
  -d '{"to": "test@example.com", "subject": "Test", "body": "Hello"}'


```

## Live Demo (Hosted on Render)

```
curl -X POST https://resilient-email-service-r8dv.onrender.com/send-email \
  -H "Content-Type: application/json" \
  -d '{"to": "live@example.com", "subject": "Live Test", "body": "Testing from Render!"}'
```

## ✅ Assumptions

- Emails with the same to, subject, and body are considered duplicates.

- Each provider randomly simulates failure for testing retry/fallback.

- Rate limit: max 5 requests per minute.




