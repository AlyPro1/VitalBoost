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
 startSmokePuffs();
  randomizeButterflies();
  enableModalFocusTrap(quitModal);
      animateQuitPlanStats();

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
function animateQuitPlanStats() {
  const counters = document.querySelectorAll('.streak-counter, .money-counter');
  counters.forEach(counter => {
    let target = +counter.getAttribute('data-target');
    let current = 0;
    let step = target / 60; // ~1 sec smooth
    let interval = setInterval(() => {
      current += step;
      if(current >= target) {
        current = target;
        clearInterval(interval);
      }
      counter.textContent = Math.floor(current);
    }, 16);
  });

  // Animate progress bars
  document.querySelectorAll('.progress-fill').forEach(fill => {
    fill.style.width = fill.getAttribute('data-progress') + "%";
  });
}
document.querySelectorAll('.circle-progress').forEach(circle => {
  const progress = circle.getAttribute('data-progress');
  circle.style.setProperty('--progress', progress / 100);
});

document.addEventListener("DOMContentLoaded", () => {
  const joinBtn = document.getElementById("joinChallengeBtn");
  const message = document.getElementById("challengeMessage");

  if (joinBtn && message) {
    joinBtn.addEventListener("click", () => {
      // Show confirmation
      message.textContent = "✅ Challenge Joined!";
      message.style.opacity = "1";

      // Hide after 3 seconds
      setTimeout(() => {
        message.style.opacity = "0";
      }, 3000);
    });
  }
});

// Coach Vital Boost Breathing Exercise Modal
document.addEventListener('DOMContentLoaded', function() {
  const coachSection = document.querySelector('.coach-section');
  const coachBreathingModal = document.getElementById('coachBreathingModal');
  const stopBreathingBtn = document.getElementById('stopBreathingBtn');
  const countdownTimer = document.getElementById('countdownTimer');
  
  let breathingInterval = null;
  let timeRemaining = 60;
  
  // Open breathing exercise modal when coach section is clicked
  if (coachSection && coachBreathingModal) {
    coachSection.addEventListener('click', function() {
      openBreathingModal();
    });
  }
  
  // Stop button functionality
  if (stopBreathingBtn) {
    stopBreathingBtn.addEventListener('click', function() {
      closeBreathingModal();
    });
  }
  
  // Close modal when clicking outside
  if (coachBreathingModal) {
    coachBreathingModal.addEventListener('click', function(e) {
      if (e.target === coachBreathingModal) {
        closeBreathingModal();
      }
    });
  }
  
  // Close with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && coachBreathingModal && coachBreathingModal.classList.contains('active')) {
      closeBreathingModal();
    }
  });
  
  function openBreathingModal() {
    if (!coachBreathingModal || !countdownTimer) return;
    
    // Reset timer
    timeRemaining = 60;
    countdownTimer.textContent = timeRemaining;
    
    // Show modal
    coachBreathingModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Start countdown
    startBreathingTimer();
  }
  
  function closeBreathingModal() {
    if (!coachBreathingModal) return;
    
    // Hide modal
    coachBreathingModal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Stop timer
    stopBreathingTimer();
  }
  
  function startBreathingTimer() {
    if (breathingInterval) clearInterval(breathingInterval);
    
    breathingInterval = setInterval(function() {
      timeRemaining--;
      
      if (countdownTimer) {
        countdownTimer.textContent = timeRemaining;
      }
      
      // Change timer color as it gets closer to 0
      if (countdownTimer) {
        if (timeRemaining <= 10) {
          countdownTimer.style.color = '#ff4757';
        } else if (timeRemaining <= 30) {
          countdownTimer.style.color = '#ffa502';
        } else {
          countdownTimer.style.color = '#00ffff';
        }
      }
      
      // Auto-close when timer reaches 0
      if (timeRemaining <= 0) {
        stopBreathingTimer();
        setTimeout(function() {
          closeBreathingModal();
          // Show completion message
          showBreathingCompletionMessage();
        }, 1000);
      }
    }, 1000);
  }
  
  function stopBreathingTimer() {
    if (breathingInterval) {
      clearInterval(breathingInterval);
      breathingInterval = null;
    }
  }
  
  function showBreathingCompletionMessage() {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(45deg, #00ff88, #00ccff);
      color: white;
      padding: 20px 30px;
      border-radius: 15px;
      font-size: 1.2em;
      font-weight: 600;
      z-index: 10002;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      animation: notificationSlide 0.5s ease-out;
    `;
    notification.textContent = '🌟 Breathing exercise completed! Well done!';
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(function() {
      if (notification.parentNode) {
        notification.style.opacity = '0';
        notification.style.transform = 'translate(-50%, -50%) scale(0.8)';
        setTimeout(function() {
          notification.remove();
        }, 300);
      }
    }, 3000);
  }
});

// Add notification animation keyframes
const breathingStyle = document.createElement('style');
breathingStyle.textContent = `
  @keyframes notificationSlide {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) translateY(-20px) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) translateY(0) scale(1);
    }
  }
