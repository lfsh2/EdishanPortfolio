// age.js - Automatically calculates age from birthdate
// Birthdate is set on the element in index.html: <span id="age" data-birthdate="YYYY-MM-DD">
(function () {
  function calculateAge(birthdate) {
    var today = new Date();
    var birth = new Date(birthdate + 'T00:00:00'); // parse as local date, not UTC
    if (isNaN(birth.getTime())) return null;
    var age = today.getFullYear() - birth.getFullYear();
    var monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--; // birthday hasn't happened yet this year
    }
    return age;
  }

  function updateAge() {
    var el = document.getElementById('age');
    if (!el || !el.dataset.birthdate) return;
    var age = calculateAge(el.dataset.birthdate);
    if (age !== null && age >= 0) el.textContent = age;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateAge);
  } else {
    updateAge();
  }
})();
