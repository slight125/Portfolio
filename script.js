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

// Enhanced theme toggle with smooth transitions
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  const icon = toggleBtn.querySelector('i');
  
  // Check for saved theme preference or detect system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const defaultTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  
  document.body.className = defaultTheme;
  updateThemeIcon(icon, defaultTheme);
  
  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Add transition class for smooth theme change
    document.body.style.transition = 'all 0.3s ease';
    
    // Toggle theme
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(newTheme);
    
    // Update icon
    updateThemeIcon(icon, newTheme);
    
    // Save preference
    localStorage.setItem('theme', newTheme);
    
    // Remove transition class after animation
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
  });
});

function updateThemeIcon(icon, theme) {
  if (theme === 'dark') {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
}

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

// Add active class to nav links based on scroll position
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

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
  