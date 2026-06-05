document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // 1. LIGHT & DARK THEME TOGGLE
  // ==========================================================================
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  
  const getTheme = () => {
    return document.documentElement.getAttribute("data-theme") || "dark";
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    
    // Update theme-color meta tags
    const darkMeta = document.querySelector('meta[name="theme-color"][media*="dark"]');
    const lightMeta = document.querySelector('meta[name="theme-color"][media*="light"]');
    if (darkMeta) darkMeta.setAttribute("content", theme === "dark" ? "#0b0c10" : "#fafafa");
    if (lightMeta) lightMeta.setAttribute("content", theme === "light" ? "#fafafa" : "#0b0c10");
  };

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = getTheme();
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      setTheme(newTheme);
    });
  }

  // ==========================================================================
  // 2. MOBILE NAVIGATION MENU
  // ==========================================================================
  const mobileToggleBtn = document.getElementById("mobile-toggle-btn");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (mobileToggleBtn && navMenu) {
    mobileToggleBtn.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      mobileToggleBtn.classList.toggle("active");
      
      // Accessibility states
      const isOpen = navMenu.classList.contains("open");
      mobileToggleBtn.setAttribute("aria-expanded", isOpen);
    });

    // Close mobile nav when clicking links
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        mobileToggleBtn.classList.remove("active");
        mobileToggleBtn.setAttribute("aria-expanded", false);
      });
    });
  }

  // ==========================================================================
  // 3. INTERSECTION OBSERVER FOR SCROLL REVEALS
  // ==========================================================================
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        // Stop observing once revealed
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================================================
  // 4. ACTIVE NAVIGATION LINK HIGHLIGHTING
  // ==========================================================================
  const sections = document.querySelectorAll("section[id]");

  const navScrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
          } else {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
          }
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: "-20% 0px -60% 0px"
  });

  sections.forEach(sec => navScrollObserver.observe(sec));

  // ==========================================================================
  // 5. CONFERENCE TIMELINE FILTERING
  // ==========================================================================
  const tabBtns = document.querySelectorAll(".tab-btn");
  const timelineItems = document.querySelectorAll(".conf-timeline-item");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Toggle Active Tab Button Class
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const targetCategory = btn.getAttribute("data-target");

      timelineItems.forEach(item => {
        const itemCategory = item.getAttribute("data-category");

        if (targetCategory === "timeline-all") {
          item.classList.remove("hidden");
        } else if (itemCategory === targetCategory) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });

  // ==========================================================================
  // 6. CONTACT FORM SIMULATOR
  // ==========================================================================
  const contactForm = document.getElementById("contact-form");
  const submitBtn = document.getElementById("form-submit-btn");
  const feedbackMsg = document.getElementById("form-feedback");

  if (contactForm && submitBtn && feedbackMsg) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Show loader
      submitBtn.classList.add("loading");
      submitBtn.disabled = true;

      // Extract details
      const name = document.getElementById("form-name").value;
      const email = document.getElementById("form-email").value;
      const subject = document.getElementById("form-subject").value;
      const message = document.getElementById("form-message").value;

      // Simulate network request (1.5 seconds)
      setTimeout(() => {
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;

        // Display Success Msg
        feedbackMsg.className = "form-feedback-msg success";
        feedbackMsg.textContent = `Thank you, ${name}! Your message has been sent successfully. I will get back to you at ${email} within 48 hours.`;
        
        // Reset form
        contactForm.reset();

        // Hide notification after 7 seconds
        setTimeout(() => {
          feedbackMsg.style.display = "none";
        }, 7000);

      }, 1500);
    });
  }

  // ==========================================================================
  // 7. FOOTER LAST UPDATED DATE
  // ==========================================================================
  const lastUpdatedEl = document.getElementById("last-updated-date");
  if (lastUpdatedEl) {
    const today = new Date();
    const options = { month: 'long', year: 'numeric' };
    const dateString = today.toLocaleDateString('en-US', options);
    lastUpdatedEl.textContent = `Last updated: ${dateString}`;
  }

  // ==========================================================================
  // 8. INTERACTIVE CITATION SYSTEM
  // ==========================================================================
  const citationToggleBtns = document.querySelectorAll(".citation-toggle-btn");
  const citationTabs = document.querySelectorAll(".citation-tab");
  const copyCitationBtns = document.querySelectorAll(".copy-citation-btn");

  // Toggle Citation Drawer
  citationToggleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const paperId = btn.getAttribute("data-paper-id");
      const drawer = document.getElementById(`citation-drawer-${paperId}`);
      if (drawer) {
        const isHidden = drawer.style.display === "none";
        drawer.style.display = isHidden ? "block" : "none";
        
        const btnText = btn.querySelector("span");
        if (btnText) {
          btnText.textContent = isHidden ? "Hide Citation Drawer" : "Cite This Publication";
        }
      }
    });
  });

  // Switch Citation Format Tabs
  citationTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const paperId = tab.getAttribute("data-paper-id");
      const format = tab.getAttribute("data-format");
      
      // Deactivate all sibling tabs of this paper
      const parentContainer = tab.parentElement;
      const siblingTabs = parentContainer.querySelectorAll(".citation-tab");
      siblingTabs.forEach(t => t.classList.remove("active"));
      
      // Activate clicked tab
      tab.classList.add("active");
      
      // Update citation text
      const citationTextEl = document.getElementById(`citation-text-${paperId}`);
      if (citationTextEl) {
        const citationContent = citationTextEl.getAttribute(`data-${format}`);
        citationTextEl.textContent = citationContent;
      }
    });
  });

  // Copy Citation text to clipboard
  copyCitationBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const paperId = btn.getAttribute("data-paper-id");
      const citationTextEl = document.getElementById(`citation-text-${paperId}`);
      if (citationTextEl) {
        const textToCopy = citationTextEl.textContent.trim();
        
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalText = btn.textContent;
          btn.textContent = "Copied to Clipboard!";
          
          setTimeout(() => {
            btn.textContent = originalText;
          }, 2000);
        }).catch(err => {
          console.error("Could not copy text: ", err);
        });
      }
    });
  });
});
