(function () {
  "use strict";

  var WHATSAPP_NUMBER = "2348115767834";

  var header = document.getElementById("siteHeader");
  var navToggle = document.getElementById("navToggle");
  var siteNav = document.getElementById("siteNav");
  var form = document.getElementById("inquiryForm");
  var formNote = document.getElementById("formNote");
  var yearEl = document.getElementById("year");

  function closeNav() {
    if (!siteNav || !navToggle) return;
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("nav-open");
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var open = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.classList.toggle("nav-open", open);
    });

    siteNav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeNav();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 900) closeNav();
    });
  }

  var lastScroll = 0;
  window.addEventListener(
    "scroll",
    function () {
      var current = window.scrollY;
      if (header) header.classList.toggle("is-scrolled", current > 12);
      lastScroll = current;
    },
    { passive: true }
  );
  if (header) header.classList.toggle("is-scrolled", window.scrollY > 12);

  var revealItems = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  revealItems.forEach(function (element) {
    var delay = element.getAttribute("data-delay");
    if (delay) element.style.setProperty("--reveal-delay", delay);
  });

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!("IntersectionObserver" in window) || reduceMotion) {
    revealItems.forEach(function (element) {
      element.classList.add("is-visible");
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealItems.forEach(function (element) {
      observer.observe(element);
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      var targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      var target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      var offset = header ? header.offsetHeight + 12 : 12;
      var top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: reduceMotion ? "auto" : "smooth" });
      if (history.replaceState) history.replaceState(null, "", targetId);
    });
  });

  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  document.querySelectorAll("[data-service]").forEach(function (link) {
    link.addEventListener("click", function () {
      var select = document.getElementById("service");
      if (select && link.getAttribute("data-service")) {
        select.value = link.getAttribute("data-service");
      }
      var nameField = document.getElementById("name");
      if (nameField && finePointer) {
        window.setTimeout(function () {
          nameField.focus({ preventScroll: true });
        }, reduceMotion ? 0 : 620);
      }
    });
  });

  if (finePointer && !reduceMotion) {
    document.querySelectorAll(".card").forEach(function (card) {
      var frame = null;
      var pending = null;

      function applyTilt() {
        frame = null;
        if (!pending) return;
        var rect = card.getBoundingClientRect();
        var px = (pending.clientX - rect.left) / rect.width - 0.5;
        var py = (pending.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty("--rx", (-py * 6).toFixed(2) + "deg");
        card.style.setProperty("--ry", (px * 8).toFixed(2) + "deg");
        card.style.setProperty("--mx", ((px + 0.5) * 100).toFixed(1) + "%");
        card.style.setProperty("--my", ((py + 0.5) * 100).toFixed(1) + "%");
      }

      card.addEventListener("pointerenter", function () {
        card.classList.add("is-tilting");
      });

      card.addEventListener("pointermove", function (event) {
        pending = event;
        if (frame === null) frame = window.requestAnimationFrame(applyTilt);
      });

      card.addEventListener("pointerleave", function () {
        card.classList.remove("is-tilting");
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
        pending = null;
      });
    });
  }

  var heroBgImage = document.getElementById("heroBgImage");
  var heroGlow = document.querySelector(".hero-glow");
  var parallaxQueued = false;

  function applyParallax() {
    parallaxQueued = false;
    var offset = window.scrollY;
    if (offset > window.innerHeight * 1.3) return;
    if (heroBgImage) {
      heroBgImage.style.transform = "translate3d(0," + (offset * 0.16).toFixed(2) + "px,0)";
    }
    if (heroGlow) {
      heroGlow.style.transform = "translate3d(0," + (offset * -0.05).toFixed(2) + "px,0)";
    }
  }

  if (!reduceMotion && (heroBgImage || heroGlow)) {
    window.addEventListener(
      "scroll",
      function () {
        if (!parallaxQueued) {
          parallaxQueued = true;
          window.requestAnimationFrame(applyParallax);
        }
      },
      { passive: true }
    );
  }

  function setFieldError(field, message) {
    var wrapper = field.closest(".field");
    if (!wrapper) return;
    wrapper.classList.toggle("has-error", Boolean(message));
    var existing = wrapper.querySelector(".field-error");
    if (message) {
      if (!existing) {
        var error = document.createElement("span");
        error.className = "field-error";
        wrapper.appendChild(error);
        existing = error;
      }
      existing.textContent = message;
    } else if (existing) {
      existing.remove();
    }
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var name = document.getElementById("name");
      var business = document.getElementById("business");
      var service = document.getElementById("service");
      var message = document.getElementById("message");
      var nameValue = name.value.trim();

      setFieldError(name, nameValue ? "" : "Please tell us your name.");
      if (!nameValue) {
        name.focus();
        return;
      }

      var lines = [
        "Hi Deemannie's Digital,",
        "",
        "Name: " + nameValue,
        "Business: " + (business.value.trim() || "—"),
        "Service needed: " + (service.value || "—")
      ];
      if (message.value.trim()) {
        lines.push("", message.value.trim());
      }
      lines.push("", "Sent from your website.");

      var url =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(lines.join("\n"));

      if (formNote) {
        formNote.textContent = "Opening WhatsApp with your enquiry…";
      }
      window.open(url, "_blank", "noopener");
    });

    form.addEventListener("input", function (event) {
      var field = event.target.closest(".field");
      if (field && field.classList.contains("has-error")) {
        setFieldError(event.target, "");
      }
    });
  }

  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