`;
document.head.appendChild(breathingStyle);
// Fighters Modal Logic
const openFightersModal = document.getElementById("openFightersModal");
const fightersModal = document.getElementById("fightersModal");
const closeFightersModal = document.getElementById("closeFightersModal");

openFightersModal.addEventListener("click", () => {
  fightersModal.classList.add("active");
});

closeFightersModal.addEventListener("click", () => {
  fightersModal.classList.remove("active");
});

// Close modal on outside click
window.addEventListener("click", (e) => {
  if (e.target === fightersModal) {
    fightersModal.classList.remove("active");
  }
});

/* quit-smoking-modal-fix.js
   Robust modal anchoring for Coach Vital Boost & Fighters modals.
   - Moves modal into nearest anchor on open
   - Restores original location on close
   - Prevents page jumping; pauses/resumes video if present
   - Safe fallbacks and multiple trigger selectors
*/
(function () {
  'use strict';

  // Helper: safe query
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // Helpers to find best anchor for the modal
  function findBestAnchor(triggerEl, preferredSelectors = []) {
    if (!triggerEl) return document.body;
    // try preferred selectors in ascending specificity
    for (const sel of preferredSelectors) {
      const found = triggerEl.closest(sel);
      if (found) return found;
    }
    // fallback: nearest section or nearest div > body
    let el = triggerEl;
    while (el && el !== document.body) {
      if (el.tagName && (el.tagName.toLowerCase() === 'section' || el.classList.contains('section') || el.classList.contains('container') || el.classList.contains('gamified-section') || el.classList.contains('stats-display') || el.classList.contains('coach-section'))) {
        return el;
      }
      el = el.parentElement;
    }
    return triggerEl.parentElement || document.body;
  }

  // Save/restore DOM location helpers
  function rememberOriginalLocation(modal) {
    modal._origParent = modal.parentElement || null;
    modal._origNextSibling = modal.nextSibling || null;
  }
  function restoreOriginalLocation(modal) {
    try {
      if (modal._origParent) {
        if (modal._origNextSibling && modal._origNextSibling.parentElement === modal._origParent) {
          modal._origParent.insertBefore(modal, modal._origNextSibling);
        } else {
          modal._origParent.appendChild(modal);
        }
      }
    } catch (err) {
      // ignore
    }
  }

  // Apply inline anchored styles to modal (cover anchor fully)
  function anchorModalToParent(modal, parentEl) {
    // store computed style so we can restore if needed
    if (!modal._savedStyle) {
      modal._savedStyle = {
        position: modal.style.position || '',
        inset: modal.style.inset || '',
        top: modal.style.top || '',
        left: modal.style.left || '',
        width: modal.style.width || '',
        height: modal.style.height || '',
        display: modal.style.display || '',
        zIndex: modal.style.zIndex || ''
      };
    }

    // ensure parent has positioning
    const parentComputed = window.getComputedStyle(parentEl).position;
    if (parentComputed === 'static') parentEl.style.position = 'relative';

    modal.style.position = 'absolute';
    modal.style.inset = '0';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '9999';
    // add class for CSS override if needed
    modal.classList.add('anchored-modal');
  }

  function unanchorModal(modal) {
    if (modal._savedStyle) {
      modal.style.position = modal._savedStyle.position;
      modal.style.inset = modal._savedStyle.inset;
      modal.style.top = modal._savedStyle.top;
      modal.style.left = modal._savedStyle.left;
      modal.style.width = modal._savedStyle.width;
      modal.style.height = modal._savedStyle.height;
      modal.style.display = modal._savedStyle.display;
      modal.style.zIndex = modal._savedStyle.zIndex;
      // remove marker class
      modal.classList.remove('anchored-modal');
      // clear saved style
      delete modal._savedStyle;
    } else {
      // fallback reset
      modal.style.position = '';
      modal.style.inset = '';
      modal.style.top = '';
      modal.style.left = '';
      modal.style.width = '';
      modal.style.height = '';
      modal.style.display = 'none';
      modal.style.zIndex = '';
      modal.classList.remove('anchored-modal');
    }
  }

  // Pause/resume helper for any <video> inside node
  function pauseVideosInside(node) {
    try {
      const vids = node.querySelectorAll('video');
      vids.forEach(v => { try { v.pause(); } catch(e){} });
    } catch(e){}
  }
  function playVideosInside(node) {
    try {
      const vids = node.querySelectorAll('video');
      vids.forEach(v => { try { v.play().catch(()=>{}); } catch(e){} });
    } catch(e){}
  }

  // Generic attach modal logic
  function attachModalHandlers(options) {
    const {
      triggerSelectors = [],    // array of selector strings to bind triggers
      modalSelector = '',       // selector or element for modal
      anchorPreference = [],    // array of selectors to try finding anchor
      closeSelectors = []       // selectors inside modal that close it
    } = options;

    // find modal element
    let modal = typeof modalSelector === 'string' ? document.querySelector(modalSelector) : modalSelector;
    if (!modal) {
      // nothing to attach
      return;
    }

    // remember original location so we can restore later
    rememberOriginalLocation(modal);

    // find triggers (could be many)
    const triggers = triggerSelectors.reduce((acc, sel) => {
      const els = Array.from(document.querySelectorAll(sel));
      return acc.concat(els);
    }, []);

    // if no explicit triggers, attempt some reasonable fallbacks
    if (triggers.length === 0) {
      // try some default triggers inside page (non-exhaustive)
      const fallback = [];
      if (modal.id === 'coachBreathingModal') {
        fallback.push('.coach-section', '.coach-btn', '.coach-controls button', '#openCoachBtn');
      } else if (modal.id === 'fightersModal') {
        fallback.push('.fighters-title', '.big-stat', '.join-fighters-btn', '.fighters-trigger', '.stats-display');
      }
      fallback.forEach(sel => {
        const found = Array.from(document.querySelectorAll(sel));
        if (found.length) triggers.push(...found);
      });
    }

    // dedupe triggers
    const uniqTriggers = Array.from(new Set(triggers));

    // handle open
    function openModalForTrigger(triggerEl, evt) {
      try {
        if (evt) { evt.preventDefault(); evt.stopPropagation(); }
      } catch(e){}

      // close any other active anchored modals first
      document.querySelectorAll('.anchored-modal.active').forEach(m => {
        if (m !== modal) {
          m.classList.remove('active');
          unanchorModal(m);
          restoreOriginalLocation(m);
        }
      });

      // find anchor
      const anchor = findBestAnchor(triggerEl, anchorPreference.length ? anchorPreference : ['.coach-section','.stats-display','.gamified-section','section','.container','.content-wrapper']);
      // restore scroll pos fallback in case some other code toggles overflow
      const currentScrollY = window.scrollY || window.pageYOffset || 0;

      // move modal into anchor (if not already)
      if (modal.parentElement !== anchor) {
        rememberOriginalLocation(modal); // update original as current before moving
        anchor.appendChild(modal);
      }

      // style it to cover the anchor
      anchorModalToParent(modal, anchor);

      // mark active
      modal.classList.add('active');

      // pause any background cinematic video in the page (not modal)
      const pageVideo = document.querySelector('.journey-video-container video, video.cinematic-video, .journey-video video');
      if (pageVideo) {
        try { pageVideo.pause(); } catch(e){}
      }

      // ensure any video inside modal plays (if desired)
      const modalVideo = modal.querySelector('video');
      if (modalVideo) {
        try { modalVideo.play().catch(()=>{}); } catch(e){}
      }

      // restore scroll position to avoid jump if something changed it earlier
      setTimeout(() => {
        try {
          window.scrollTo(0, currentScrollY);
        } catch(e){}
      }, 10);
    }

    // handle close
    function closeModal() {
      // unmark
      modal.classList.remove('active');

      // pause any modal internal video
      pauseVideosInside(modal);

      // restore video on page
      const pageVideo = document.querySelector('.journey-video-container video, video.cinematic-video, .journey-video video');
      if (pageVideo) {
        try { pageVideo.play().catch(()=>{}); } catch(e){}
      }

      // unanchor and restore original location
      unanchorModal(modal);
      restoreOriginalLocation(modal);
    }

    // attach click handlers to triggers
    uniqTriggers.forEach(tr => {
      try {
        tr.addEventListener('click', function (ev) {
          openModalForTrigger(tr, ev);
        });
      } catch (err) {}
    });

    // attach close handlers inside modal (buttons)
    const closeEls = closeSelectors.length ? closeSelectors.reduce((acc, sel) => acc.concat(Array.from(modal.querySelectorAll(sel))), []) : Array.from(modal.querySelectorAll('.close, .fighters-close, .close-modal, .stop-breathing-btn, #stopBreathingBtn'));
    closeEls.forEach(btn => {
      try { btn.addEventListener('click', function (e) { e.stopPropagation(); closeModal(); }); } catch(e){}
    });

    // click overlay background closes if clicked directly on modal overlay (not inside container)
    modal.addEventListener('click', function (ev) {
      if (ev.target === modal) closeModal();
    });

    // esc key
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' || ev.key === 'Esc') {
        if (modal.classList.contains('active')) closeModal();
      }
    });
  } // attachModalHandlers

  // run on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function () {

    // Attach coach modal
    attachModalHandlers({
      triggerSelectors: ['#openCoachBtn', '.coach-section .coach-btn', '.coach-controls button', '.coach-section', '.coach-btn'],
      modalSelector: '#coachBreathingModal',
      anchorPreference: ['.coach-section', '.tracker-content', '.gamified-section', '.section', 'section'],
      closeSelectors: ['.stop-breathing-btn', '#stopBreathingBtn', '.close', '.close-modal']
    });

    // Attach fighters modal
    attachModalHandlers({
      triggerSelectors: ['.fighters-title', '.big-stat', '.join-fighters-btn', '.fighters-trigger', '#joinFightersBtn', '.stat-number', '.stat-label'],
      modalSelector: '#fightersModal',
      anchorPreference: ['.stats-display', '.big-stat', '.gamified-section', '.section', 'section'],
      closeSelectors: ['.fighters-close', '#closeFightersModal', '.close', '.close-modal']
    });

    // Safety log (helpful during debugging)
    // console.log('Modal anchoring script initialized');
  });

})();

// Force correct sizing when modal opens
function adjustModalSize(modalId) {
  const modal = document.querySelector(modalId + " .modal-container, " + modalId + " .coach-breathing-modal-container, " + modalId + " .fighters-modal-container");
  if (modal) {
    modal.style.height = "auto";
    modal.style.maxHeight = "85vh";
    modal.style.width = "80%";
    modal.style.maxWidth = "900px";
  }
}

// Example: adjust when modal opens
document.getElementById("coachBreathingModal").addEventListener("transitionend", () => adjustModalSize("#coachBreathingModal"));
document.getElementById("fightersModal").addEventListener("transitionend", () => adjustModalSize("#fightersModal"));
