const express = require('express');
const rateLimit = require('express-rate-limit');
const { validateBody } = require('../middleware/whitelist');
const contactController = require('../controllers/contactController');

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: 'Too many requests. Please try again later.' },
});

// Whitelist: only these fields, only these character sets, are ever accepted.
const contactSchema = {
  name: {
    required: true,
    maxLength: 80,
    pattern: /^[\p{L}\p{M} '.-]{1,80}$/u,
    message: 'Name may only contain letters, spaces, hyphens and apostrophes.',
  },
  email: {
    required: true,
    maxLength: 254,
    pattern: /^[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9-]{1,63}(\.[a-zA-Z0-9-]{1,63})+$/,
    message: 'Please provide a valid email address.',
  },
  subject: {
    required: false,
    maxLength: 150,
    pattern: /^[\p{L}\p{N} '".,!?()&/:-]{1,150}$/u,
    message: 'Subject contains characters that are not allowed.',
  },
  message: {
    required: true,
    maxLength: 2000,
    pattern: /^[\p{L}\p{N}\s'".,!?()&/:;@%-]{1,2000}$/u,
    message: 'Message contains characters that are not allowed.',
  },
};

router.post('/contact', contactLimiter, validateBody(contactSchema), contactController.submitContact);

module.exports = router;
