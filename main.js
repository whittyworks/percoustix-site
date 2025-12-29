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

/* =========================
   SCROLL-BASED GUITAR ANIMATION
========================= */
document.addEventListener('DOMContentLoaded', () => {
  const heroGuitar = document.getElementById('heroGuitar');
  
  if (heroGuitar) {
    // Initial fade-in animation
    setTimeout(() => {
      heroGuitar.classList.add('is-visible');
    }, 100);
    
    // Parallax scroll effect - guitar moves as you scroll
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const heroHeight = document.querySelector('.hero').offsetHeight;
          
          // Only apply parallax while in hero section
          if (scrolled < heroHeight) {
            // Guitar moves down slower than scroll (parallax)
            const parallaxSpeed = 0.3; // Lower = slower movement
            const yPos = scrolled * parallaxSpeed;
            
            // Subtle rotation and scale based on scroll
            const rotation = scrolled * 0.02; // Slight tilt
            const scale = 1 - (scrolled * 0.0001); // Slight shrink
            
            heroGuitar.style.transform = `
              translate(-50%, -50%) 
              translateY(${yPos}px) 
              rotate(${rotation}deg) 
              scale(${Math.max(scale, 0.85)})
            `;
          }
          
          ticking = false;
        });
        
        ticking = true;
      }
    });
  }
});

/* =========================
   INTERACTIVE GUITAR HOTSPOTS
========================= */
document.addEventListener('DOMContentLoaded', () => {
  const hotspots = document.querySelectorAll('.guitar-hotspot');
  const infoPanel = document.getElementById('hotspotInfo');
  const infoTitle = document.getElementById('hotspotTitle');
  const infoDescription = document.getElementById('hotspotDescription');
  
  if (!hotspots.length || !infoPanel) return;
  
  hotspots.forEach(hotspot => {
    hotspot.addEventListener('click', (e) => {
      e.preventDefault();
      
      const title = hotspot.getAttribute('data-title');
      const description = hotspot.getAttribute('data-description');
      
      // Update content
      infoTitle.textContent = title;
      infoDescription.textContent = description;
      
      // Toggle active states
      hotspots.forEach(h => h.classList.remove('is-active'));
      hotspot.classList.add('is-active');
      infoPanel.classList.add('is-active');
    });
    
    // Keyboard accessibility
    hotspot.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        hotspot.click();
      }
    });
  });
  
  // Optional: Click outside to deactivate
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.guitar-hotspot') && !e.target.closest('.hotspot-info')) {
      hotspots.forEach(h => h.classList.remove('is-active'));
      infoPanel.classList.remove('is-active');
    }
  });
});