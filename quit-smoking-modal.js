// Quit Smoking Modal JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const quitSmokingBtn = document.getElementById('quitSmokingBtn');
    const quitModal = document.getElementById('quitSmokingModal');
    const closeQuitModal = document.getElementById('closeQuitModal');

    // Check if elements exist before adding event listeners
    if (quitSmokingBtn && quitModal && closeQuitModal) {
        // Open modal when cigarette button is clicked
        quitSmokingBtn.addEventListener('click', function(e) {
            e.preventDefault();
            quitModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            
            // Initialize animations and interactions
            initializeModalAnimations();
        });

        // Close modal when close button is clicked
        closeQuitModal.addEventListener('click', function() {
            closeModal();
        });

        // Close modal when clicking outside the modal container
        quitModal.addEventListener('click', function(e) {
            if (e.target === quitModal) {
                closeModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && quitModal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // Close modal function
    function closeModal() {
        quitModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Initialize modal animations and interactions
    function initializeModalAnimations() {
        // Initialize calculator functionality
        initializeCalculator();
        
        // Initialize progress circles
        initializeProgressCircles();
        
        // Initialize interactive elements
        initializeInteractiveElements();
        
        // Start cinematic animations
        startCinematicAnimations();
    }

    // Calculator functionality
    function initializeCalculator() {
        const calcBtns = document.querySelectorAll('.calc-btn');
        const calcNumbers = document.querySelectorAll('.calc-number');
        const progressFills = document.querySelectorAll('.progress-fill');

        calcBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const isIncrement = this.textContent === '+';
                const calcItem = this.closest('.calculator-item');
                const numberEl = calcItem.querySelector('.calc-number');
                const progressEl = calcItem.querySelector('.progress-fill');
                
                if (numberEl) {
                    let currentValue = parseInt(numberEl.textContent) || 0;
                    
                    if (isIncrement) {
                        currentValue += 1;
                    } else {
                        currentValue = Math.max(0, currentValue - 1);
                    }
                    
                    numberEl.textContent = currentValue;
                    
                    // Update progress bar if exists
                    if (progressEl) {
                        const maxValue = 50; // Arbitrary max for demo
                        const percentage = Math.min((currentValue / maxValue) * 100, 100);
                        progressEl.style.width = percentage + '%';
                    }
                    
                    // Add animation effect
                    numberEl.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        numberEl.style.transform = 'scale(1)';
                    }, 200);
                }
            });
        });
    }

    // Initialize progress circles with animation
    function initializeProgressCircles() {
        const progressCircles = document.querySelectorAll('.circle-progress');
        
        progressCircles.forEach(circle => {
            const progress = circle.getAttribute('data-progress') || 85;
            const progressDeg = (progress / 100) * 360;
            
            // Animate the progress circle
            setTimeout(() => {
                circle.style.background = `conic-gradient(#00ff88 0deg, #00ff88 ${progressDeg}deg, rgba(255, 255, 255, 0.1) ${progressDeg}deg)`;
            }, 500);
        });
    }

    // Initialize interactive elements
    function initializeInteractiveElements() {
        // Start Journey Button
        const startJourneyBtn = document.querySelector('.start-journey-btn');
        if (startJourneyBtn) {
            startJourneyBtn.addEventListener('click', function() {
                // Add ripple effect
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (rect.width / 2 - size / 2) + 'px';
                ripple.style.top = (rect.height / 2 - size / 2) + 'px';
                
                this.style.position = 'relative';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
                
                // Show success message
                showNotification('Journey Started! 🚀', 'success');
            });
        }

        // Coach control buttons
        const coachBtns = document.querySelectorAll('.coach-btn');
        coachBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const icon = this.textContent;
                if (icon === '🎤') {
                    showNotification('Voice guidance activated 🎤', 'info');
                } else if (icon === '⏸️') {
                    showNotification('Session paused ⏸️', 'info');
                }
                
                // Add click animation
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });

        // Leaderboard item interactions
        const leaderboardItems = document.querySelectorAll('.leaderboard-item');
        leaderboardItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(8px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0) scale(1)';
            });
        });
    }

    // Start cinematic animations
    function startCinematicAnimations() {
        // Animate metric cards entrance
        const metricCards = document.querySelectorAll('.metric-card');
        metricCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });

        // Animate journey stages
        const journeyStages = document.querySelectorAll('.journey-stage');
        journeyStages.forEach((stage, index) => {
            stage.style.opacity = '0';
            stage.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                stage.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                stage.style.opacity = '1';
                stage.style.transform = 'scale(1)';
            }, 1000 + (index * 300));
        });

        // Animate leaderboard items
        const leaderboardItems = document.querySelectorAll('.leaderboard-item');
        leaderboardItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease-out';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 1500 + (index * 150));
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.quit-notification');
        existingNotifications.forEach(notif => notif.remove());

        const notification = document.createElement('div');
        notification.className = `quit-notification quit-notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff6b6b' : '#00ccff'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 14px;
            z-index: 10001;
            transform: translateX(100%);
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Add CSS animations for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .quit-notification {
            cursor: pointer;
        }
        
        .quit-notification:hover {
            transform: translateX(-5px) !important;
        }
    `;
    document.head.appendChild(style);

    // Smooth scrolling within modal
    const modal = document.getElementById('quitSmokingModal');
    if (modal) {
        modal.style.scrollBehavior = 'smooth';
    }

    // Add particle effects on hover for certain elements
    const interactiveElements = document.querySelectorAll('.metric-card, .challenge-card, .journey-stage');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            createHoverParticles(this);
        });
    });

    function createHoverParticles(element) {
        const rect = element.getBoundingClientRect();
        const particleCount = 5;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: #00ff88;
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                animation: particleFloat 1s ease-out forwards;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    }

    // Add particle float animation
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particleFloat {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-30px) scale(0);
            }
        }
    `;
    document.head.appendChild(particleStyle);
});
/* ===============================
   Cinematic runtime helpers:
   spawn smoke puffs + randomize butterflies + focus trap
   Append into quit-smoking-modal.js (below existing code)
   =============================== */

function startSmokePuffs() {
  const container = document.querySelector('.smoke-particles');
  if (!container) return;
  // avoid recreating on repeated opens
  if (container.dataset.puffsCreated) return;
  container.dataset.puffsCreated = '1';

  const puffCount = 8;
  for (let i = 0; i < puffCount; i++) {
    const p = document.createElement('div');
    p.className = 'puff';
    // Randomize horizontal position more naturally (use percentages)
    const left = 8 + Math.random() * 84; // between 8% and 92%
    p.style.left = left + '%';
    // Randomize size a bit
    const size = 30 + Math.random() * 80; // px
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    // Duration random
    const dur = 5 + Math.random() * 4; // 5-9s
    p.style.setProperty('--puffDur', dur + 's');
    // negative delay to stagger immediately
    p.style.animationDelay = '-' + (Math.random() * dur).toFixed(2) + 's';
    container.appendChild(p);
  }
}

function randomizeButterflies() {
  const butterflies = document.querySelectorAll('.floating-butterflies .butterfly');
  butterflies.forEach((b) => {
    const dur = 8 + Math.random() * 8; // 8-16s
    b.style.setProperty('--flyDur', dur + 's');
    // reposition a little (within the cinematic bg bounds)
    const left = 60 + Math.random() * 30; // keep them mostly on the right area like your layout
    const top = 10 + Math.random() * 70;
    b.style.left = left + '%';
    b.style.top = top + '%';
    // show class for transition in
    b.classList.add('show');
    // randomize delay
    b.style.animationDelay = '-' + (Math.random() * 4).toFixed(2) + 's';
  });
}

/* Basic focus trap for the modal */
function enableModalFocusTrap(modal) {
  if (!modal) return;
  modal.setAttribute('role','dialog');
  modal.setAttribute('aria-modal','true');

  let focusables = modal.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
  focusables = Array.prototype.slice.call(focusables);
  if (focusables.length === 0) return;
  const first = focusables[0], last = focusables[focusables.length - 1];

  function trap(e) {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }
  document.addEventListener('keydown', trap);

  // cleanup hook: remove listener when modal closes
  const observer = new MutationObserver(muts => {
    muts.forEach(m => {
      if (m.attributeName === 'class' && !modal.classList.contains('active')) {
        document.removeEventListener('keydown', trap);
        observer.disconnect();
      }
    });
  });
  observer.observe(modal, { attributes: true });
}

/* Call these from initializeModalAnimations() */
