// site.js - small helpers
(function () {
  // Assemble the contact email at runtime so it isn't sitting in the static HTML for scrapers
  function revealEmail() {
    var el = document.getElementById('email-link');
    if (!el || !el.dataset.user || !el.dataset.domain) return;
    var address = el.dataset.user + '@' + el.dataset.domain;
    el.href = 'mailto:' + address;
    el.textContent = address;
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', revealEmail);
  } else {
    revealEmail();
  }
})();
