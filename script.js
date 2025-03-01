// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Create particles for background effect
  createParticles();

  // Mobile navigation toggle
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavClose = document.querySelector('.mobile-nav-close');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function () {
      mobileNav.classList.add('active');
      mobileNavOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling when nav is open
    });
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', function () {
      mobileNav.classList.remove('active');
      mobileNavOverlay.classList.remove('active');
      document.body.style.overflow = ''; // Re-enable scrolling
    });
  }

  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', function () {
      mobileNav.classList.remove('active');
      mobileNavOverlay.classList.remove('active');
      document.body.style.overflow = ''; // Re-enable scrolling
    });
  }

  // Close mobile nav when a link is clicked
  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', function () {
      mobileNav.classList.remove('active');
      mobileNavOverlay.classList.remove('active');
      document.body.style.overflow = ''; // Re-enable scrolling
    });
  });

  // Mobile bottom navigation
  const bottomNavLinks = document.querySelectorAll('.mobile-bottom-nav-link');

  bottomNavLinks.forEach((link) => {
    link.addEventListener('click', function () {
      bottomNavLinks.forEach((l) => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Floating action button (scroll to top)
  const floatingActionBtn = document.querySelector('.floating-action-btn');

  if (floatingActionBtn) {
    // Show/hide the button based on scroll position
    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) {
        floatingActionBtn.classList.add('visible');
      } else {
        floatingActionBtn.classList.remove('visible');
      }
    });

    // Scroll to top when clicked
    floatingActionBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  // Touch ripple effect for mobile
  document.addEventListener('touchstart', function (e) {
    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;

    const ripple = document.createElement('div');
    ripple.classList.add('touch-ripple');
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    document.body.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });

  // Pull to refresh simulation
  let touchStartY = 0;
  const pullToRefresh = document.querySelector('.pull-to-refresh');

  document.addEventListener('touchstart', function (e) {
    touchStartY = e.touches[0].clientY;
  });

  document.addEventListener('touchmove', function (e) {
    if (window.scrollY === 0 && e.touches[0].clientY > touchStartY + 50) {
      pullToRefresh.classList.add('active');
    }
  });

  document.addEventListener('touchend', function () {
    if (pullToRefresh.classList.contains('active')) {
      setTimeout(() => {
        pullToRefresh.classList.remove('active');
      }, 1000);
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return; // Skip if it's just a "#" link

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed header
          behavior: 'smooth',
        });

        // Update active nav link
        document.querySelectorAll('nav a').forEach((navLink) => {
          navLink.removeAttribute('aria-current');
        });

        this.setAttribute('aria-current', 'page');

        // Update mobile bottom nav
        if (window.innerWidth <= 768) {
          document.querySelectorAll('.mobile-bottom-nav-link').forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
              link.classList.add('active');
            }
          });
        }
      }
    });
  });

  // Tab functionality for Projects and Certificates
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      // Remove active class from all buttons and contents
      tabBtns.forEach((b) => b.classList.remove('active'));
      tabContents.forEach((c) => c.classList.remove('active'));

      // Add active class to clicked button
      this.classList.add('active');

      // Show corresponding content
      const targetId = this.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // Form submission handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      // Here you would typically send the form data to a server
      // For now, we'll just log it to the console
      console.log('Form submitted:', { name, email, subject, message });

      // Show a success message (in a real application, you'd wait for the server response)
      alert('Thank you for your message! I will get back to you soon.');

      // Reset the form
      contactForm.reset();
    });
  }

  // Header scroll effect
  const header = document.querySelector('header');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', function () {
    // Add scrolled class when scrolled down
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Hide header when scrolling down, show when scrolling up
    if (window.scrollY > lastScrollY && window.scrollY > 200) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }

    lastScrollY = window.scrollY;
  });

  // Highlight active section in navigation based on scroll position
  window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    const mobileBottomNavLinks = document.querySelectorAll('.mobile-bottom-nav-link');

    let currentSection = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    // Update desktop nav
    navLinks.forEach((link) => {
      link.removeAttribute('aria-current');
      const href = link.getAttribute('href');

      if (href === '/' && currentSection === '') {
        link.setAttribute('aria-current', 'page');
      } else if (href === `#${currentSection}`) {
        link.setAttribute('aria-current', 'page');
      }
    });

    // Update mobile bottom nav
    mobileBottomNavLinks.forEach((link) => {
      link.classList.remove('active');
      const href = link.getAttribute('href');

      if (href === '/' && currentSection === '') {
        link.classList.add('active');
      } else if (href === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // Add animation to elements when they come into view
  const animateOnScroll = function () {
    const elements = document.querySelectorAll('.project-card, .certificate-card, .skill-item, .stat-item, .section-header, .about-text p, .contact-info, .contact-form, .tab-btn, .tech-bubble');

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (elementPosition < screenPosition) {
        element.classList.add('animated');
      }
    });
  };

  // Set initial styles for animation
  document.querySelectorAll('.project-card, .certificate-card, .skill-item, .stat-item, .section-header, .about-text p, .contact-info, .contact-form, .tab-btn, .tech-bubble').forEach((element) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  // Add animated class to trigger animations
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.animated').forEach((element) => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    });
  });

  // Run animation on scroll
  window.addEventListener('scroll', animateOnScroll);

  // Run once on page load
  animateOnScroll();

  // 3D tilt effect for elements with tilt class
  const tiltElements = document.querySelectorAll('.tilt');

  tiltElements.forEach((element) => {
    element.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xPercent = x / rect.width;
      const yPercent = y / rect.height;

      const xRotation = (yPercent - 0.5) * -10; // Rotate around X axis
      const yRotation = (xPercent - 0.5) * 10; // Rotate around Y axis

      this.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
    });

    element.addEventListener('mouseleave', function () {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });

    // For touch devices
    element.addEventListener('touchmove', function (e) {
      if (window.innerWidth <= 768) return; // Skip on small screens

      const touch = e.touches[0];
      const rect = this.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      const xPercent = x / rect.width;
      const yPercent = y / rect.height;

      const xRotation = (yPercent - 0.5) * -10; // Rotate around X axis
      const yRotation = (xPercent - 0.5) * 10; // Rotate around Y axis

      this.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
    });

    element.addEventListener('touchend', function () {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });

  // Particle background effect
  function createParticles() {
    const body = document.body;

    // Reduce number of particles on mobile
    const particleCount = window.innerWidth <= 768 ? 25 : 50;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');

      // Random position
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;

      // Random size
      const size = Math.random() * 5 + 1;

      // Random opacity
      const opacity = Math.random() * 0.5 + 0.1;

      // Random animation duration
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;

      // Set styles
      particle.style.cssText = `
                position: fixed;
                top: ${posY}%;
                left: ${posX}%;
                width: ${size}px;
                height: ${size}px;
                background-color: rgba(100, 255, 218, ${opacity});
                border-radius: 50%;
                pointer-events: none;
                z-index: 0;
                animation: float ${duration}s ${delay}s linear infinite;
              `;

      body.appendChild(particle);
    }
  }

  // Typing effect for hero heading
  const heroHeading = document.querySelector('.hero-content h1');
  if (heroHeading) {
    const text = heroHeading.textContent;
    heroHeading.innerHTML = '';

    let i = 0;
    const typeWriter = function () {
      if (i < text.length) {
        heroHeading.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        // Remove the cursor when typing is complete
        heroHeading.classList.add('typing-done');
      }
    };

    // Start the typing effect after a short delay
    setTimeout(typeWriter, 500);
  }

  // Add glitch effect to elements with glitch class
  const glitchElements = document.querySelectorAll('.glitch');

  glitchElements.forEach((element) => {
    setInterval(() => {
      element.classList.add('active-glitch');
      setTimeout(() => {
        element.classList.remove('active-glitch');
      }, 200);
    }, 5000);
  });

  // Add ripple effect to buttons
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach((button) => {
    button.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.classList.add('btn-ripple');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });

    // For touch devices
    button.addEventListener('touchstart', function (e) {
      const touch = e.touches[0];
      const rect = this.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.classList.add('btn-ripple');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Detect swipe gestures for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
  });

  document.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 100; // Minimum distance for a swipe

    if (touchEndX < touchStartX - swipeThreshold) {
      // Swiped left - could be used for navigation or showing a menu
      console.log('Swiped left');
    }

    if (touchEndX > touchStartX + swipeThreshold) {
      // Swiped right - could be used for navigation or hiding a menu
      console.log('Swiped right');
    }
  }

  // Handle orientation changes
  window.addEventListener('orientationchange', function () {
    // Refresh particles on orientation change
    document.querySelectorAll('.particle').forEach((p) => p.remove());
    setTimeout(() => {
      createParticles();
    }, 300);
  });

  // Optimize animations for mobile
  function optimizeForMobile() {
    if (window.innerWidth <= 768) {
      // Reduce or disable heavy animations on mobile
      document.querySelectorAll('.particle').forEach((p) => {
        p.style.animationDuration = '30s'; // Slower animations
      });

      // Disable certain hover effects that don't work well on touch
      document.querySelectorAll('.hover-3d').forEach((el) => {
        el.classList.remove('hover-3d');
      });
    }
  }

  // Run optimization on load and resize
  optimizeForMobile();
  window.addEventListener('resize', optimizeForMobile);

  // Double tap detection for mobile
  let lastTap = 0;
  document.addEventListener('touchend', function (e) {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;

    if (tapLength < 300 && tapLength > 0) {
      // Double tap detected
      e.preventDefault();
      const element = e.target.closest('.project-card, .certificate-card, .skill-item');

      if (element) {
        // Add a special effect for double tap
        element.classList.add('double-tapped');
        setTimeout(() => {
          element.classList.remove('double-tapped');
        }, 1000);
      }
    }

    lastTap = currentTime;
  });
});
