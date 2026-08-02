async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('.submit-btn');
  const errBox = document.getElementById('form-error');
  const isDe = (localStorage.getItem('nm_lang') || 'en') === 'de';

  errBox.style.display = 'none';
  btn.textContent = isDe ? 'Wird gesendet...' : 'Sending...';
  btn.disabled = true;

  const payload = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    subject: form.subject.value.trim(),
    message: form.message.value.trim(),
  };

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (!res.ok || !data.ok) {
      throw new Error(data.error || 'Something went wrong. Please try again.');
    }

    form.style.display = 'none';
    document.getElementById('form-success').style.display = 'block';
  } catch (err) {
    errBox.textContent = err.message;
    errBox.style.display = 'block';
    btn.textContent = isDe ? '✉ Nachricht senden' : '✉ Send Message';
    btn.disabled = false;
  }
}

function toggleFaq(el) {
  const item = el.parentElement;
  item.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', () => {
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      if (typeof toggleLang === 'function') toggleLang();
    });
  }

  const form = document.getElementById('contact-form');
  if (form) form.addEventListener('submit', handleSubmit);

  document.querySelectorAll('.faq-q').forEach((q) => {
    q.addEventListener('click', () => toggleFaq(q));
  });
});
