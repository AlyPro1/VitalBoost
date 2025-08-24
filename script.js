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
  new CheckUpManager();
  new DailyTipsManager();
});

// CheckUP at One Click Manager
class CheckUpManager {
  constructor() {
    this.init();
  }
  
  init() {
   const checkupBtn = document.getElementById('checkupBtn');
const checkupModal = document.getElementById('checkupModal');
const modalClose = document.getElementById('modalClose');

if (checkupBtn && checkupModal && modalClose) {
  checkupBtn.addEventListener('click', () => this.openModal());
  modalClose.addEventListener('click', () => this.closeModal());
  checkupModal.addEventListener('click', (e) => {
    if (e.target === checkupModal) {
      this.closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !checkupModal.classList.contains('hidden')) {
      this.closeModal();
    }
  });
}
      
      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
          this.closeModal();
        }
      });
    }
  }
  
  openModal() {
    const modalOverlay = document.getElementById('modalOverlay');
    modalOverlay.classList.add('active');
    
    // Trigger confetti
    this.triggerConfetti();
    
    // Animate cards and stats after modal opens
    setTimeout(() => {
      this.animateCards();
      this.animateStats();
    }, 300);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }
  
  closeModal() {
    const modalOverlay = document.getElementById('modalOverlay');
    modalOverlay.classList.remove('active');
    
    // Reset stats
    this.resetStats();
    this.resetCards();
    
    // Restore body scroll
    document.body.style.overflow = '';
  }
  
  animateCards() {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate');
      }, index * 100);
    });
  }
  
  animateStats() {
    const stats = [
      { element: 'heart', value: this.getRandomValue(60, 100), color: '#ff6b6b' },
      { element: 'stress', value: this.getRandomValue(50, 85), color: '#feca57' },
      { element: 'energy', value: this.getRandomValue(70, 95), color: '#48dbfb' },
      { element: 'sleep', value: this.getRandomValue(65, 90), color: '#ff9ff3' }
    ];
    
    stats.forEach((stat, index) => {
      setTimeout(() => {
        this.animateCircularProgress(stat.element, stat.value);
      }, index * 200);
    });
  }
  
  animateCircularProgress(statType, targetValue) {
    const statCard = document.querySelector(`[data-stat="${statType}"]`);
    const progressRing = statCard.querySelector('.progress-ring-circle');
    const progressValue = statCard.querySelector('.progress-value');
    
    // Calculate stroke-dashoffset for the target value
    const circumference = 2 * Math.PI * 35; // radius = 35
    const offset = circumference - (targetValue / 100) * circumference;
    
    // Animate the circular progress
    setTimeout(() => {
      progressRing.style.strokeDashoffset = offset;
    }, 100);
    
    // Animate the number count-up
    let currentValue = 0;
    const duration = 2000; // 2 seconds
    const increment = targetValue / (duration / 16); // 60fps
    
    const updateProgress = () => {
      currentValue += increment;
      
      if (currentValue < targetValue) {
        progressValue.textContent = Math.floor(currentValue);
        requestAnimationFrame(updateProgress);
      } else {
        progressValue.textContent = targetValue;
      }
    };
    
    updateProgress();
  }
  
  resetStats() {
    const progressRings = document.querySelectorAll('.progress-ring-circle');
    const progressValues = document.querySelectorAll('.progress-value');
    
    progressRings.forEach(ring => {
      ring.style.strokeDashoffset = '220'; // Reset to full circle
    });
    
    progressValues.forEach(value => {
      value.textContent = '0';
    });
  }
  
  resetCards() {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
      card.classList.remove('animate');
      
      // Reset transform and opacity
      setTimeout(() => {
        card.style.transform = 'translateY(50px) scale(0.8)';
        card.style.opacity = '0';
      }, 100);
    });
  }
  
  getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  triggerConfetti() {
    const container = document.getElementById('confettiContainer');
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd'];
    
    // Create 150 confetti pieces for more impact
    for (let i = 0; i < 150; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-piece';
      
      // Random color
      const color = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.background = color;
      confetti.style.boxShadow = `0 0 6px ${color}`;
      
      // Random starting position
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.top = '-20px';
      
      // Random size
      const size = Math.random() * 10 + 8;
      confetti.style.width = size + 'px';
      confetti.style.height = size + 'px';
      
      // Random animation duration
      const duration = Math.random() * 1.5 + 2.5;
      confetti.style.animationDuration = duration + 's';
      
      // Random delay
      confetti.style.animationDelay = Math.random() * 0.3 + 's';
      
      container.appendChild(confetti);
      
      // Remove after animation
      setTimeout(() => {
        if (confetti.parentNode) {
          confetti.parentNode.removeChild(confetti);
        }
      }, (duration + 0.3) * 1000);
    }
    
    // Auto-clear confetti container after 3 seconds
    setTimeout(() => {
      container.innerHTML = '';
    }, 3000);
  }
}

