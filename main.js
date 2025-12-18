document.getElementById("year").textContent = new Date().getFullYear();

const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));

    // Simple toggle: show/hide nav on mobile
    if (window.matchMedia("(max-width: 900px)").matches) {
      nav.style.display = isOpen ? "none" : "flex";
      nav.style.flexDirection = "column";
      nav.style.alignItems = "flex-start";
      nav.style.gap = "12px";
      nav.style.padding = "12px";
      nav.style.background = "rgba(11,15,20,.95)";
      nav.style.border = "1px solid rgba(255,255,255,.10)";
      nav.style.borderRadius = "16px";
      nav.style.position = "absolute";
      nav.style.right = "20px";
      nav.style.top = "64px";
      nav.style.width = "min(260px, calc(100vw - 40px))";
    }
  });
}
