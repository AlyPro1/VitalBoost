// Image Carousel with 3D Effects
class ImageCarousel {
  constructor() {
    this.slides = document.querySelectorAll('.image-slide');
    this.currentSlide = 0;
    this.isTransitioning = false;
    
    this.init();
  }
  
  init() {
    // Start the carousel
    this.startCarousel();
    
    // Add parallax scrolling effect
    this.initParallax();
    
    // Initialize counter animation
    this.animateCounter();
    
    // Add button interactions
    this.initButtonEffects();
  }
  
  startCarousel() {
    setInterval(() => {
      if (!this.isTransitioning) {
        this.nextSlide();
      }
    }, 4000);
  }
  
  nextSlide() {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    
    // Remove active class from current slide
    this.slides[this.currentSlide].classList.remove('active');
    this.slides[this.currentSlide].classList.add('next');
    
    // Move to next slide
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    
    // Add active class to new slide
    setTimeout(() => {
      this.slides[this.currentSlide].classList.add('active');
      this.slides[this.currentSlide].classList.remove('next');
      
      // Clean up previous slide
      this.slides.forEach((slide, index) => {
        if (index !== this.currentSlide) {
          slide.classList.remove('active', 'next');
        }
      });
      
      this.isTransitioning = false;
    }, 100);
  }
  
  initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    const floatingElements = document.querySelectorAll('.floating-element');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.3;
        element.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
      });
      
      floatingElements.forEach((element, index) => {
        const speed = (index + 1) * 0.2;
        element.style.transform = `translateY(${rate * speed}px) translateX(${Math.sin(scrolled * 0.01) * 10}px)`;
      });
    });
  }
  
  animateCounter() {
    const counterElement = document.getElementById('counterNumber');
    const targetNumber = 15324;
    const duration = 2000;
    const increment = targetNumber / (duration / 16);
    let currentNumber = 0;
    
    const updateCounter = () => {
      currentNumber += increment;
      if (currentNumber < targetNumber) {
        counterElement.textContent = Math.floor(currentNumber).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        counterElement.textContent = targetNumber.toLocaleString();
      }
    };
    
    // Start counter animation after a delay
    setTimeout(updateCounter, 1500);
  }
  
  initButtonEffects() {
    const ctaButton = document.getElementById('ctaButton');
    
    // Add micro-bounce effect on hover
    ctaButton.addEventListener('mouseenter', () => {
      ctaButton.style.animation = 'none';
      ctaButton.offsetHeight; // Trigger reflow
      ctaButton.style.animation = 'microBounce 0.6s ease-out';
    });
    
    // Add click effect
    ctaButton.addEventListener('click', (e) => {
      // Create ripple effect
      const ripple = document.createElement('div');
      const rect = ctaButton.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;
      
      ctaButton.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
      
      // Simulate action (replace with actual functionality)
      setTimeout(() => {
        alert('🎉 Welcome to VitalBoost! Your daily health tip is on its way!');
      }, 300);
    });
  }
}

// Mouse movement parallax effect
class MouseParallax {
  constructor() {
    this.init();
  }
  
  init() {
    document.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;
      
      // Apply subtle parallax to floating elements
      const floatingElements = document.querySelectorAll('.floating-element');
      floatingElements.forEach((element, index) => {
        const intensity = (index + 1) * 5;
        element.style.transform += ` translate(${xPercent * intensity}px, ${yPercent * intensity}px)`;
      });
      
      // Apply parallax to brand logo
      const brand = document.querySelector('.brand');
      if (brand) {
        brand.style.transform = `translate(${xPercent * 10}px, ${yPercent * 10}px)`;
      }
    });
  }
}

// Performance optimization for animations
class PerformanceOptimizer {
  constructor() {
    this.init();
  }
  
  init() {
    // Reduce animations on low-performance devices
    if (this.isLowPerformanceDevice()) {
      document.body.classList.add('reduced-motion');
    }
    
    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
      const elements = document.querySelectorAll('.floating-element, .parallax-element');
      elements.forEach(element => {
        element.style.animationPlayState = document.hidden ? 'paused' : 'running';
      });
    });
  }
  
  isLowPerformanceDevice() {
    return navigator.hardwareConcurrency < 4 || 
           /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ImageCarousel();
  new MouseParallax();
  new PerformanceOptimizer();
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes microBounce {
    0%, 100% { transform: translateY(0) scale(1); }
    25% { transform: translateY(-5px) scale(1.02); }
    50% { transform: translateY(-3px) scale(1.05); }
    75% { transform: translateY(-7px) scale(1.03); }
  }
  
  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
  
  .reduced-motion * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
`;
document.head.appendChild(style);