// Daily Tips Manager
class DailyTipsManager {
  constructor() {
    this.savedTips = JSON.parse(localStorage.getItem('vitalboost-saved-tips') || '[]');
    this.init();
  }
  
  init() {
    this.initTipCards();
    this.initSaveButtons();
    this.initShareButtons();
  }
  
  initTipCards() {
    const tipCards = document.querySelectorAll('.tip-card');
    
    tipCards.forEach((card, index) => {
      // Add staggered animation delay
      card.style.animationDelay = `${index * 0.1}s`;
      
      // Add hover sound effect (optional)
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
      });
    });
  }
  
  initSaveButtons() {
    const saveButtons = document.querySelectorAll('.save-btn');
    
    saveButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const tipId = button.getAttribute('data-tip');
        this.saveTip(tipId, button);
      });
    });
  }
  
  initShareButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const tipId = button.getAttribute('data-tip');
        this.shareTip(tipId);
      });
    });
  }
  
  saveTip(tipId, button) {
    // Get tip content
    const tipCard = button.closest('.tip-card');
    const tipTitle = tipCard.querySelector('.card-back h4').textContent;
    const tipContent = tipCard.querySelector('.card-back p').textContent;
    
    const tip = {
      id: tipId,
      title: tipTitle,
      content: tipContent,
      savedAt: new Date().toISOString()
    };
    
    // Check if already saved
    if (!this.savedTips.find(t => t.id === tipId)) {
      this.savedTips.push(tip);
      localStorage.setItem('vitalboost-saved-tips', JSON.stringify(this.savedTips));
      
      // Update button state
      button.innerHTML = '<span class="btn-icon">✅</span>Saved!';
      button.style.background = 'rgba(16, 185, 129, 0.3)';
      
      // Trigger confetti
      this.triggerConfetti(button);
      
      // Reset button after 2 seconds
      setTimeout(() => {
        button.innerHTML = '<span class="btn-icon">💾</span>Save Tip';
        button.style.background = 'rgba(255, 255, 255, 0.2)';
      }, 2000);
    } else {
      // Already saved
      button.innerHTML = '<span class="btn-icon">✅</span>Already Saved';
      setTimeout(() => {
        button.innerHTML = '<span class="btn-icon">💾</span>Save Tip';
      }, 1500);
    }
  }
  
  shareTip(tipId) {
    const tipCard = document.querySelector(`[data-tip="${tipId}"]`).closest('.tip-card');
    const tipTitle = tipCard.querySelector('.card-back h4').textContent;
    const tipContent = tipCard.querySelector('.card-back p').textContent;
    
    const shareText = `💪 VitalBoost Tip: ${tipTitle}\n\n${tipContent}\n\n🚀 Get more daily health tips at VitalBoost!`;
    
    if (navigator.share) {
      // Use native sharing if available
      navigator.share({
        title: `VitalBoost Tip: ${tipTitle}`,
        text: shareText,
        url: window.location.href
      }).catch(console.error);
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(shareText).then(() => {
        // Show success message
        const shareBtn = document.querySelector(`[data-tip="${tipId}"].share-btn`);
        const originalText = shareBtn.innerHTML;
        shareBtn.innerHTML = '<span class="btn-icon">✅</span>Copied!';
        shareBtn.style.background = 'rgba(59, 130, 246, 0.3)';
        
        setTimeout(() => {
          shareBtn.innerHTML = originalText;
          shareBtn.style.background = 'rgba(255, 255, 255, 0.2)';
        }, 2000);
      }).catch(() => {
        // Fallback alert
        alert(`Share this tip:\n\n${shareText}`);
      });
    }
  }
  
  triggerConfetti(sourceElement) {
    const container = document.getElementById('confettiContainer');
    const rect = sourceElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create 50 confetti pieces
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-piece';
      
      // Random starting position around the button
      const startX = centerX + (Math.random() - 0.5) * 100;
      const startY = centerY + (Math.random() - 0.5) * 50;
      
      confetti.style.left = startX + 'px';
      confetti.style.top = startY + 'px';
      
      // Random horizontal drift
      const drift = (Math.random() - 0.5) * 200;
      confetti.style.setProperty('--drift', drift + 'px');
      
      // Random animation duration
      const duration = 2 + Math.random() * 2;
      confetti.style.animationDuration = duration + 's';
      
      // Random delay
      confetti.style.animationDelay = Math.random() * 0.5 + 's';
      
      container.appendChild(confetti);
      
      // Remove after animation
      setTimeout(() => {
        if (confetti.parentNode) {
          confetti.parentNode.removeChild(confetti);
        }
      }, (duration + 0.5) * 1000);
    }
  }
}

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
  
  .confetti-piece {
    animation-name: confettiFall;
  }
  
  @keyframes confettiFall {
    0% {
      transform: translateY(0) translateX(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) translateX(var(--drift, 0px)) rotate(720deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Quick Challenge Manager
class QuickChallengeManager {
  constructor() {
    this.completedChallenges = JSON.parse(localStorage.getItem('vitalboost-completed-challenges') || '[]');
    this.timers = {};
    this.currentSlide = 0;
    this.totalSlides = 5;
    this.init();
  }
  
  init() {
    this.initCarousel();
    this.initChallengeCards();
    this.initProgressTracker();
    this.updateProgress();
  }
  
  initCarousel() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const carousel = document.getElementById('challengeCarousel');
    
    if (prevBtn && nextBtn && carousel) {
      prevBtn.addEventListener('click', () => this.slideCarousel(-1));
      nextBtn.addEventListener('click', () => this.slideCarousel(1));
      
      // Touch/swipe support
      let startX = 0;
      carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
      });
      
      carousel.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) {
          if (diff > 0) {
            this.slideCarousel(1);
          } else {
            this.slideCarousel(-1);
          }
        }
      });
    }
  }
  
  slideCarousel(direction) {
    const carousel = document.getElementById('challengeCarousel');
    const cardWidth = 320 + 32; // card width + gap
    
    this.currentSlide += direction;
    
    if (this.currentSlide < 0) {
      this.currentSlide = this.totalSlides - 1;
    } else if (this.currentSlide >= this.totalSlides) {
      this.currentSlide = 0;
    }
    
    carousel.scrollTo({
      left: this.currentSlide * cardWidth,
      behavior: 'smooth'
    });
  }
  
  initChallengeCards() {
    const startButtons = document.querySelectorAll('.start-challenge-btn');
    const completeButtons = document.querySelectorAll('.complete-challenge-btn');
    const timerButtons = document.querySelectorAll('.timer-btn');
    
    startButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const challengeId = button.getAttribute('data-challenge');
        this.startChallenge(challengeId);
      });
    });
    
    completeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const challengeId = button.getAttribute('data-challenge');
        this.completeChallenge(challengeId);
      });
    });
    
    timerButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const challengeId = button.getAttribute('data-challenge');
        const action = button.classList.contains('start-btn') ? 'start' :
                      button.classList.contains('pause-btn') ? 'pause' : 'reset';
        this.handleTimer(challengeId, action);
      });
    });
    
    // Water tracker
    const waterGlasses = document.querySelectorAll('.water-glass');
    waterGlasses.forEach(glass => {
      glass.addEventListener('click', () => {
        const glassNumber = parseInt(glass.getAttribute('data-glass'));
        this.updateWaterTracker(glassNumber);
      });
    });
    
    // Snack options
    const snackOptions = document.querySelectorAll('.snack-option');
    snackOptions.forEach(option => {
      option.addEventListener('click', () => {
        snackOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
      });
    });
    
    // Update UI based on completed challenges
    this.updateChallengeStatus();
  }
  
  startChallenge(challengeId) {
    const card = document.querySelector(`[data-challenge="${challengeId}"]`);
    const expanded = document.getElementById(`expanded-${challengeId}`);
    
    if (expanded) {
      expanded.classList.add('active');
      card.style.maxWidth = '400px';
      card.style.minWidth = '400px';
      
      // Scroll to show expanded content
      setTimeout(() => {
        expanded.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 300);
    }
  }
  
  handleTimer(challengeId, action) {
    const timerDisplay = document.getElementById(`timer-${challengeId}`);
    const timerBar = document.getElementById(`timerBar-${challengeId}`);
    const breathCircle = document.getElementById(`breathCircle-${challengeId}`);
    const breathText = document.getElementById(`breathText-${challengeId}`);
    
    if (!this.timers[challengeId]) {
      const durations = { '1': 300, '3': 180, '4': 240 }; // 5min, 3min, 4min in seconds
      this.timers[challengeId] = {
        duration: durations[challengeId] || 300,
        remaining: durations[challengeId] || 300,
        interval: null,
        isRunning: false
      };
    }
    
    const timer = this.timers[challengeId];
    
    switch (action) {
      case 'start':
        if (!timer.isRunning) {
          timer.isRunning = true;
          timer.interval = setInterval(() => {
            timer.remaining--;
            
            const minutes = Math.floor(timer.remaining / 60);
            const seconds = timer.remaining % 60;
            timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (timerBar) {
              const progress = ((timer.duration - timer.remaining) / timer.duration) * 100;
              timerBar.style.width = `${progress}%`;
            }
            
            // Breathing guide for challenge 3
            if (challengeId === '3' && breathCircle && breathText) {
              const cycle = Math.floor((timer.duration - timer.remaining) / 19); // 4+7+8 = 19 seconds per cycle
              const cycleTime = (timer.duration - timer.remaining) % 19;
              
              if (cycleTime < 4) {
                breathCircle.className = 'breath-circle inhale';
                breathText.textContent = 'Inhale';
              } else if (cycleTime < 11) {
                breathCircle.className = 'breath-circle hold';
                breathText.textContent = 'Hold';
              } else {
                breathCircle.className = 'breath-circle exhale';
                breathText.textContent = 'Exhale';
              }
            }
            
            if (timer.remaining <= 0) {
              clearInterval(timer.interval);
              timer.isRunning = false;
              this.completeChallenge(challengeId);
              this.showCompletionMessage(challengeId);
            }
          }, 1000);
        }
        break;
        
      case 'pause':
        if (timer.isRunning) {
          clearInterval(timer.interval);
          timer.isRunning = false;
        }
        break;
        
      case 'reset':
        clearInterval(timer.interval);
        timer.isRunning = false;
        timer.remaining = timer.duration;
        const minutes = Math.floor(timer.remaining / 60);
        const seconds = timer.remaining % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        if (timerBar) timerBar.style.width = '0%';
        if (breathCircle) {
          breathCircle.className = 'breath-circle';
          breathText.textContent = 'Ready';
        }
        break;
    }
  }
  
  updateWaterTracker(glassNumber) {
    const waterGlasses = document.querySelectorAll('.water-glass');
    const waterCount = document.getElementById('waterCount');
    
    // Fill glasses up to the clicked one
    waterGlasses.forEach((glass, index) => {
      if (index < glassNumber) {
        glass.classList.add('filled');
      } else {
        glass.classList.remove('filled');
      }
    });
    
    waterCount.textContent = glassNumber;
    
    // Auto-complete if 8 glasses reached
    if (glassNumber === 8) {
      setTimeout(() => this.completeChallenge('2'), 500);
    }
  }
  
  completeChallenge(challengeId) {
    if (!this.completedChallenges.includes(challengeId)) {
      this.completedChallenges.push(challengeId);
      localStorage.setItem('vitalboost-completed-challenges', JSON.stringify(this.completedChallenges));
      
      // Update UI
      this.updateChallengeStatus();
      this.updateProgress();
      
      // Trigger celebration
      this.triggerCelebration(challengeId);
    }
  }
  
  updateChallengeStatus() {
    this.completedChallenges.forEach(challengeId => {
      const status = document.getElementById(`status-${challengeId}`);
      const completeBtn = document.querySelector(`[data-challenge="${challengeId}"].complete-challenge-btn`);
      
      if (status) {
        status.classList.add('completed');
      }
      
      if (completeBtn) {
        completeBtn.textContent = '✅ Completed!';
        completeBtn.disabled = true;
      }
    });
  }
  
  updateProgress() {
    const progressBar = document.getElementById('progressBar');
    const completedCount = document.getElementById('completedCount');
    
    const progress = (this.completedChallenges.length / 5) * 100;
    
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
    
    if (completedCount) {
      completedCount.textContent = this.completedChallenges.length;
    }
  }
  
  initProgressTracker() {
    // Animate progress bar on load
    setTimeout(() => {
      this.updateProgress();
    }, 1000);
  }
  
  triggerCelebration(challengeId) {
    const card = document.querySelector(`[data-challenge="${challengeId}"]`);
    
    // Create celebration particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 8px;
        height: 8px;
        background: ${['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'][i % 4]};
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
      `;
      
      const rect = card.getBoundingClientRect();
      particle.style.left = (rect.left + rect.width / 2) + 'px';
      particle.style.top = (rect.top + rect.height / 2) + 'px';
      
      document.body.appendChild(particle);
      
      // Animate particle
      const angle = (i / 20) * Math.PI * 2;
      const velocity = 100 + Math.random() * 100;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;
      
      particle.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${vx}px, ${vy}px) scale(0)`, opacity: 0 }
      ], {
        duration: 1000,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }).onfinish = () => particle.remove();
    }
    
    // Show success message
    this.showCompletionMessage(challengeId);
  }
  
  showCompletionMessage(challengeId) {
    const messages = {
      '1': '🎉 Amazing! You crushed that energy boost!',
      '2': '💧 Fantastic! You\'re properly hydrated!',
      '3': '🧘‍♂️ Perfect! You\'re centered and calm!',
      '4': '💪 Incredible! You\'re getting stronger!',
      '5': '🍎 Great choice! Healthy snacking wins!'
    };
    
    const message = messages[challengeId] || '🎉 Challenge completed!';
    
    // Create toast notification
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #10b981, #3b82f6);
      color: white;
      padding: 1rem 2rem;
      border-radius: 10px;
      font-weight: 600;
      z-index: 1000;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}
