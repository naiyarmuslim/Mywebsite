/* ============================================================
   NAIYAR MUSLIM — SHARED JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Custom cursor ── */
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursor-ring');
  if (cursor && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = (mx - 5) + 'px';
      cursor.style.top  = (my - 5) + 'px';
    });
    const animRing = () => {
      rx += (mx - rx - 18) * 0.12;
      ry += (my - ry - 18) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    };
    animRing();
    document.querySelectorAll('a, button, .card, .project-row').forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.style.transform='scale(2.4)'; ring.style.opacity='0.12'; });
      el.addEventListener('mouseleave', () => { cursor.style.transform='scale(1)';   ring.style.opacity='0.45'; });
    });
  }

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