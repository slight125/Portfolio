// Custom cursor effect
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  
  setTimeout(() => {
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';
  }, 100);
});

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item, .contact-item');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(1.5)';
    cursorFollower.style.transform = 'scale(0.5)';
  });
  
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    cursorFollower.style.transform = 'scale(1)';
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      }
    });
  });
  
// Reveal sections on scroll with improved performance
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});



// Advanced typing animation with type and delete effect
function typeWriter(element, text, speed = 100) {
  let i = 0;
  let isDeleting = false;
  let currentText = '';
  
  function type() {
    if (!isDeleting && i < text.length) {
      // Typing
      currentText = text.substring(0, i + 1);
      element.textContent = currentText;
      i++;
      setTimeout(type, speed);
    } else if (isDeleting && i > 0) {
      // Deleting
      currentText = text.substring(0, i - 1);
      element.textContent = currentText;
      i--;
      setTimeout(type, speed / 2);
    } else {
      // Switch direction
      isDeleting = !isDeleting;
      setTimeout(type, 1000); // Pause before switching
    }
  }
  
  type();
}

// Initialize typing animation for name
document.addEventListener('DOMContentLoaded', () => {
  const nameElement = document.querySelector('.typing-text');
  if (nameElement) {
    const originalText = nameElement.textContent;
    nameElement.textContent = '';
    
    // Ensure the container has enough width to display the full text
    const heroName = nameElement.closest('.hero-name');
    if (heroName) {
      // Temporarily set the text to measure width
      nameElement.textContent = originalText;
      const textWidth = nameElement.scrollWidth;
      nameElement.textContent = '';
      
      // Set minimum width to prevent wrapping
      heroName.style.minWidth = textWidth + 'px';
    }
    
    setTimeout(() => {
      typeWriter(nameElement, originalText, 150);
    }, 1000);
  }
});

// Animate stats numbers
function animateStats() {
  const stats = document.querySelectorAll('.stat-number');
  
  stats.forEach(stat => {
    const target = parseInt(stat.textContent);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      stat.textContent = Math.floor(current) + '+';
    }, 16);
  });
}

// Parallax effect for hero section (disabled to prevent overlap)
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const floatingElements = document.querySelectorAll('.floating-element');
  
  // Only animate floating elements, not the entire hero section
  floatingElements.forEach((element, index) => {
    const speed = 0.2 + (index * 0.05);
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
}

// Enhanced Navigation with Mobile Support
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Update active navigation link based on scroll position
  function updateActiveNav() {
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to current section link
        const currentLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        currentLink?.classList.add('active');
      }
    });
  }

  // Update active state on scroll
  window.addEventListener('scroll', updateActiveNav);
  
  // Initial active state
  updateActiveNav();
}

// Initialize animations when page loads
window.addEventListener('load', () => {
  // Trigger stats animation when about section is visible
  const aboutSection = document.querySelector('#about');
  if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          aboutObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    aboutObserver.observe(aboutSection);
  }
  
  // Initialize particles
  createParticles();
  
  // Add loading animation
  document.body.classList.add('loaded');
});

// Create floating particles
function createParticles() {
  const particlesContainer = document.querySelector('.particles');
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
    particlesContainer.appendChild(particle);
  }
}

// Scroll progress indicator
window.addEventListener('scroll', () => {
  const scrollProgress = document.querySelector('.scroll-progress');
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.offsetHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  
  if (scrollProgress) {
    scrollProgress.style.width = scrollPercent + '%';
  }
});

// Add loading animation styles
const style = document.createElement('style');
style.textContent = `
  body:not(.loaded) {
    opacity: 0;
  }
  
  body.loaded {
    opacity: 1;
    transition: opacity 0.5s ease;
  }
  
  .nav-links.active {
    display: flex;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--bg-primary);
    flex-direction: column;
    padding: 2rem;
    box-shadow: var(--shadow-lg);
  }
  
  .hamburger.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  
  .hamburger.active span:nth-child(2) {
    opacity: 0;
  }
  
  .hamburger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }
  
  .nav-links a.active {
    color: var(--primary-color);
  }
  
  .nav-links a.active::after {
    width: 100%;
  }
`;
document.head.appendChild(style);
  
// Tech Background Enhancements
function enhanceTechBackground() {
  const techIcons = document.querySelectorAll('.tech-icon');
  const dataStreams = document.querySelectorAll('.data-stream');
  
  // Interactive tech icons
  techIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      icon.style.transform = 'scale(1.3) rotate(10deg)';
      icon.style.filter = 'drop-shadow(0 0 25px rgba(99, 102, 241, 0.9))';
    });
    
    icon.addEventListener('mouseleave', () => {
      icon.style.transform = '';
      icon.style.filter = '';
    });
  });
  
  // Parallax effect for tech elements
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.tech-icon, .glow-orb');
    
    parallaxElements.forEach(element => {
      const speed = 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
  
  // Data stream enhancement
  dataStreams.forEach(stream => {
    const bits = stream.querySelectorAll('.data-bit');
    bits.forEach((bit, index) => {
      bit.style.animationDelay = `${index * 0.2}s`;
    });
  });
  
  // Responsive tech background adjustments
  function adjustTechElements() {
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;
    
    techIcons.forEach(icon => {
      if (isSmallMobile) {
        icon.style.width = '30px';
        icon.style.height = '30px';
        icon.style.fontSize = '14px';
      } else if (isMobile) {
        icon.style.width = '40px';
        icon.style.height = '40px';
        icon.style.fontSize = '18px';
      } else {
        icon.style.width = '50px';
        icon.style.height = '50px';
        icon.style.fontSize = '24px';
      }
    });
  }
  
  // Adjust on load and resize
  adjustTechElements();
  window.addEventListener('resize', adjustTechElements);
}

// Initialize tech background enhancements
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initMobileMenu();
  enhanceTechBackground();
});

// Mobile Menu Functionality
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const body = document.body;

  // Toggle mobile menu
  function toggleMobileMenu() {
    const isOpen = mobileMenuOverlay.classList.contains('active');
    
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  // Open mobile menu
  function openMobileMenu() {
    hamburger.classList.add('active');
    mobileMenuOverlay.classList.add('active');
    body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  // Close mobile menu
  function closeMobileMenu() {
    hamburger.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    body.style.overflow = ''; // Restore scrolling
  }

  // Event listeners
  hamburger.addEventListener('click', toggleMobileMenu);
  mobileMenuClose.addEventListener('click', closeMobileMenu);

  // Close menu when clicking overlay
  mobileMenuOverlay.addEventListener('click', (e) => {
    if (e.target === mobileMenuOverlay) {
      closeMobileMenu();
    }
  });

  // Close menu when clicking nav links
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileMenuOverlay.classList.contains('active')) {
      closeMobileMenu();
    }
  });
}
  