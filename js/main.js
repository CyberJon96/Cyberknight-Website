// Knightwatch Cybersecurity — site behavior (v2)
// No frameworks, no external requests. Responsibilities:
//   1) mobile nav toggle          4) scroll-reveal animations (IntersectionObserver)
//   2) sticky header state        5) mouse-tracking spotlight on cards
//   3) scroll progress bar        6) contact form (mailto fallback) + founder photo fallback

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- Mobile nav toggle ----
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("primaryNav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---- Sticky header state + scroll progress bar ----
  var header = document.getElementById("siteHeader");
  var progressBar = document.getElementById("scrollProgressBar");

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;

    if (header) {
      header.classList.toggle("is-scrolled", y > 24);
    }

    if (progressBar) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var pct = max > 0 ? (y / max) * 100 : 0;
      progressBar.style.width = pct + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---- Scroll-reveal animations ----
  var revealEls = document.querySelectorAll(".reveal");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    // Stagger siblings inside any `.stagger` container by index.
    document.querySelectorAll(".stagger").forEach(function (group) {
      var children = group.querySelectorAll(".reveal");
      children.forEach(function (el, i) {
        el.style.setProperty("--reveal-delay", (i * 0.08) + "s");
      });
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(function (el) { observer.observe(el); });
  }

  // ---- Mouse-tracking spotlight on cards ----
  if (!prefersReducedMotion) {
    document.querySelectorAll(".spotlight-card").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX - rect.left) + "px");
        card.style.setProperty("--my", (e.clientY - rect.top) + "px");
      });
    });
  }

  // ---- Founder photo fallback ----
  // If assets/founder.jpg is missing, show the styled "JR" monogram instead.
  var founderPhoto = document.getElementById("founderPhoto");
  if (founderPhoto) {
    founderPhoto.addEventListener("error", function () {
      var frame = founderPhoto.closest(".about-photo-frame");
      if (frame) frame.classList.add("img-missing");
    });
    // Handle the case where the error fired before this listener attached.
    if (founderPhoto.complete && founderPhoto.naturalWidth === 0) {
      var frame = founderPhoto.closest(".about-photo-frame");
      if (frame) frame.classList.add("img-missing");
    }
  }

  // ---- Footer year ----
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ---- Contact form ----
  // Two modes, chosen automatically:
  //
  //  1. BACKEND MODE — if the <form> in index.html has an `action` URL, the form
  //     posts there via fetch (JSON) and shows an inline success/error message.
  //     To take inquiries directly through the site, set e.g.:
  //       <form ... action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  //     (works with Formspree, Basin, or any endpoint that accepts form posts
  //     and returns 2xx on success — no other code changes needed).
  //
  //  2. MAILTO FALLBACK — with no `action` set (current state), submitting opens
  //     the visitor's email client with a prefilled message.
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");

  function setStatus(msg) {
    if (status) status.textContent = msg;
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var company = form.company.value.trim();
      var message = form.message.value.trim();

      if (!name || !email || !message) {
        setStatus("Please fill in your name, email, and a short message.");
        return;
      }

      var endpoint = form.getAttribute("action");

      if (endpoint) {
        // BACKEND MODE
        var submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;
        setStatus("Sending...");

        fetch(endpoint, {
          method: form.getAttribute("method") || "POST",
          headers: { "Accept": "application/json" },
          body: new FormData(form)
        }).then(function (res) {
          if (res.ok) {
            form.reset();
            setStatus("Thanks — your request is in. You'll hear back within one business day.");
          } else {
            setStatus("Something went wrong sending your request. Please email hello@knightwatchcyber.com directly."); // REPLACE: email
          }
        }).catch(function () {
          setStatus("Network error — please email hello@knightwatchcyber.com directly."); // REPLACE: email
        }).finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
        return;
      }

      // MAILTO FALLBACK
      // REPLACE: placeholder destination address — update to your real business email.
      var to = "hello@knightwatchcyber.com";
      var subject = "Readiness Review Request — " + name;
      var bodyLines = [
        "Name: " + name,
        "Email: " + email,
        "Company: " + (company || "N/A"),
        "",
        "What they need help with:",
        message
      ];
      var mailto =
        "mailto:" + to +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(bodyLines.join("\n"));

      window.location.href = mailto;
      setStatus("Opening your email client to send this request...");
    });
  }
})();
