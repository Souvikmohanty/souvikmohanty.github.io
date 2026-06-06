document.addEventListener("DOMContentLoaded", () => {
  
  // 1. GSAP Page Loader
  const loader = document.querySelector('.page-loader');
  const loaderText = document.querySelector('.loader-text');
  
  if (loader && typeof gsap !== 'undefined') {
    // Initial state
    gsap.set('body', { overflow: 'hidden' });
    gsap.set(loaderText, { opacity: 0, y: 30 });
    
    const tl = gsap.timeline();
    
    tl.to(loaderText, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    })
    .to(loaderText, {
      opacity: 0,
      y: -30,
      duration: 0.8,
      ease: "power3.in",
      delay: 0.5
    })
    .to(loader, {
      yPercent: -100,
      duration: 1,
      ease: "power4.inOut",
      onComplete: () => {
        gsap.set('body', { overflow: 'auto' });
        loader.style.display = 'none';
        
        // Hero Reveal
        gsap.from('.hero-tag', { opacity: 0, y: 20, duration: 0.8 });
        gsap.from('.hero-name', { opacity: 0, y: 20, duration: 0.8, delay: 0.2 });
        gsap.from('.hero-tagline', { opacity: 0, y: 20, duration: 0.8, delay: 0.4 });
        gsap.from('.hero-meta', { opacity: 0, y: 20, duration: 0.8, delay: 0.6 });
        gsap.from('.hero-actions', { opacity: 0, y: 20, duration: 0.8, delay: 0.8 });
      }
    });
  }

  // 2. Typewriter Effect (Replaces Rotating Text)
  if (typeof gsap !== 'undefined') {
    if (typeof TextPlugin !== 'undefined') {
      gsap.registerPlugin(TextPlugin);
    }
    
    const words = ["sustainable agriculture", "pollinator ecology", "pest management", "innovative farming"];
    let currentIndex = 0;
    const typeWriterEl = document.querySelector('.typewriter-text');
    
    if (typeWriterEl) {
      // Start the infinite timeline
      const typeTl = gsap.timeline({ repeat: -1 });

      words.forEach((word) => {
        // Type the word
        typeTl.to(typeWriterEl, {
          duration: 1.5,
          text: word,
          ease: "none",
          delay: 0.5 // Delay before typing starts
        });
        
        // Wait reading time
        typeTl.to({}, { duration: 1.5 });
        
        // Delete the word
        typeTl.to(typeWriterEl, {
          duration: 1,
          text: "",
          ease: "none"
        });
      });
    }
  }
});
