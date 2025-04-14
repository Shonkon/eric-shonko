/**
 * Portfolio Website - Main JavaScript File
 * 
 * This script handles:
 * - Splash screen animation
 * - Mobile menu toggle
 * - Image slider in about section
 * - Projects carousel functionality
 * - Project details toggling
 * - Scroll effects and animations
 * - Accessibility improvements
 */

document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();
  
  // Initialize all components
  initSplashScreen();
  initMobileMenu();
  initImageSlider();
  initProjectCarousel();
  initProjectDetails();
  initScrollEffects();
});

/**
* Splash Screen Initialization
*/
function initSplashScreen() {
  const splashScreen = document.getElementById('splash-screen');
  
  // Only show splash screen if it's the first visit or after a certain time
  if (!sessionStorage.getItem('visited')) {
      splashScreen.style.display = 'flex';
      sessionStorage.setItem('visited', 'true');
  } else {
      splashScreen.style.display = 'none';
  }
  
  // Ensure splash screen is removed after animation
  splashScreen.addEventListener('animationend', function() {
      splashScreen.style.display = 'none';
  });
}

/**
* Mobile Menu Toggle
*/
function initMobileMenu() {
  const menuToggle = document.getElementById('mobile-menu');
  const navList = document.getElementById('nav-list');
  const navLinks = document.querySelectorAll('.nav-link');
  
  menuToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      navList.classList.toggle('active');
      
      // Toggle body scroll when menu is open
      document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
  });
  
  // Close menu when clicking a link
  navLinks.forEach(link => {
      link.addEventListener('click', function() {
          menuToggle.setAttribute('aria-expanded', 'false');
          navList.classList.remove('active');
          document.body.style.overflow = '';
      });
  });
}

/**
* About Section Image Slider
*/
function initImageSlider() {
  const sliderImg = document.querySelector('.slider-img');
  if (!sliderImg) return;
  
  const images = [
      'images/image1.jpg',
      'images/image2.jpg',
      'images/image3.jpg',
      'images/image4.jpg'
  ];
  
  // Preload images for smoother transitions
  images.forEach(src => {
      const img = new Image();
      img.src = src;
  });
  
  let index = 0;
  const interval = setInterval(() => {
      index = (index + 1) % images.length;
      sliderImg.style.opacity = 0;
      
      setTimeout(() => {
          sliderImg.src = images[index];
          sliderImg.style.opacity = 1;
      }, 500);
  }, 5000);
  
  // Cleanup on unmount (if using SPA)
  window.addEventListener('beforeunload', () => clearInterval(interval));
}

/**
* Projects Carousel Functionality
*/
function initProjectCarousel() {
  const projectBoxes = document.querySelector('.project-boxes');
  if (!projectBoxes) return;
  
  const boxes = document.querySelectorAll('.project-box');
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');
  
  if (boxes.length === 0) return;
  
  let currentIndex = 0;
  let autoScrollInterval;
  const scrollDelay = 6000; // 6 seconds
  
  // Calculate box width including gap
  const boxStyle = window.getComputedStyle(boxes[0]);
  const boxWidth = boxes[0].offsetWidth + parseInt(boxStyle.marginRight);
  
  // Initialize auto-scroll
  startAutoScroll();
  
  // Arrow click handlers
  if (rightArrow) {
      rightArrow.addEventListener('click', () => {
          navigateCarousel(1);
          resetAutoScroll();
      });
  }
  
  if (leftArrow) {
      leftArrow.addEventListener('click', () => {
          navigateCarousel(-1);
          resetAutoScroll();
      });
  }
  
  // Touch/swipe support for mobile
  setupTouchEvents();
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
          navigateCarousel(1);
          resetAutoScroll();
      } else if (e.key === 'ArrowLeft') {
          navigateCarousel(-1);
          resetAutoScroll();
      }
  });
  
  function navigateCarousel(direction) {
      currentIndex = (currentIndex + direction + boxes.length) % boxes.length;
      scrollToBox(currentIndex);
  }
  
  function scrollToBox(index) {
      const scrollPosition = index * boxWidth;
      projectBoxes.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
      });
  }
  
  function startAutoScroll() {
      autoScrollInterval = setInterval(() => {
          navigateCarousel(1);
      }, scrollDelay);
  }
  
  function resetAutoScroll() {
      clearInterval(autoScrollInterval);
      startAutoScroll();
  }
  
  function setupTouchEvents() {
      let touchStartX = 0;
      let touchEndX = 0;
      
      projectBoxes.addEventListener('touchstart', (e) => {
          touchStartX = e.changedTouches[0].screenX;
          clearInterval(autoScrollInterval);
      }, { passive: true });
      
      projectBoxes.addEventListener('touchend', (e) => {
          touchEndX = e.changedTouches[0].screenX;
          handleSwipe();
      }, { passive: true });
      
      function handleSwipe() {
          if (touchEndX < touchStartX - 50) {
              navigateCarousel(1); // Swiped left
          } else if (touchEndX > touchStartX + 50) {
              navigateCarousel(-1); // Swiped right
          }
          resetAutoScroll();
      }
  }
}

/**
* Project Details Toggle
*/
function initProjectDetails() {
  const projectButtons = document.querySelectorAll('.project-btn');
  
  projectButtons.forEach(button => {
      button.addEventListener('click', function() {
          const projectId = this.getAttribute('aria-controls');
          const projectDetails = document.getElementById(projectId);
          const isExpanded = this.getAttribute('aria-expanded') === 'true';
          
          // Close all other project details first
          document.querySelectorAll('.project-details').forEach(detail => {
              if (detail.id !== projectId) {
                  detail.hidden = true;
                  const otherBtn = detail.previousElementSibling;
                  if (otherBtn && otherBtn.classList.contains('project-btn')) {
                      otherBtn.setAttribute('aria-expanded', 'false');
                  }
              }
          });
          
          // Toggle current project details
          projectDetails.hidden = isExpanded;
          this.setAttribute('aria-expanded', (!isExpanded).toString());
      });
  });
}

/**
* Scroll Effects and Animations
*/
function initScrollEffects() {
  // Header scroll effect
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
          header.classList.add('scrolled');
      } else {
          header.classList.remove('scrolled');
      }
  });
  
  // Intersection Observer for scroll animations
  const observerOptions = {
      threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('animate');
          }
      });
  }, observerOptions);
  
  // Observe sections for animations
  document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
  });
}