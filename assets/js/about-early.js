// Global capture-phase resource error handler — must load early (in <head>)
// so it is attached before the image / scripts further down the page
// have a chance to fail and fire their 'error' events.
window.addEventListener('error', function (e) {
  var t = e.target;
  if (!t || !t.tagName) return;

  if (t.id === 'about-photo') {
    t.src = 'https://placehold.co/600x800/faf8f5/1a1a1a?text=Naiyar+Muslim';
    t.style.filter = 'none';
    return;
  }

  if (t.tagName === 'SCRIPT' && t.src) {
    if (t.src.indexOf('i18n.js') !== -1) console.log('i18n not loaded');
    else if (t.src.indexOf('main.js') !== -1) console.log('main.js not loaded');
  }
}, true);
