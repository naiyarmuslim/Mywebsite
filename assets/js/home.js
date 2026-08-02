document.getElementById('i18n-script')?.addEventListener('error', () => console.log('i18n not loaded'));
document.getElementById('main-script')?.addEventListener('error', () => console.log('main.js not loaded'));

document.addEventListener('DOMContentLoaded', () => {
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      if (typeof toggleLang === 'function') toggleLang();
    });
  }

  const avatar = document.getElementById('hero-avatar');
  if (avatar) {
    avatar.addEventListener('error', function onErr() {
      this.src = 'https://placehold.co/120x120/f2ede6/1a1a1a?text=NM';
      this.style.filter = 'none';
      avatar.removeEventListener('error', onErr);
    });
  }
});
