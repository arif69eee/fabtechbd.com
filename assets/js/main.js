/* FABTECH Bangladesh — site behaviour (vanilla, no dependencies) */
(function () {
  "use strict";

  /* ---------- Mobile navigation ---------- */
  var burger = document.querySelector(".burger");
  var nav = document.getElementById("nav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        burger.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealables = document.querySelectorAll(".rv");
  if ("IntersectionObserver" in window && revealables.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    revealables.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 4, 3) * 70 + "ms";
      io.observe(el);
    });
  } else {
    revealables.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Project filters ---------- */
  var filterBar = document.querySelector(".filters");
  if (filterBar) {
    filterBar.addEventListener("click", function (e) {
      var btn = e.target.closest("button");
      if (!btn) return;
      var key = btn.dataset.filter;
      filterBar.querySelectorAll("button").forEach(function (b) {
        b.classList.toggle("active", b === btn);
      });
      document.querySelectorAll("[data-cat]").forEach(function (card) {
        var show = key === "all" || card.dataset.cat === key || card.dataset.status === key;
        card.style.display = show ? "" : "none";
      });
    });
  }

  /* ---------- Lightbox gallery ---------- */
  var lb = document.getElementById("lightbox");
  if (lb) {
    var lbImg = lb.querySelector("img");
    var lbCap = lb.querySelector(".lb-cap");
    var set = [];
    var idx = 0;
    var lastFocus = null;

    function render() {
      var item = set[idx];
      if (!item) return;
      lbImg.src = item.src;
      lbImg.alt = item.cap || "";
      lbCap.textContent = (set.length > 1 ? (idx + 1) + " / " + set.length + " — " : "") + (item.cap || "");
    }
    function open(list, start) {
      set = list; idx = start || 0;
      render();
      lastFocus = document.activeElement;
      lb.classList.add("open");
      document.body.style.overflow = "hidden";
      lb.querySelector(".lb-close").focus();
    }
    function close() {
      lb.classList.remove("open");
      lbImg.src = "";
      document.body.style.overflow = "";
      if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
      lastFocus = null;
    }
    function step(n) {
      if (!set.length) return;
      idx = (idx + n + set.length) % set.length;
      render();
    }

    document.querySelectorAll("[data-gallery]").forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var raw = trigger.getAttribute("data-gallery");
        var cap = trigger.getAttribute("data-caption") || "";
        var list = raw.split("|").filter(Boolean).map(function (src) {
          return { src: src, cap: cap };
        });
        if (list.length) open(list, 0);
      });
    });

    lb.querySelector(".lb-close").addEventListener("click", close);
    lb.querySelector(".lb-prev").addEventListener("click", function () { step(-1); });
    lb.querySelector(".lb-next").addEventListener("click", function () { step(1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") { close(); return; }
      if (e.key === "ArrowLeft") { step(-1); return; }
      if (e.key === "ArrowRight") { step(1); return; }
      if (e.key !== "Tab") return;
      // Keep focus inside the dialog while it is open.
      var f = lb.querySelectorAll(".lb-btn");
      var first = f[0];
      var last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      } else if (!lb.contains(document.activeElement)) {
        e.preventDefault(); first.focus();
      }
    });
  }

  /* ---------- Contact form → mail client ---------- */
  var form = document.getElementById("enquiry-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var subject = "Website enquiry — " + (d.get("service") || "General");
      var body =
        "Name: " + (d.get("name") || "") + "\n" +
        "Company: " + (d.get("company") || "") + "\n" +
        "Email: " + (d.get("email") || "") + "\n" +
        "Phone: " + (d.get("phone") || "") + "\n" +
        "Service of interest: " + (d.get("service") || "") + "\n\n" +
        "Message:\n" + (d.get("message") || "");
      window.location.href =
        "mailto:info@fabtechbd.com?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
