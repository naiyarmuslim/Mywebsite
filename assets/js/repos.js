(function () {
  var search = document.getElementById('repo-search');
  var items = Array.prototype.slice.call(document.querySelectorAll('.repo-item'));
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.repo-filter'));
  var count = document.getElementById('repo-count');
  var empty = document.getElementById('repo-empty');
  var sortSel = document.getElementById('repo-sort');
  var list = document.getElementById('repo-list');
  var status = 'all';

  function apply() {
    var q = (search.value || '').trim().toLowerCase();
    var shown = 0;
    items.forEach(function (el) {
      var okText = !q || el.textContent.toLowerCase().indexOf(q) !== -1;
      var okStatus = status === 'all' || el.getAttribute('data-status') === status;
      var show = okText && okStatus;
      el.hidden = !show;
      if (show) shown++;
    });
    count.textContent = shown + (shown === 1 ? ' Projekt' : ' Projekte');
    empty.hidden = shown !== 0;
  }

  function sortItems() {
    var mode = sortSel.value;
    items.sort(function (a, b) {
      if (mode === 'name') {
        return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'));
      }
      return Number(b.getAttribute('data-updated')) - Number(a.getAttribute('data-updated'));
    });
    items.forEach(function (el) { list.appendChild(el); });
  }

  search.addEventListener('input', apply);
  sortSel.addEventListener('change', sortItems);
  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      buttons.forEach(function (x) { x.classList.remove('active'); });
      b.classList.add('active');
      status = b.getAttribute('data-status');
      apply();
    });
  });

  sortItems();
  apply();
})();
