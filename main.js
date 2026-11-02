/* ============================================================
   MediFlow — Landing Page Interactions
   Dependency-free vanilla JS.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Mobile navigation toggle ---------- */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    // Close the menu when a link inside it is clicked.
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Sticky header shadow ---------- */
  var header = document.getElementById("siteHeader");

  function updateHeader() {
    if (!header) return;
    if (window.scrollY > 10) {
      header.style.boxShadow = "0 4px 18px rgba(13, 47, 58, 0.10)";
    } else {
      header.style.boxShadow = "none";
    }
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ---------- Contact form (demo handler) ---------- */
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var name = document.getElementById("name");
      var hospital = document.getElementById("hospital");
      var city = document.getElementById("city");

      if (!form.checkValidity() || !name.value.trim() || !hospital.value.trim() || !city.value.trim()) {
        form.reportValidity();
        return;
      }

      var submitBtn = form.querySelector("button[type='submit']");
      var originalLabel = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
      note.className = "form-note";
      note.textContent = "";

      // Simulated submission — connect to your CRM / WhatsApp / email backend here.
      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
        note.textContent =
          "Thank you! Our growth strategist will prepare a personalized audit for " +
          hospital.value.trim() +
          " in " +
          city.value.trim() +
          ".";
        form.reset();
      }, 900);
    });
  }
})();
