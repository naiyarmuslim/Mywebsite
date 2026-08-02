/**
 * Whitelist-based request validation.
 *
 * Every field must be explicitly declared with an allow-pattern; anything
 * not declared (extra keys, wrong type, disallowed characters) is rejected.
 * We never try to strip/escape "bad" characters (blacklisting) — we only
 * accept input that already matches a known-good shape.
 */

function validateBody(schema) {
  const allowedKeys = Object.keys(schema);

  return (req, res, next) => {
    const body = req.body && typeof req.body === 'object' ? req.body : {};
    const incomingKeys = Object.keys(body);

    const unknownKeys = incomingKeys.filter((k) => !allowedKeys.includes(k));
    if (unknownKeys.length > 0) {
      return res.status(400).json({
        ok: false,
        error: 'Unrecognized field(s) in request.',
        fields: unknownKeys,
      });
    }

    const errors = {};
    const clean = {};

    for (const key of allowedKeys) {
      const rule = schema[key];
      const raw = body[key];
      const value = typeof raw === 'string' ? raw.trim() : raw;

      if (value === undefined || value === '' || value === null) {
        if (rule.required) errors[key] = 'This field is required.';
        continue;
      }

      if (typeof value !== 'string') {
        errors[key] = 'This field must be text.';
        continue;
      }

      if (rule.maxLength && value.length > rule.maxLength) {
        errors[key] = `Must be ${rule.maxLength} characters or fewer.`;
        continue;
      }

      if (!rule.pattern.test(value)) {
        errors[key] = rule.message || 'Contains characters that are not allowed.';
        continue;
      }

      clean[key] = value;
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ ok: false, error: 'Validation failed.', fields: errors });
    }

    req.validated = clean;
    next();
  };
}

module.exports = { validateBody };
