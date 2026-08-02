// ── Language toggle button (was inline onclick="toggleLang && toggleLang()") ──
const langToggleBtn = document.getElementById('lang-toggle');
if (langToggleBtn) {
  langToggleBtn.addEventListener('click', function () {
    if (typeof toggleLang === 'function') toggleLang();
  });
}

// ── Language bar animation ──
const langBars = document.querySelectorAll('.lang-bar');
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.style.width = e.target.dataset.width; });
}, { threshold: 0.5 });
langBars.forEach(b => barObs.observe(b));
