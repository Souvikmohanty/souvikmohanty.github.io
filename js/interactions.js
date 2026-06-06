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

  // 2. Custom Cursor
  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.custom-cursor-follower');
  
  if (cursor && follower) {
    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;
    
    gsap.to({}, 0.016, {
      repeat: -1,
      onRepeat: () => {
        posX += (mouseX - posX) / 9;
        posY += (mouseY - posY) / 9;
        
        gsap.set(follower, {
          css: { left: posX - 15, top: posY - 15 }
        });
        gsap.set(cursor, {
          css: { left: mouseX - 4, top: mouseY - 4 }
        });
      }
    });

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Hover effect on links and buttons
    const interactiveElements = document.querySelectorAll('a, button, .btn, .glass-card, .conf-card');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        follower.classList.add('active');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        follower.classList.remove('active');
      });
    });
  }

  // 3. Rotating Text Words
  const rotatingWords = document.querySelectorAll('.rotating-text-word');
  if (rotatingWords.length > 0) {
    let currentIndex = 0;
    
    setInterval(() => {
      const currentWord = rotatingWords[currentIndex];
      currentWord.classList.remove('active');
      currentWord.classList.add('out');
      
      currentIndex = (currentIndex + 1) % rotatingWords.length;
      
      const nextWord = rotatingWords[currentIndex];
      nextWord.classList.remove('out');
      nextWord.classList.add('active');
    }, 3000);
  }

  // 4. Marquee Scroll Direction
  let lastScrollY = window.scrollY;
  const marqueeContent = document.querySelector('.marquee-content');
  
  if (marqueeContent) {
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        marqueeContent.style.animationDirection = 'normal';
      } else {
        // Scrolling up
        marqueeContent.style.animationDirection = 'reverse';
      }
      
      lastScrollY = currentScrollY;
    }, { passive: true });
  }
});
