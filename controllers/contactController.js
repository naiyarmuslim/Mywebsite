const fs = require('fs');
const path = require('path');

const STORE_PATH = path.join(__dirname, '..', 'data', 'contact-submissions.json');

function readSubmissions() {
  try {
    return JSON.parse(fs.readFileSync(STORE_PATH, 'utf8'));
  } catch {
    return [];
  }
}

function submitContact(req, res) {
  const { name, email, subject, message } = req.validated;

  const entry = {
    name,
    email,
    subject: subject || '(no subject)',
    message,
    receivedAt: new Date().toISOString(),
  };

  const submissions = readSubmissions();
  submissions.push(entry);
  fs.writeFileSync(STORE_PATH, JSON.stringify(submissions, null, 2));

  console.log(`[contact] new message from ${entry.name} <${entry.email}>`);

  res.status(200).json({ ok: true, message: "Message sent! I'll get back to you within 24 hours." });
}

module.exports = { submitContact };
