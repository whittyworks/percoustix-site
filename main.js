// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile navigation toggle (dropdown)
const btn = document.querySelector(".nav-toggle");
const menu = document.querySelector("#mobile-nav");

if (btn && menu) {
  btn.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // Close menu when a link is clicked
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      menu.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    }
  });

  // Close menu on resize back to desktop
  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 981px)").matches) {
      menu.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    }
  });
}
// Pad-card click-to-reveal (Why Percoustix)
document.querySelectorAll(".pad-card").forEach((btn) => {
  const toggleFlip = () => {
    const flipped = btn.classList.toggle("is-flipped");
    btn.setAttribute("aria-pressed", flipped ? "true" : "false");
  };

  btn.addEventListener("click", toggleFlip);

  // Keyboard support: Enter / Space
  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFlip();
    }
  });
});
