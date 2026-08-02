  // ================================================================
  // ▼▼ PASTE YOUR GOOGLE SHEET CSV URL HERE — only line you change ▼▼
  const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQfP284uTt-MCKs5zW3_DOUdRwNUIFwOQozkaCJ0P6jxaf-V59TSLPSNni_mZgJBab89ZR9vuRQH8NO/pub?output=csv';
  // ▲▲ Get it from: File → Share → Publish to web → CSV → copy URL ▲▲
  // ================================================================

  const LEVEL_CFG = {
    a1: { label: 'A1', cls: 'la1', color: 'var(--accent3)' },
    a2: { label: 'A2', cls: 'la2', color: 'var(--accent)' },
    b1: { label: 'B1', cls: 'lb1', color: 'var(--accent5)' },
  };

  function getLang() { return localStorage.getItem('nm_lang') || 'en'; }

  function esc(s) {
    return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function ytThumb(id) { return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`; }
  function ytEmbed(id) { return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`; }
  function ytWatch(id) { return `https://www.youtube.com/watch?v=${id}`; }

  // ── CSV parser (handles quoted fields containing commas) ──────
  function parseCSV(text) {
    const lines = text.trim().split('\n');
    if (lines.length < 2) return [];
    const headers = splitCSVLine(lines[0]);
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      const vals = splitCSVLine(lines[i]);
      const obj  = {};
      headers.forEach((h, idx) => { obj[h.trim()] = (vals[idx] || '').trim(); });
      rows.push(obj);
    }
    return rows;
  }

  function splitCSVLine(line) {
    const result = [];
    let cur = '', inQ = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQ && line[i+1] === '"') { cur += '"'; i++; }
        else inQ = !inQ;
      } else if (ch === ',' && !inQ) {
        result.push(cur); cur = '';
      } else {
        cur += ch;
      }
    }
    result.push(cur);
    return result;
  }

  // ── State ─────────────────────────────────────────────────────
  let ALL_LESSONS  = [];
  let activeFilter = 'all';

  // ── Fetch from Google Sheets ──────────────────────────────────
  async function fetchLessons() {
    setGridState('loading');
    try {
      const url = SHEET_CSV_URL + '&t=' + Date.now(); // bypass cache
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status} — check your CSV URL`);
      const text = await res.text();
      // Filter out rows without a YouTube ID
      ALL_LESSONS = parseCSV(text).filter(l => l.ytid && l.ytid.length > 3);
      render();
    } catch (err) {
      setGridState('error', err.message);
    }
  }

  // ── Render ────────────────────────────────────────────────────
  function render() {
    const grid     = document.getElementById('course-grid');
    grid.querySelectorAll('.ccard').forEach(c => c.remove());

    const filtered = activeFilter === 'all'
      ? ALL_LESSONS
      : ALL_LESSONS.filter(l => l.level === activeFilter);

    document.getElementById('stat-lessons').textContent = ALL_LESSONS.length;

    if (filtered.length === 0) {
      setGridState('empty');
      return;
    }

    clearGridStates();
    filtered.forEach((lesson, i) => {
      grid.insertAdjacentHTML('beforeend', buildCard(lesson, ALL_LESSONS.indexOf(lesson), i));
    });

    if (window.__obs) {
      grid.querySelectorAll('.ccard.reveal').forEach(el => window.__obs.observe(el));
    }
  }

  // ── Card HTML ─────────────────────────────────────────────────
  function buildCard(lesson, globalIdx, displayIdx) {
    const lang  = getLang();
    const title = lang === 'de' ? (lesson.tde || lesson.ten) : lesson.ten;
    const lvl   = LEVEL_CFG[lesson.level] || LEVEL_CFG.a1;
    const num   = lesson.num
      ? String(parseInt(lesson.num)||displayIdx+1).padStart(2,'0')
      : String(displayIdx+1).padStart(2,'0');
    const wLbl = lang === 'de' ? '▶ Ansehen'       : '▶ Watch';
    const dLbl = lang === 'de' ? '⬇ Herunterladen' : '⬇ Download';

    return `<div class="ccard reveal" data-level="${esc(lesson.level)}" style="--cc:${lvl.color}">
  <div class="ctop"></div>
  <div class="vthumb" onclick="openModal(${globalIdx})">
    <img src="${esc(ytThumb(lesson.ytid))}" alt="${esc(title)}" loading="lazy"
         onerror="this.style.display='none'">
    <div class="play-ov"><div class="pbtn">▶</div></div>
    ${lesson.dur ? `<div class="dur-badge">${esc(lesson.dur)}</div>` : ''}
    <div class="lvl-badge ${lvl.cls}">${lvl.label}</div>
  </div>
  <div class="cbody">
    <div class="cnum">LESSON ${num}</div>
    <div class="ctitle">${esc(title)}</div>
    ${lesson.tbalti ? `<div class="cbalti">${esc(lesson.tbalti)}</div>` : ''}
    ${lesson.desc   ? `<div class="cdesc">${esc(lesson.desc)}</div>`    : ''}
    <div class="cactions">
      <button class="btn-watch" onclick="openModal(${globalIdx})">${wLbl}</button>
      ${lesson.dlurl
        ? `<a class="btn-dl" href="${esc(lesson.dlurl)}" target="_blank" rel="noopener">${dLbl}</a>`
        : `<a class="btn-dl" href="${esc(ytWatch(lesson.ytid))}" target="_blank" rel="noopener">${lang === 'de' ? '▶ YouTube ansehen' : '▶ YouTube'}</a>`
      }
    </div>
  </div>
</div>`;
  }

  // ── Grid state helpers ────────────────────────────────────────
  function clearGridStates() {
    document.getElementById('course-grid').querySelectorAll('.state-msg').forEach(e => e.remove());
  }

  function setGridState(type, errMsg) {
    clearGridStates();
    document.getElementById('course-grid').querySelectorAll('.ccard').forEach(c => c.remove());
    const grid = document.getElementById('course-grid');
    const lang = getLang();
    let html = '';
    if (type === 'loading') {
      html = `<div class="state-msg"><div class="spinner"></div><p>${lang === 'de' ? 'Lektionen werden geladen…' : 'Loading lessons…'}</p></div>`;
    } else if (type === 'empty') {
      html = `<div class="state-msg"><div class="ei">🏔️</div>
        <p>${lang === 'de' ? 'Noch keine Lektionen — schau bald wieder vorbei!' : 'No lessons yet — check back soon!'}</p></div>`;
    } else if (type === 'error') {
      html = `<div class="state-msg"><div class="ei">⚠️</div>
        <p><strong>${lang === 'de' ? 'Lektionen konnten nicht geladen werden.' : 'Could not load lessons.'}</strong><br>
        ${lang === 'de' ? 'Stelle sicher, dass dein Google Sheet als CSV veröffentlicht ist und' : 'Make sure your Google Sheet is published as CSV and'}
        <code>SHEET_CSV_URL</code> ${lang === 'de' ? 'im Skript korrekt gesetzt ist.' : 'in the script is set correctly.'}<br><br>
        <span style="font-size:.76rem;opacity:.55">${esc(errMsg||'')}</span></p></div>`;
    }
    grid.insertAdjacentHTML('afterbegin', html);
  }

  // ── Filter buttons ────────────────────────────────────────────
  document.querySelectorAll('.fbtn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.fbtn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.level;
      render();
    });
  });

  // ── Modal ─────────────────────────────────────────────────────
  function openModal(idx) {
    const lesson = ALL_LESSONS[idx];
    if (!lesson) return;
    const lang  = getLang();
    const title = lang === 'de' ? (lesson.tde || lesson.ten) : lesson.ten;

    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-desc').textContent  = lesson.desc || '';
    document.getElementById('modal-iframe').src        = ytEmbed(lesson.ytid);

    const dlBtn = document.getElementById('modal-dl');
    if (lesson.dlurl) { dlBtn.href = lesson.dlurl; dlBtn.style.display = 'flex'; }
    else              { dlBtn.style.display = 'none'; }

    document.getElementById('modal-yt').href = ytWatch(lesson.ytid);
    document.getElementById('vmodal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    document.getElementById('vmodal').classList.remove('open');
    document.body.style.overflow = '';
    document.getElementById('modal-iframe').src = '';
  }

  function maybeClose(e) {
    if (e.target === document.getElementById('vmodal')) closeModal();
  }

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // ── Boot ──────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    window.__obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => window.__obs.observe(el));
    fetchLessons();
  });

  if (document.readyState !== 'loading') fetchLessons();

  // ── Wired-up listeners (previously inline onclick attributes) ──
  document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) langBtn.addEventListener('click', () => toggleLang());

    const modal = document.getElementById('vmodal');
    if (modal) modal.addEventListener('click', maybeClose);

    const closeBtn = document.querySelector('.mclose');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
  });
