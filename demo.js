(() => {
  const titleEl = document.getElementById("demoTitle");
  const bodyEl  = document.getElementById("demoBody");
  const spots   = document.querySelectorAll(".hotspot");

  if (!titleEl || !bodyEl || !spots.length) return;

  spots.forEach(btn => {
    btn.addEventListener("click", () => {
      const title = btn.getAttribute("data-title") || "Details";
      const body  = btn.getAttribute("data-body")  || "No description set.";

      titleEl.textContent = title;
      bodyEl.textContent = body;

      // Small “active” feedback
      spots.forEach(s => s.classList.remove("is-active"));
      btn.classList.add("is-active");
    });
  });
})();
