/* ============================================================
   NAIYAR MUSLIM — SHARED JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const APPEARANCE_COLORS = {
    nordic: {
      '--bg': '#0f1722', '--bg2': '#162233', '--surface': '#1d2b3f', '--surface2': '#1a2739',
      '--border': '#2b3b52', '--border2': '#3d5370', '--accent': '#aebfd7', '--accent2': '#0c121b',
      '--accent3': '#9fb7a6', '--accent4': '#c7d3e1', '--accent5': '#bfc9be', '--text': '#edf2f7',
      '--muted': '#a5b0bf', '--light': '#8693a7', '--accent-rgb': '174,191,215', '--accent3-rgb': '159,183,166', '--accent4-rgb': '199,211,225', '--line-rgb': '146,173,204',
      '--bg-overlay': 'radial-gradient(900px 420px at 78% -8%, rgba(174,191,215,0.12), transparent 62%)',
      '--bg-base': 'linear-gradient(180deg, #0f1722 0%, #152033 52%, #18263b 100%)',
      '--nav-bg': 'rgba(8,20,38,0.9)'
    },
    aurora: {
      '--bg': '#130f2a', '--bg2': '#1b1640', '--surface': '#282056', '--surface2': '#241e4c',
      '--border': '#4a3e7e', '--border2': '#6655a8', '--accent': '#7de8ff', '--accent2': '#0f0b1d',
      '--accent3': '#cb9dff', '--accent4': '#a7f7d8', '--accent5': '#d9c5ff', '--text': '#f2edff',
      '--muted': '#bdb2dc', '--light': '#978db9', '--accent-rgb': '125,232,255', '--accent3-rgb': '203,157,255', '--accent4-rgb': '167,247,216', '--line-rgb': '121,102,181',
      '--bg-overlay': 'radial-gradient(820px 460px at 80% -8%, rgba(125,232,255,0.22), transparent 60%), radial-gradient(760px 380px at 10% 10%, rgba(203,157,255,0.18), transparent 62%)',
      '--bg-base': 'linear-gradient(180deg, #130f2a 0%, #1a1340 48%, #211a52 100%)',
      '--nav-bg': 'rgba(20,13,42,0.9)'
    },
    terracotta: {
      '--bg': '#2a1712', '--bg2': '#3a2119', '--surface': '#4a2d24', '--surface2': '#43281f',
      '--border': '#6a4235', '--border2': '#8b5a48', '--accent': '#f1b88e', '--accent2': '#1d0f0c',
      '--accent3': '#d8a77b', '--accent4': '#f5d6b9', '--accent5': '#eac8b2', '--text': '#fff2e9',
      '--muted': '#d5b5a2', '--light': '#b58f7b', '--accent-rgb': '241,184,142', '--accent3-rgb': '216,167,123', '--accent4-rgb': '245,214,185', '--line-rgb': '160,105,84',
      '--bg-overlay': 'radial-gradient(880px 420px at 80% -8%, rgba(241,184,142,0.22), transparent 62%), radial-gradient(640px 320px at 12% 18%, rgba(216,167,123,0.15), transparent 66%)',
      '--bg-base': 'linear-gradient(180deg, #2a1712 0%, #351d16 52%, #40231b 100%)',
      '--nav-bg': 'rgba(38,20,16,0.9)'
    },
    mono: {
      '--bg': '#0f1114', '--bg2': '#16191d', '--surface': '#1d2126', '--surface2': '#1a1e23',
      '--border': '#323840', '--border2': '#47515c', '--accent': '#d6d9df', '--accent2': '#090a0c',
      '--accent3': '#b9bfc8', '--accent4': '#eceff4', '--accent5': '#cfd3da', '--text': '#f2f4f7',
      '--muted': '#a8afb9', '--light': '#848d99', '--accent-rgb': '214,217,223', '--accent3-rgb': '185,191,200', '--accent4-rgb': '236,239,244', '--line-rgb': '116,124,136',
      '--bg-overlay': 'radial-gradient(760px 320px at 78% -6%, rgba(214,217,223,0.14), transparent 64%)',
      '--bg-base': 'linear-gradient(180deg, #0f1114 0%, #15191e 55%, #191f25 100%)',
      '--nav-bg': 'rgba(14,16,19,0.92)'
    },
    forest: {
      '--bg': '#111d1a', '--bg2': '#172925', '--surface': '#1f3630', '--surface2': '#1a2f2a',
      '--border': '#315046', '--border2': '#45695d', '--accent': '#b4c9b6', '--accent2': '#0d1714',
      '--accent3': '#9ec0a6', '--accent4': '#d0dfd2', '--accent5': '#c1d0c3', '--text': '#edf4ee',
      '--muted': '#a7b8aa', '--light': '#879a8b', '--accent-rgb': '180,201,182', '--accent3-rgb': '158,192,166', '--accent4-rgb': '208,223,210', '--line-rgb': '152,176,156',
      '--bg-overlay': 'radial-gradient(880px 460px at 80% -10%, rgba(180,201,182,0.18), transparent 62%), radial-gradient(700px 360px at 12% 12%, rgba(158,192,166,0.14), transparent 66%)',
      '--bg-base': 'linear-gradient(180deg, #111d1a 0%, #162621 55%, #1b3029 100%)',
      '--nav-bg': 'rgba(12,26,23,0.9)'
    }
  };

  const APPEARANCE_STYLES = [
    { id: 'minimal', label: 'Minimal' },
    { id: 'glass', label: 'Glassmorphism' },
    { id: 'architect', label: 'Blueprint' },
    { id: 'grid', label: 'Brutalist Grid' },
    { id: 'organic', label: 'Organic Flow' }
  ];

  function applyColorTheme(themeId) {
    const theme = APPEARANCE_COLORS[themeId] || APPEARANCE_COLORS.nordic;
    const root = document.documentElement;
    Object.keys(theme).forEach(key => root.style.setProperty(key, theme[key]));
    localStorage.setItem('nm_color_theme', themeId);
  }

  function applySiteStyle(styleId) {
    const id = APPEARANCE_STYLES.some(s => s.id === styleId) ? styleId : 'architect';
    document.body.setAttribute('data-site-style', id);
    localStorage.setItem('nm_site_style', id);
  }

  function initAppearanceControls() {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    const firstLink = navLinks.querySelector('li');
    const lastLink = navLinks.querySelector('li:last-child');
    if (!firstLink || !lastLink) return;

    const styleWrap = document.createElement('li');
    styleWrap.className = 'nav-appearance';
    styleWrap.innerHTML = [
      '<button class="appearance-btn appearance-btn-style" id="style-toggle" title="Select style" aria-label="Select style"><span class="appearance-btn-label">Style</span><span class="appearance-btn-icon">▦</span></button>',
      '<div class="appearance-panel panel-left" id="style-panel">',
      '<div class="appearance-title">Style</div>',
      '<div class="style-list" id="style-list"></div>',
      '</div>'
    ].join('');

    const colorWrap = document.createElement('li');
    colorWrap.className = 'nav-appearance';
    colorWrap.innerHTML = [
      '<button class="appearance-btn appearance-btn-color" id="color-toggle" title="Select color" aria-label="Select color"><span class="appearance-btn-label">Color</span><span class="appearance-btn-icon">●</span></button>',
      '<div class="appearance-panel panel-right" id="color-panel">',
      '<div class="appearance-title">Palette</div>',
      '<div class="appearance-grid" id="color-grid"></div>',
      '</div>'
    ].join('');

    navLinks.insertBefore(styleWrap, firstLink);
    navLinks.insertBefore(colorWrap, lastLink.nextSibling);

    const stylePanel = document.getElementById('style-panel');
    const colorPanel = document.getElementById('color-panel');
    const styleBtn = document.getElementById('style-toggle');
    const colorBtn = document.getElementById('color-toggle');
    const styleList = document.getElementById('style-list');
    const colorGrid = document.getElementById('color-grid');

    APPEARANCE_STYLES.forEach(style => {
      const btn = document.createElement('button');
      btn.className = 'style-chip';
      btn.type = 'button';
      btn.dataset.style = style.id;
      btn.textContent = style.label;
      btn.addEventListener('click', () => {
        applySiteStyle(style.id);
        styleList.querySelectorAll('.style-chip').forEach(n => n.classList.toggle('active', n.dataset.style === style.id));
      });
      styleList.appendChild(btn);
    });

    Object.keys(APPEARANCE_COLORS).forEach(themeId => {
      const swatch = document.createElement('button');
      swatch.className = 'color-swatch';
      swatch.type = 'button';
      swatch.dataset.theme = themeId;
      swatch.title = themeId;
      swatch.style.background = APPEARANCE_COLORS[themeId]['--accent'];
      swatch.addEventListener('click', () => {
        applyColorTheme(themeId);
        colorGrid.querySelectorAll('.color-swatch').forEach(n => n.classList.toggle('active', n.dataset.theme === themeId));
      });
      colorGrid.appendChild(swatch);
    });

    styleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      stylePanel.classList.toggle('open');
      colorPanel.classList.remove('open');
    });

    colorBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      colorPanel.classList.toggle('open');
      stylePanel.classList.remove('open');
    });

    document.addEventListener('click', (e) => {
      if (!styleWrap.contains(e.target) && !colorWrap.contains(e.target)) {
        stylePanel.classList.remove('open');
        colorPanel.classList.remove('open');
      }
    });

    const savedTheme = localStorage.getItem('nm_color_theme') || 'nordic';
    const savedStyle = localStorage.getItem('nm_site_style') || 'minimal';
    applyColorTheme(savedTheme);
    applySiteStyle(savedStyle);

    styleList.querySelectorAll('.style-chip').forEach(n => n.classList.toggle('active', n.dataset.style === savedStyle));
    colorGrid.querySelectorAll('.color-swatch').forEach(n => n.classList.toggle('active', n.dataset.theme === savedTheme));
  }

  initAppearanceControls();

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