// ========== CheckUp 1 Click Feature ==========
const checkupBtn = document.getElementById("checkupBtn");
const checkupModal = document.getElementById("checkupModal");
const closeBtn = document.querySelector(".close-btn");

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function openCheckup() {
  checkupModal.style.display = "flex";

  // Animate stats
  document.getElementById("heartRate").textContent = randomBetween(60, 100);
  document.getElementById("stressLevel").textContent = randomBetween(50, 85);
  document.getElementById("energyLevel").textContent = randomBetween(70, 95);
  document.getElementById("sleepLevel").textContent = randomBetween(65, 90);

  // Confetti (simple)
  for (let i = 0; i < 100; i++) {
    let confetti = document.createElement("div");
    confetti.classList.add("confetti");
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
  }
}

function closeCheckup() {
  checkupModal.style.display = "none";
}

checkupBtn.addEventListener("click", openCheckup);
closeBtn.addEventListener("click", closeCheckup);
window.addEventListener("click", (e) => {
  if (e.target === checkupModal) closeCheckup();
});

// --- CheckUp Modal Logic ---
const modal = document.getElementById("checkupModal");
const btn = document.getElementById("checkupBtn");
const checkupCloseBtn = document.getElementById("closeModal");

btn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  runStats();
});

checkupCloseBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});

// Generate random stats
function runStats() {
  document.getElementById("heartRate").innerText = Math.floor(Math.random() * 40) + 60;
  document.getElementById("stress").innerText = Math.floor(Math.random() * 35) + 50;
  document.getElementById("energy").innerText = Math.floor(Math.random() * 25) + 70;
  document.getElementById("sleep").innerText = Math.floor(Math.random() * 25) + 65;
}

