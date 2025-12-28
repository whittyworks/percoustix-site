console.log("main.js is alive");

/* =========================
   Footer year
========================= */
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* =========================
   Mobile navigation toggle
========================= */
const navToggle = document.querySelector(".nav-toggle");
const mobileNav = document.getElementById("mobile-nav");

if (navToggle && mobileNav) {
  navToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = mobileNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close menu when a link is clicked
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!mobileNav.contains(e.target) && !navToggle.contains(e.target)) {
      mobileNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Close menu when resizing back to desktop
  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 981px)").matches) {
      mobileNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* =========================
   Pad-card click-to-reveal
   (Why Percoustix)
========================= */
// Put pad-card keyboard access and demo wiring inside DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".pad-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      card.classList.toggle("is-flipped");
      card.setAttribute("aria-pressed", card.classList.contains("is-flipped"));
    });

    // Keyboard accessibility (Enter / Space)
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.classList.toggle("is-flipped");
        card.setAttribute("aria-pressed", card.classList.contains("is-flipped"));
      }
    });
  });

  /* js from demo page: wire hotspots to the demo panel */
  const titleEl = document.getElementById("demoTitle");
  const bodyEl  = document.getElementById("demoBody");
  const spots   = document.querySelectorAll(".hotspot");

  if (titleEl && bodyEl && spots.length) {
    spots.forEach(btn => {
      btn.addEventListener("click", () => {
        const title = btn.getAttribute("data-title") || "Details";
        const body  = btn.getAttribute("data-body")  || "No description set.";

        titleEl.textContent = title;
        bodyEl.textContent = body;

        // Small "active" feedback
        spots.forEach(s => s.classList.remove("is-active"));
        btn.classList.add("is-active");
      });
    });
  }
});

/* =========================
   Cursor glow trail effect
========================= */
document.addEventListener('mousemove', (e) => {
  const trail = document.createElement('div');
  trail.className = 'cursor-trail';
  trail.style.left = e.pageX + 'px';
  trail.style.top = e.pageY + 'px';
  document.body.appendChild(trail);
  
  setTimeout(() => trail.remove(), 500);
});