/* ============================================================
   NAIYAR MUSLIM — SHARED JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Dark mode toggle (shared across every page) ── */
  const THEME_KEY = 'nm_theme';
  const root = document.documentElement;
  function paintThemeButtons() {
    const dark = root.getAttribute('data-theme') === 'dark';
    document.querySelectorAll('.theme-toggle-icon').forEach(el => { el.textContent = dark ? '☀️' : '🌙'; });
  }
  function setTheme(v) {
    root.setAttribute('data-theme', v);
    localStorage.setItem(THEME_KEY, v);
    paintThemeButtons();
  }
  root.setAttribute('data-theme', localStorage.getItem(THEME_KEY) || 'light');
  paintThemeButtons();
  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  });

  /* ── Scroll progress bar ── */
  const prog = document.getElementById('progress');
  if (prog) {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.width = (window.scrollY / total * 100) + '%';
    };
    window.addEventListener('scroll', update);
  }

  /* ── Scroll reveal ── */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ── Hamburger / mobile menu ── */
  const ham = document.getElementById('hamburger');
  const mob = document.getElementById('mobile-menu');
  if (ham && mob) {
    ham.addEventListener('click', () => {
      ham.classList.toggle('open');
      mob.classList.toggle('open');
    });
    // Close on link click
    mob.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        ham.classList.remove('open');
        mob.classList.remove('open');
      });
    });
  }

  /* ── Active nav link highlight (scroll-based, for single-page) ── */
  const sections = document.querySelectorAll('section[id]');
  const navAs    = document.querySelectorAll('.nav-links a, .mobile-menu a');
  if (sections.length) {
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 130) current = s.id;
      });
      navAs.forEach(a => {
        const href = a.getAttribute('href') || '';
        const match = href === '#' + current || href.endsWith(current + '.html');
        a.classList.toggle('active', match);
      });
    });
  }

});
