// Floating images animation
document.addEventListener("DOMContentLoaded", () => {
  const floatingElements = document.querySelectorAll(".floating-image");

  floatingElements.forEach((el, index) => {
    let speed = 2 + Math.random() * 2;
    let direction = index % 2 === 0 ? 1 : -1;
    let position = 0;

    function float() {
      position += direction * 0.3;
      if (Math.abs(position) > 15) {
        direction *= -1;
      }
      el.style.transform = `translateY(${position}px)`;
      requestAnimationFrame(float);
    }
    float();
  });
});

// Visitor Counter (demo only)
let visitorCount = localStorage.getItem("visitorCount") || 0;
visitorCount++;
localStorage.setItem("visitorCount", visitorCount);
const visitorDisplay = document.getElementById("visitorCount");
if (visitorDisplay) {
  visitorDisplay.textContent = visitorCount;
}

// Simple Button Alert (Demo)
const checkupBtn = document.getElementById("checkupBtn");
if (checkupBtn) {
  checkupBtn.addEventListener("click", () => {
    alert("Redirecting you to free health checkup!");
  });
}

// =============================
// Hero Background Carousel Patch
// =============================
const slides = document.querySelectorAll('.image-slide');
let currentIndex = 0;

// Randomize slides on page load for dynamic effect
const shuffledSlides = Array.from(slides).sort(() => Math.random() - 0.5);

function rotateSlides() {
  shuffledSlides.forEach(slide => slide.classList.remove('active'));
  shuffledSlides[currentIndex].classList.add('active');
  currentIndex = (currentIndex + 1) % shuffledSlides.length;
}

// Rotate every 5 seconds
setInterval(rotateSlides, 5000);
rotateSlides(); // Initial display

// =============================
// Doctor & Runner Modals
// =============================

// Select avatars
const doctorAvatar = document.getElementById("doctorAvatar");
const runnerAvatar = document.getElementById("runnerAvatar");

// Select modals
const doctorModal = document.getElementById("doctorModal");
const runnerModal = document.getElementById("runnerModal");
const aiDoctorChatModal = document.getElementById("aiDoctorChatModal");

// Select close buttons
const closeDoctor = document.getElementById("closeDoctor");
const closeRunner = document.getElementById("closeRunner");
const closeAIDoctor = document.getElementById("closeAIDoctor");

// Select AI Doctor chat button
const chatWithAIDoctorBtn = document.getElementById("chatWithAIDoctorBtn");

// Open doctor modal
if (doctorAvatar) {
  doctorAvatar.addEventListener("click", () => {
    if (doctorModal) {
      doctorModal.style.display = "flex";
      doctorModal.classList.add("active");
      trackModalOpen('doctor');
      trackButtonClick('doctor_avatar', 'hero');
    }
  });
}

// Open runner modal
if (runnerAvatar) {
  runnerAvatar.addEventListener("click", () => {
    if (runnerModal) {
      runnerModal.style.display = "flex";
      runnerModal.classList.add("active");
      trackModalOpen('runner');
      trackButtonClick('runner_avatar', 'hero');
    }
  });
}

// Close doctor modal
if (closeDoctor) {
  closeDoctor.addEventListener("click", () => {
    if (doctorModal) {
      doctorModal.style.display = "none";
      doctorModal.classList.remove("active");
      trackModalClose('doctor');
    }
  });
}

// Close runner modal
if (closeRunner) {
  closeRunner.addEventListener("click", () => {
    if (runnerModal) {
      runnerModal.style.display = "none";
      runnerModal.classList.remove("active");
      trackModalClose('runner');
    }
  });
}

// Close AI doctor modal
if (closeAIDoctor) {
  closeAIDoctor.addEventListener("click", () => {
    if (aiDoctorChatModal) {
      aiDoctorChatModal.style.display = "none";
      aiDoctorChatModal.classList.remove("active");
    }
  });
}

// Open AI Doctor chat modal
if (chatWithAIDoctorBtn) {
  chatWithAIDoctorBtn.addEventListener("click", () => {
    // Close doctor modal first
    if (doctorModal) {
      doctorModal.style.display = "none";
      doctorModal.classList.remove("active");
    }
    // Open AI doctor chat modal
    if (aiDoctorChatModal) {
      aiDoctorChatModal.style.display = "flex";
      aiDoctorChatModal.classList.add("active");
      trackModalOpen('ai_doctor_chat');
      trackButtonClick('chat_with_ai_doctor', 'doctor_modal');
    }
  });
}

// Close modal when clicking outside container
window.addEventListener("click", (event) => {
  if (event.target === doctorModal && doctorModal) {
    doctorModal.style.display = "none";
    doctorModal.classList.remove("active");
  }
  if (event.target === runnerModal && runnerModal) {
    runnerModal.style.display = "none";
    runnerModal.classList.remove("active");
  }
  if (event.target === aiDoctorChatModal && aiDoctorChatModal) {
    aiDoctorChatModal.style.display = "none";
    aiDoctorChatModal.classList.remove("active");
  }
});
// =============================
// AI CHAT INTERACTIVITY LOGIC
// =============================

// Select the chat elements from your HTML
const chatMessages = document.getElementById('chatMessages');
const healthQueryInput = document.getElementById('healthQuery');
const sendQueryBtn = document.getElementById('sendQueryBtn');

// Make sure the chat elements actually exist before adding listeners
if (chatMessages && healthQueryInput && sendQueryBtn) {

    // Send message when the "Ask Doctor" button is clicked
    sendQueryBtn.addEventListener('click', sendMessage);

    // Also send message when the "Enter" key is pressed
    healthQueryInput.addEventListener('keydown', (event) => {
        // Check if the key pressed was "Enter"
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevents a new line from being added
            sendMessage();
        }
    });

    // This is the main function that runs when you send a message
    function sendMessage() {
        const userText = healthQueryInput.value.trim(); // Get text from input

        if (userText === "") {
            return; // Don't do anything if the input is empty
        }

        // 1. Display the user's message in the chat window
        displayMessage(userText, 'user');
        
        // 2. Clear the input field for the next message
        healthQueryInput.value = "";

        // 3. Get the AI's response (using the simulated function for now)
        getAIResponse(userText);
        
        // 4. Track the health query
        trackHealthQuery(userText);
        trackButtonClick('send_health_query', 'ai_doctor_chat');
    }

    // This function creates and adds a new message bubble to the chat
    function displayMessage(message, sender) {
        const messageDiv = document.createElement('div');
        
        // Use the CSS classes we added to your style.css file
        messageDiv.className = `chat-message-bubble ${sender}-message`;
        messageDiv.innerText = message;
        
        chatMessages.appendChild(messageDiv);

        // Automatically scroll down to the newest message
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // This function simulates getting a response from the AI
    function getAIResponse(userMessage) {
        // Display a "thinking..." message immediately for better user experience
        displayMessage("Thinking...", 'ai');

        // Simulate a network delay (like the AI is actually thinking)
        setTimeout(() => {
            // First, find and remove the "Thinking..." message
            const thinkingBubble = Array.from(chatMessages.children).find(child => child.innerText === "Thinking...");
            if (thinkingBubble) {
                chatMessages.removeChild(thinkingBubble);
            }

            // --- IMPORTANT ---
            // ** TODO: Replace this simulated response with your actual API call to Bolt AI. **
            const simulatedResponse = `Regarding your query about "${userMessage}", please remember I am an AI assistant. For any real medical advice, consult a qualified doctor. General guidance often suggests a balanced diet and regular exercise.`;
            
            // Display the final simulated response
            displayMessage(simulatedResponse, 'ai');

            // Track the AI response
            trackHealthQuery(userMessage, simulatedResponse);

        }, 1500); // 1.5-second delay
    }
}
// =============================
// UPLOAD SYMPTOMS FEATURE
// =============================

// Select the elements from your HTML
const uploadTriggerBtn = document.getElementById('uploadTrigger');
const symptomUploadInput = document.getElementById('symptomUpload');
const uploadedFilesContainer = document.getElementById('uploadedFiles');

// Make sure the elements exist before adding listeners
if (uploadTriggerBtn && symptomUploadInput && uploadedFilesContainer) {

    // 1. When the visible "Upload Symptoms" button is clicked...
    uploadTriggerBtn.addEventListener('click', () => {
        // ...trigger a click on the hidden file input.
        symptomUploadInput.click();
    });

    // 2. When a file is selected in the file input...
    symptomUploadInput.addEventListener('change', () => {
        // Clear any previously listed files
        uploadedFilesContainer.innerHTML = ''; 

        // Check if any files were selected
        if (symptomUploadInput.files.length > 0) {
            
            // Loop through all the selected files
            for (const file of symptomUploadInput.files) {
                // Create a new element to display the file name
                const filePill = document.createElement('div');
                filePill.className = 'file-pill'; // Add a class for styling
                filePill.textContent = `📄 ${file.name}`; // Show an icon and the file name
                
                // Add the new element to the display container
                uploadedFilesContainer.appendChild(filePill);
            }
        }
    });
} 

// =============================
// HEALTH TIPS MODAL WITH CAROUSEL
// =============================

// Health Tips Modal Elements
const healthTipsBtn = document.getElementById('healthTipsBtn');
const healthTipsModal = document.getElementById('healthTipsModal');
const closeHealthTips = document.getElementById('closeHealthTips');
const tipsCarousel = document.getElementById('tipsCarousel');
const carouselIndicators = document.getElementById('carouselIndicators');

// =============================
// TRACK STEPS FEATURE
// =============================

// Steps Modal Elements
const openStepsTracker = document.getElementById('openStepsTracker');
const stepsModal = document.getElementById('stepsModal');
const closeSteps = document.getElementById('closeSteps');
const stepsCircle = document.getElementById('stepsCircle');
const shoeIcon = document.getElementById('shoeIcon');
const stepCountText = document.getElementById('stepCountText');
const stepCount = document.getElementById('stepCount');
const progressFill = document.getElementById('progressFill');
const addSteps = document.getElementById('addSteps');
const resetSteps = document.getElementById('resetSteps');
const stopTrackingBtn = document.getElementById('stopTrackingBtn');

// Reward Modal Elements
const rewardModal = document.getElementById('rewardModal');
const closeReward = document.getElementById('closeReward');
const claimRewardBtn = document.getElementById('claimRewardBtn');

// Steps Tracking State
let currentSteps = 0;
let stepGoal = 1000;
let isTracking = false;
let stepInterval = null;

// Update step display and progress
function updateStepDisplay() {
  stepCount.textContent = currentSteps;
  
  const progressPercentage = Math.min((currentSteps / stepGoal) * 100, 100);
  progressFill.style.width = `${progressPercentage}%`;
  
  // Dynamic progress bar colors
  if (progressPercentage < 25) {
    progressFill.style.background = 'linear-gradient(90deg, #10b981, #059669)';
  } else if (progressPercentage < 50) {
    progressFill.style.background = 'linear-gradient(90deg, #f59e0b, #d97706)';
  } else if (progressPercentage < 75) {
    progressFill.style.background = 'linear-gradient(90deg, #3b82f6, #2563eb)';
  } else {
    progressFill.style.background = 'linear-gradient(90deg, #8b5cf6, #7c3aed)';
  }
  
  // Check if goal reached
  if (currentSteps >= stepGoal && isTracking) {
    triggerReward();
  }
}

// Start step tracking
function startTracking() {
  if (isTracking) return;
  
  // Add null checks to prevent TypeError
  if (!stepsCircle || !shoeIcon || !stopTrackingBtn || !addSteps || !resetSteps) {
    console.error('Required DOM elements not found for step tracking');
    return;
  }
  
  isTracking = true;
  stepCountText.textContent = 'Steps Today:';
  
  // Update UI
  stepsCircle.classList.add('tracking');
  shoeIcon.classList.add('shoe-jump');
  
  // Show/hide buttons
  stopTrackingBtn.style.display = 'inline-block';
  addSteps.style.display = 'none';
  resetSteps.style.display = 'none';
  
  // Track step tracking start
  trackButtonClick('start_step_tracking', 'steps_modal');
  trackUserAction('step_tracking_started');
  
  // Start counting steps (faster for demo - every 100ms)
  stepInterval = setInterval(() => {
    currentSteps += Math.floor(Math.random() * 3) + 1; // Random 1-3 steps
    updateStepDisplay();
    
    // Track steps every 100 steps
    if (currentSteps % 100 === 0) {
      trackSteps(currentSteps);
    }
  }, 100);
}

// Stop step tracking
function stopTracking() {
  if (!isTracking) return;
  
  isTracking = false;
  
  // Clear interval
  if (stepInterval) {
    clearInterval(stepInterval);
    stepInterval = null;
  }
  
  // Update UI
  stepsCircle.classList.remove('tracking');
  shoeIcon.classList.remove('shoe-jump');
  
  // Show/hide buttons
  stopTrackingBtn.style.display = 'none';
  addSteps.style.display = 'inline-block';
  resetSteps.style.display = 'inline-block';
  
  // Track final step count
  trackSteps(currentSteps);
  trackButtonClick('stop_step_tracking', 'steps_modal');
  trackUserAction('step_tracking_stopped');
}

// Trigger reward popup
function triggerReward() {
  stopTracking();
  
  // Show reward modal
  rewardModal.style.display = 'flex';
  rewardModal.classList.add('active');
  
  // Generate confetti
  generateConfetti();
  
  // Reset steps after reward
  setTimeout(() => {
    currentSteps = 0;
    updateStepDisplay();
    stepCountText.textContent = 'Start Walking';
  }, 3000);
}

// Generate confetti animation
function generateConfetti() {
  const confettiContainer = document.getElementById('confettiContainer');
  if (!confettiContainer) return;
  
  const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
  
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-piece';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 2 + 's';
    confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
    
    confettiContainer.appendChild(confetti);
    
    // Remove confetti after animation
    setTimeout(() => {
      if (confetti.parentNode) {
        confetti.parentNode.removeChild(confetti);
      }
    }, 4000);
  }
}

// Steps Modal Event Listeners
if (openStepsTracker && stepsModal && closeSteps && stepsCircle) {
  
  // Open steps modal
  openStepsTracker.addEventListener('click', () => {
    // Close runner modal first
    if (runnerModal) {
      runnerModal.style.display = 'none';
      runnerModal.classList.remove('active');
    }
    
    // Show steps modal
    stepsModal.style.display = 'flex';
    stepsModal.classList.add('active');
    
    // Initialize display
    updateStepDisplay();
  });
  
  // Close steps modal
  closeSteps.addEventListener('click', () => {
    stepsModal.style.display = 'none';
    stepsModal.classList.remove('active');
    stopTracking();
  });
  
  // Shoe icon click to start/stop tracking
  stepsCircle.addEventListener('click', () => {
    if (!isTracking) {
      startTracking();
    }
  });
  
  // Stop tracking button
  if (stopTrackingBtn) {
    stopTrackingBtn.addEventListener('click', stopTracking);
  }
  
  // Manual step controls (for testing)
  if (addSteps) {
    addSteps.addEventListener('click', () => {
      if (!isTracking) {
        currentSteps += 100;
        updateStepDisplay();
      }
    });
  }
  
  if (resetSteps) {
    resetSteps.addEventListener('click', () => {
      if (!isTracking) {
        currentSteps = 0;
        stepCountText.textContent = 'Start Walking';
        updateStepDisplay();
      }
    });
  }
  
  // Close modal when clicking outside
  window.addEventListener('click', (event) => {
    if (event.target === stepsModal) {
      stepsModal.style.display = 'none';
      stepsModal.classList.remove('active');
      stopTracking();
    }
  });
}

// Reward Modal Event Listeners
if (rewardModal && closeReward && claimRewardBtn) {
  
  // Close reward modal
  closeReward.addEventListener('click', () => {
    rewardModal.style.display = 'none';
    rewardModal.classList.remove('active');
  });
  
  // Claim reward button
  claimRewardBtn.addEventListener('click', () => {
    alert('🎉 Crypto reward claimed! Keep up the great work!');
    rewardModal.style.display = 'none';
    rewardModal.classList.remove('active');
  });
  
  // Close modal when clicking outside
  window.addEventListener('click', (event) => {
    if (event.target === rewardModal) {
      rewardModal.style.display = 'none';
      rewardModal.classList.remove('active');
    }
  });
}
// Health Tips Data
const healthTipsData = [
  {
    title: "Stay Hydrated Daily",
    frontImage: "https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=800",
    backTitle: "💧 Hydration Benefits",
    description: "Drinking 8-10 glasses of water daily improves brain function, boosts energy levels, aids digestion, and helps maintain healthy skin. Proper hydration is essential for optimal body performance."
  },
  {
    title: "Exercise Regularly",
    frontImage: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800",
    backTitle: "🏃‍♂️ Fitness Power",
    description: "30 minutes of daily exercise strengthens your heart, builds muscle, improves mental health, and increases longevity. Even light activities like walking can make a significant difference."
  },
  {
    title: "Eat Nutritious Foods",
    frontImage: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
    backTitle: "🥗 Nutrition Facts",
    description: "A balanced diet rich in fruits, vegetables, lean proteins, and whole grains provides essential nutrients, boosts immunity, and reduces the risk of chronic diseases."
  },
  {
    title: "Get Quality Sleep",
    frontImage: "https://images.pexels.com/photos/935777/pexels-photo-935777.jpeg?auto=compress&cs=tinysrgb&w=800",
    backTitle: "😴 Sleep Science",
    description: "7-9 hours of quality sleep enhances memory consolidation, supports immune function, regulates hormones, and improves overall cognitive performance and emotional well-being."
  },
  {
    title: "Manage Stress Levels",
    frontImage: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800",
    backTitle: "🧘‍♀️ Stress Relief",
    description: "Regular meditation, deep breathing exercises, and mindfulness practices reduce cortisol levels, lower blood pressure, and improve mental clarity and emotional resilience."
  },
  {
    title: "Regular Health Checkups",
    frontImage: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=800",
    backTitle: "🩺 Prevention Care",
    description: "Annual health screenings and regular checkups help detect potential health issues early, enabling timely treatment and better health outcomes through preventive care."
  }
];

let currentTipIndex = 0;
let tipCyclingInterval;

// Create individual tip card element
function createTipCardElement(tip, index) {
  const cardDiv = document.createElement('div');
  cardDiv.className = 'tip-card';
  cardDiv.innerHTML = `
    <div class="tip-card-inner">
      <div class="tip-card-front" style="background-image: url('${tip.frontImage}')">
        <h4>${tip.title}</h4>
      </div>
      <div class="tip-card-back">
        <div class="tip-icon">${tip.backTitle.split(' ')[0]}</div>
        <h5>${tip.backTitle}</h5>
        <p>${tip.description}</p>
      </div>
    </div>
  `;
  return cardDiv;
}

// Create indicator dot element
function createIndicatorDot(index) {
  const dot = document.createElement('div');
  dot.className = 'indicator-dot';
  dot.addEventListener('click', () => showTip(index));
  return dot;
}

// Populate the carousel with tip cards and indicators
function populateTipsCarousel() {
  // Clear existing content
  tipsCarousel.innerHTML = '';
  carouselIndicators.innerHTML = '';
  
  // Create and append tip cards
  healthTipsData.forEach((tip, index) => {
    const cardElement = createTipCardElement(tip, index);
    tipsCarousel.appendChild(cardElement);
    
    const indicatorDot = createIndicatorDot(index);
    carouselIndicators.appendChild(indicatorDot);
  });
  
  // Show the first tip
  showTip(0);
}

// Show specific tip by index
function showTip(index) {
  const allCards = tipsCarousel.querySelectorAll('.tip-card');
  const allDots = carouselIndicators.querySelectorAll('.indicator-dot');
  
  // Remove active and prev classes from all cards
  allCards.forEach(card => {
    card.classList.remove('active', 'prev');
  });
  
  // Remove active class from all indicators
  allDots.forEach(dot => {
    dot.classList.remove('active');
  });
  
  // Add prev class to current card before switching
  if (allCards[currentTipIndex]) {
    allCards[currentTipIndex].classList.add('prev');
  }
  
  // Update current index
  currentTipIndex = index;
  
  // Show new active card and indicator
  if (allCards[currentTipIndex]) {
    allCards[currentTipIndex].classList.add('active');
  }
  if (allDots[currentTipIndex]) {
    allDots[currentTipIndex].classList.add('active');
  }
  
  // Track health tip view
  if (healthTipsData[index]) {
    trackHealthTipView(
      `tip_${index}`, 
      healthTipsData[index].title,
      4500 // duration of auto-cycling
    );
  }
}

// Start auto-cycling through tips
function startTipCycling() {
  tipCyclingInterval = setInterval(() => {
    const nextIndex = (currentTipIndex + 1) % healthTipsData.length;
    showTip(nextIndex);
  }, 4500); // Change every 4.5 seconds
}

// Stop auto-cycling
function stopTipCycling() {
  if (tipCyclingInterval) {
    clearInterval(tipCyclingInterval);
    tipCyclingInterval = null;
  }
}

// Health Tips Modal Event Listeners
if (healthTipsBtn && healthTipsModal && closeHealthTips && tipsCarousel && carouselIndicators) {
  
  // Open Health Tips modal
  healthTipsBtn.addEventListener('click', () => {
    // Close doctor modal first
    if (doctorModal) {
      doctorModal.style.display = 'none';
      doctorModal.classList.remove('active');
    }
    
    // Show health tips modal
    healthTipsModal.style.display = 'flex';
    healthTipsModal.classList.add('active');
    
    // Populate carousel and start cycling
    populateTipsCarousel();
    startTipCycling();
  });
  
  // Close Health Tips modal
  closeHealthTips.addEventListener('click', () => {
    healthTipsModal.style.display = 'none';
    healthTipsModal.classList.remove('active');
    stopTipCycling();
  });
  
  // Close modal when clicking outside
  window.addEventListener('click', (event) => {
    if (event.target === healthTipsModal) {
      healthTipsModal.style.display = 'none';
      healthTipsModal.classList.remove('active');
      stopTipCycling();
    }
  });
}
// ==== CALORIES BURNED – DROP-IN WIRING (safe-scoped) ====
(() => {
  // Open/close
  const openBtn  = document.getElementById('openCaloriesBurned');   // <button id="openCaloriesBurned">…</button>
  const modal    = document.getElementById('caloriesBurnedModal');  // <div id="caloriesBurnedModal" …>
  const closeBtn = document.getElementById('closeCaloriesBurned');  // <button id="closeCaloriesBurned">×</button>

  if (!openBtn || !modal || !closeBtn) {
    console.warn('Calories Burned: required elements missing', {
      openBtn: !!openBtn, modal: !!modal, closeBtn: !!closeBtn
    });
    return; // quietly bail if the HTML isn’t in place yet
  }

  const openModal = () => {
    modal.style.display = 'flex';
    modal.classList.add('active');
  };
  const closeModal = () => {
    modal.style.display = 'none';
    modal.classList.remove('active');
  };

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  // --- Inner feature logic (activities, calculate, progress) ---
  const cyclingBtn   = document.getElementById('cyclingBtn');
  const gymBtn       = document.getElementById('gymBtn');
  const yogaBtn      = document.getElementById('yogaBtn');
  const minutesInput = document.getElementById('minutesInput');
  const calcBtn      = document.getElementById('calculateCaloriesBtn');

  const caloriesDisplay   = document.getElementById('caloriesDisplay');
  const progressFill      = document.getElementById('caloriesProgressFill');
  const milestoneMessage  = document.getElementById('milestoneMessage');
  const rewardMessage     = document.getElementById('caloriesRewardMessage');
  const statusText        = document.getElementById('caloriesStatusText');
  const flameIcon         = document.getElementById('flameIcon');

  // Guard for inner nodes (keep modal open/close working even if some are missing)
  if (!cyclingBtn || !gymBtn || !yogaBtn || !minutesInput || !calcBtn ||
      !caloriesDisplay || !progressFill || !milestoneMessage || !rewardMessage ||
      !statusText || !flameIcon) {
    console.warn('Calories Burned: some inner nodes missing – modal open/close still works');
    return;
  }

  // Simple MET table (approximate)
  const METS = {
    cycling: 8,   // moderate
    gym:     6,   // general weight/circuit
    yoga:    3,   // hatha-ish
  };
  let active = 'cycling';
  let activeMET = METS[active];
  const dailyGoalKcal = 500; // change if you want

  function setActive(name) {
    active = name;
    activeMET = METS[name];
    [cyclingBtn, gymBtn, yogaBtn].forEach(b => b.classList.remove('active'));
    ({ cycling: cyclingBtn, gym: gymBtn, yoga: yogaBtn }[name]).classList.add('active');
    statusText.textContent = `Selected: ${name[0].toUpperCase()}${name.slice(1)} – enter minutes`;
  }

  // Activity buttons
  cyclingBtn.addEventListener('click', () => setActive('cycling'));
  gymBtn.addEventListener('click',     () => setActive('gym'));
  yogaBtn.addEventListener('click',    () => setActive('yoga'));

  setActive('cycling'); // default

  // Calc handler
  calcBtn.addEventListener('click', () => {
    const minutes = parseFloat(minutesInput.value);
    if (!minutes || minutes <= 0) {
      statusText.textContent = 'Enter minutes greater than 0';
      return;
    }

    // Default weight assumption (no weight field provided)
    const weightKg = 70;
    // kcal ≈ MET * 3.5 * kg / 200 * minutes
    const kcal = Math.round(activeMET * 3.5 * weightKg / 200 * minutes);

    caloriesDisplay.textContent = `Total: ${kcal} kcal`;

    // Track calories burned
    trackCaloriesBurned(active, kcal, minutes);
    trackButtonClick('calculate_calories', 'calories_modal');

    // Progress bar
    const pct = Math.min((kcal / dailyGoalKcal) * 100, 100);
    progressFill.style.width = pct + '%';

    // Color ramp
    let color = 'limegreen';
    if (pct >= 75) color = 'red';
    else if (pct >= 50) color = 'orange';
    progressFill.style.background = color;

    // Flame animation (pulse), milestone/reward
    flameIcon.classList.remove('pulse', 'burst');
    // force reflow to restart animation
    void flameIcon.offsetWidth;
    flameIcon.classList.add('pulse');

    if (pct >= 100) {
      milestoneMessage.textContent = 'Milestone reached! 🔥';
      rewardMessage.textContent = '🎁 Bonus unlocked!';
      flameIcon.classList.add('burst');
    } else {
      milestoneMessage.textContent = '';
      rewardMessage.textContent = '';
    }
  });
})();
// Progress Bar Color Shifts
function updateCaloriesProgress(progress) {
  const progressFill = document.getElementById("caloriesProgressFill");

  // Clamp progress between 0–100
  const percent = Math.min(progress, 100);

  progressFill.style.width = percent + "%";

  if (percent <= 30) {
    progressFill.style.backgroundColor = "blue";
  } else if (percent <= 70) {
    progressFill.style.backgroundColor = "green";
  } else {
    progressFill.style.backgroundColor = "orangered";
  }
}

// =============================
// DAILY FITNESS GOALS FEATURE
// =============================

// Daily Goals Modal Elements
const openDailyGoalsTracker = document.getElementById('openDailyGoalsTracker');
const dailyGoalsModal = document.getElementById('dailyGoalsModal');
const closeDailyGoals = document.getElementById('closeDailyGoals');
const challengeCardsContainer = document.getElementById('challengeCardsContainer');
const goalsCompletedCount = document.getElementById('goalsCompletedCount');
const dailyGoalsProgressFill = document.getElementById('dailyGoalsProgressFill');
const motivationalText = document.getElementById('motivationalText');
const dailyStreakCounter = document.getElementById('dailyStreakCounter');
const rewardChest = document.getElementById('rewardChest');
const dailyGoalsRewardMessage = document.getElementById('dailyGoalsRewardMessage');

// Daily Goals State
let dailyGoals = [
  { id: 'water', text: 'Drink 8 glasses of water', emoji: '🚰', completed: false },
  { id: 'stretch', text: 'Stretch for 10 minutes', emoji: '🧘', completed: false },
  { id: 'fruits', text: 'Eat 2 fruits', emoji: '🍎', completed: false }
];

let completedGoalsCount = 0;
let dailyStreak = 0;
let lastCompletionDate = null;

const motivationalTexts = [
  "Keep pushing 💪",
  "Discipline = Freedom",
  "You're unstoppable! 🚀",
  "Excellence is a habit ⭐",
  "Progress over perfection 📈",
  "Your future self will thank you 🙏",
  "Small steps, big results 👣",
  "Consistency is key 🔑"
];

// Load goals state from localStorage
function loadGoalsState() {
  const savedGoals = localStorage.getItem('dailyGoals');
  const savedStreak = localStorage.getItem('dailyStreak');
  const savedDate = localStorage.getItem('lastCompletionDate');
  
  if (savedGoals) {
    dailyGoals = JSON.parse(savedGoals);
  }
  if (savedStreak) {
    dailyStreak = parseInt(savedStreak);
  }
  if (savedDate) {
    lastCompletionDate = savedDate;
  }
  
  checkAndResetGoals();
}

// Save goals state to localStorage
function saveGoalsState() {
  localStorage.setItem('dailyGoals', JSON.stringify(dailyGoals));
  localStorage.setItem('dailyStreak', dailyStreak.toString());
  if (lastCompletionDate) {
    localStorage.setItem('lastCompletionDate', lastCompletionDate);
  }
}

// Check if it's a new day and reset goals if needed
function checkAndResetGoals() {
  const today = new Date().toDateString();
  const lastDate = lastCompletionDate ? new Date(lastCompletionDate).toDateString() : null;
  
  if (lastDate && lastDate !== today) {
    // Check if all goals were completed yesterday
    const allCompleted = dailyGoals.every(goal => goal.completed);
    
    if (!allCompleted) {
      // Reset streak if goals weren't completed
      dailyStreak = 0;
    }
    
    // Reset goals for new day
    dailyGoals.forEach(goal => goal.completed = false);
    completedGoalsCount = 0;
  }
  
  // Update completed count
  completedGoalsCount = dailyGoals.filter(goal => goal.completed).length;
}

// Render challenge cards
function renderChallengeCards() {
  if (!challengeCardsContainer) return;
  
  challengeCardsContainer.innerHTML = '';
  
  dailyGoals.forEach((goal, index) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = `challenge-card ${goal.completed ? 'completed' : ''}`;
    cardDiv.innerHTML = `
      <div class="challenge-text">
        <span class="challenge-emoji">${goal.emoji}</span>
        <span>${goal.text}</span>
      </div>
      <button class="mark-done-btn ${goal.completed ? 'completed' : ''}" data-goal-id="${goal.id}">
        ${goal.completed ? 'Completed ✅' : 'Mark as Done ✅'}
      </button>
    `;
    
    challengeCardsContainer.appendChild(cardDiv);
    
    // Add event listener to mark done button
    const markDoneBtn = cardDiv.querySelector('.mark-done-btn');
    if (!goal.completed) {
      markDoneBtn.addEventListener('click', () => markGoalCompleted(goal.id));
    }
  });
}

// Mark goal as completed
function markGoalCompleted(goalId) {
  const goal = dailyGoals.find(g => g.id === goalId);
  if (!goal || goal.completed) return;
  
  goal.completed = true;
  completedGoalsCount++;
  
  // Re-render cards to show updated state
  renderChallengeCards();
  
  // Update progress
  updateDailyGoalsProgress();
  
  // Show motivational text
  displayMotivationalText();
  
  // Track goal completion
  trackGoalCompletion(goal.id, goal.text);
  trackButtonClick('mark_goal_completed', 'daily_goals_modal');
  
  // Check if all goals completed
  if (completedGoalsCount === dailyGoals.length) {
    triggerDailyGoalsReward();
    trackUserAction('all_daily_goals_completed');
  }
  
  // Save state
  saveGoalsState();
}

// Update progress bar and counter
function updateDailyGoalsProgress() {
  if (!goalsCompletedCount || !dailyGoalsProgressFill) return;
  
  const percentage = (completedGoalsCount / dailyGoals.length) * 100;
  
  goalsCompletedCount.textContent = `${completedGoalsCount}/${dailyGoals.length}`;
  dailyGoalsProgressFill.style.width = `${percentage}%`;
  
  // Change progress bar color based on completion
  if (percentage === 100) {
    dailyGoalsProgressFill.style.background = 'linear-gradient(90deg, #f59e0b, #d97706)'; // Gold
  } else if (percentage >= 66) {
    dailyGoalsProgressFill.style.background = 'linear-gradient(90deg, #ef4444, #dc2626)'; // Red
  } else if (percentage >= 33) {
    dailyGoalsProgressFill.style.background = 'linear-gradient(90deg, #f97316, #ea580c)'; // Orange
  } else {
    dailyGoalsProgressFill.style.background = 'linear-gradient(90deg, #10b981, #059669)'; // Green
  }
}

// Display random motivational text
function displayMotivationalText() {
  if (!motivationalText) return;
  
  const randomText = motivationalTexts[Math.floor(Math.random() * motivationalTexts.length)];
  motivationalText.textContent = randomText;
  
  // Trigger fade-in animation
  motivationalText.style.animation = 'none';
  setTimeout(() => {
    motivationalText.style.animation = 'motivational-fade-in 0.5s ease-out';
  }, 10);
}

// Update streak counter display
function updateStreakCounter() {
  if (!dailyStreakCounter) return;
  dailyStreakCounter.textContent = dailyStreak;
}

// Trigger reward when all goals completed
function triggerDailyGoalsReward() {
  // Update streak
  dailyStreak++;
  lastCompletionDate = new Date().toISOString();
  updateStreakCounter();
  
  // Animate reward chest
  if (rewardChest) {
    rewardChest.classList.add('animate');
    setTimeout(() => {
      rewardChest.classList.remove('animate');
    }, 1000);
  }
  
  // Show reward message
  if (dailyGoalsRewardMessage) {
    dailyGoalsRewardMessage.textContent = "You earned Boost Points! 🎉";
    dailyGoalsRewardMessage.classList.add('show');
  }
  
  // Trigger confetti
  generateConfetti();
  
  // Update motivational text
  motivationalText.textContent = "All goals completed! You're a champion! 🏆";
  
  // Save state
  saveGoalsState();
}

// Daily Goals Modal Event Listeners
if (openDailyGoalsTracker && dailyGoalsModal && closeDailyGoals) {
  
  // Open Daily Goals modal
  openDailyGoalsTracker.addEventListener('click', () => {
    // Close runner modal first
    if (runnerModal) {
      runnerModal.style.display = 'none';
      runnerModal.classList.remove('active');
    }
    
    // Load state and render
    loadGoalsState();
    renderChallengeCards();
    updateDailyGoalsProgress();
    updateStreakCounter();
    
    // Show modal
    dailyGoalsModal.style.display = 'flex';
    dailyGoalsModal.classList.add('active');
  });
  
  // Close Daily Goals modal
  closeDailyGoals.addEventListener('click', () => {
    dailyGoalsModal.style.display = 'none';
    dailyGoalsModal.classList.remove('active');
    
    // Hide reward message
    if (dailyGoalsRewardMessage) {
      dailyGoalsRewardMessage.classList.remove('show');
    }
  });
  
  // Close modal when clicking outside
  window.addEventListener('click', (event) => {
    if (event.target === dailyGoalsModal) {
      dailyGoalsModal.style.display = 'none';
      dailyGoalsModal.classList.remove('active');
      
      // Hide reward message
      if (dailyGoalsRewardMessage) {
        dailyGoalsRewardMessage.classList.remove('show');
      }
    }
  });
}

// Initialize goals state on page load
document.addEventListener('DOMContentLoaded', () => {
  loadGoalsState();
});
document.addEventListener("DOMContentLoaded", () => {
  const openDailyGoals = document.getElementById("openDailyGoals");
  const dailyGoalsModal = document.getElementById("dailyGoalsModal");
  const closeDailyGoals = document.getElementById("closeDailyGoals");
  const doctorModal = document.getElementById("doctorModal");

  if (openDailyGoals && dailyGoalsModal) {
    openDailyGoals.addEventListener("click", () => {
      // close doctor modal if open (optional)
      if (doctorModal) {
        doctorModal.style.display = "none";
        doctorModal.classList.remove("active");
      }
      dailyGoalsModal.style.display = "flex";
      dailyGoalsModal.classList.add("active");
    });
  }

  if (closeDailyGoals && dailyGoalsModal) {
    closeDailyGoals.addEventListener("click", () => {
      dailyGoalsModal.style.display = "none";
      dailyGoalsModal.classList.remove("active");
    });
  }

  // Close by clicking outside modal container
  if (dailyGoalsModal) {
    dailyGoalsModal.addEventListener("click", (e) => {
      if (e.target === dailyGoalsModal) {
        dailyGoalsModal.style.display = "none";
        dailyGoalsModal.classList.remove("active");
      }
    });
  }
});
/* -------------------------------
   Daily Fitness Goals (safe module)
   Paste this ONCE at the end of script.js
   ------------------------------- */
(function () {
  // Unique local variable names to avoid redeclaration errors
  const openDailyGoalsBtn = document.getElementById('openDailyGoals');
  const dailyGoalsModalEl = document.getElementById('dailyGoalsModal');
  const closeDailyGoalsBtn = document.getElementById('closeDailyGoals');

  // Defensive checks — if required DOM isn't present, bail out
  if (!openDailyGoalsBtn || !dailyGoalsModalEl || !closeDailyGoalsBtn) {
    console.warn('Daily Goals: required DOM elements missing — module skipped.');
    return;
  }

  const challengeContainerEl = document.getElementById('challengeCardsContainer');
  const progressFillEl = document.getElementById('dailyGoalsProgressFill');
  const goalsCompletedCountEl = document.getElementById('goalsCompletedCount');
  const motivationTextEl = document.getElementById('motivationalText');
  const rewardChestEl = document.getElementById('rewardChest');
  const rewardMsgEl = document.getElementById('dailyGoalsRewardMessage');
  const streakCounterEl = document.getElementById('dailyStreakCounter');

  // If any of these are missing, proceed but warn — UI parts may not render fully
  if (!challengeContainerEl || !progressFillEl || !goalsCompletedCountEl || !motivationTextEl || !rewardChestEl || !streakCounterEl) {
    console.warn('Daily Goals: some DOM parts are missing. Module will try to run but UI may be incomplete.');
  }

  // Persisted daily streak
  let dailyStreak = parseInt(localStorage.getItem('vitalboost_dailyStreak') || '0', 10);
  if (streakCounterEl) streakCounterEl.textContent = dailyStreak;

  // Define the challenge set (customize text here)
  const challenges = [
    { id: 1, text: 'Drink 8 glasses of water 🚰', completed: false },
    { id: 2, text: 'Stretch 10 minutes 🧘', completed: false },
    { id: 3, text: 'Eat 2 fruits 🍎', completed: false }
  ];

  let completedGoals = 0;
  let resetButtonEl = null;

  // Render challenge cards
  function renderChallenges() {
    if (!challengeContainerEl) return;
    challengeContainerEl.innerHTML = '';
    challenges.forEach(ch => {
      const card = document.createElement('div');
      card.className = 'challenge-card';
      if (ch.completed) card.classList.add('completed');

      card.innerHTML = `
        <div class="challenge-card-inner">
          <div class="card-text">${ch.text}</div>
          <button class="mark-done-btn" data-id="${ch.id}">
            ${ch.completed ? '✅ Completed' : 'Mark as Done'}
          </button>
        </div>
      `;
      challengeContainerEl.appendChild(card);
    });

    // wire buttons
    challengeContainerEl.querySelectorAll('.mark-done-btn').forEach(btn => {
      btn.removeEventListener('click', onMarkDoneClick); // safe: remove duplicates
      btn.addEventListener('click', onMarkDoneClick);
    });
  }

  function onMarkDoneClick(e) {
    const id = Number(e.currentTarget.dataset.id);
    toggleChallengeComplete(id);
  }

  // Toggle single challenge complete/incomplete
  function toggleChallengeComplete(id) {
    const ch = challenges.find(c => c.id === id);
    if (!ch) return;
    ch.completed = !ch.completed;

    completedGoals = challenges.filter(c => c.completed).length;
    animateCardToggle(id, ch.completed);
    renderChallenges();
    updateProgress();

    if (completedGoals === challenges.length) {
      onAllGoalsCompleted();
    }
  }

  // small animation hook for card toggle (adds class then removes it for effect)
  function animateCardToggle(id, completed) {
    const btn = challengeContainerEl && challengeContainerEl.querySelector(`.mark-done-btn[data-id="${id}"]`);
    if (!btn) return;
    const card = btn.closest('.challenge-card');
    if (!card) return;
    if (completed) {
      card.classList.add('card-complete-anim');
      setTimeout(() => card.classList.remove('card-complete-anim'), 900);
    } else {
      card.classList.add('card-uncomplete-anim');
      setTimeout(() => card.classList.remove('card-uncomplete-anim'), 600);
    }
  }

  // Update progress UI
  function updateProgress() {
    if (goalsCompletedCountEl) goalsCompletedCountEl.textContent = `${completedGoals}/${challenges.length}`;
    if (progressFillEl) {
      const pct = Math.round((completedGoals / challenges.length) * 100);
      progressFillEl.style.width = pct + '%';
    }
    // random motivational message on change
    const quotes = ['Keep pushing 💪', 'Discipline = Freedom', 'You’re doing great!', 'Small wins, big results!'];
    if (motivationTextEl) motivationTextEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];
  }

  // When all goals completed
  function onAllGoalsCompleted() {
    // increment streak and persist
    dailyStreak = (dailyStreak || 0) + 1;
    localStorage.setItem('vitalboost_dailyStreak', String(dailyStreak));
    if (streakCounterEl) streakCounterEl.textContent = dailyStreak;

    // unlock reward
    if (rewardChestEl) rewardChestEl.classList.add('open');
    if (rewardMsgEl) rewardMsgEl.textContent = '🎉 You earned Boost Points!';

    // confetti
    spawnConfetti();

    // show reset control
    showResetButtonIfNeeded();
  }

  // Create/Show Reset button
  function showResetButtonIfNeeded() {
    if (resetButtonEl) return; // already exists
    const parent = document.querySelector('.daily-goals-content');
    if (!parent) return;
    resetButtonEl = document.createElement('button');
    resetButtonEl.className = 'reset-goals-btn';
    resetButtonEl.textContent = '🔄 Reset Goals';
    parent.appendChild(resetButtonEl);
    resetButtonEl.addEventListener('click', resetAllGoals);
  }

  // Reset all goals (keeps streak)
  function resetAllGoals() {
    challenges.forEach(c => c.completed = false);
    completedGoals = 0;
    if (rewardChestEl) rewardChestEl.classList.remove('open');
    if (rewardMsgEl) rewardMsgEl.textContent = '';
    if (resetButtonEl) { resetButtonEl.remove(); resetButtonEl = null; }
    renderChallenges();
    updateProgress();
  }

  // Minimal confetti (creates floating colored dots)
  function spawnConfetti() {
    const colors = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6'];
    const count = 24;
    for (let i = 0; i < count; i++) {
      const piece = document.createElement('div');
      piece.className = 'daily-confetti';
      piece.style.left = (Math.random() * 80 + 10) + 'vw';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 2500 + Math.random() * 1500);
    }
  }

  // Open / close modal wiring
  openDailyGoalsBtn.addEventListener('click', () => {
    dailyGoalsModalEl.style.display = 'flex';
    // fresh render on open
    renderChallenges();
    updateProgress();
  });

  closeDailyGoalsBtn.addEventListener('click', () => {
    dailyGoalsModalEl.style.display = 'none';
  });

  // click outside close
  window.addEventListener('click', (ev) => {
    if (ev.target === dailyGoalsModalEl) {
      dailyGoalsModalEl.style.display = 'none';
    }
  });

  // initial render
  renderChallenges();
  updateProgress();
})();
/* ---------------------------
   Welcome / Get Started JS
   (Append to bottom of script.js)
   --------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const openWelcomeBtn = document.getElementById('ctaButton'); // your Get Started button
  const welcomeModalEl = document.getElementById('welcomeModal');
  const closeWelcomeBtn = document.getElementById('closeWelcome');
  const btnGoogle = document.getElementById('btnGoogle');
  const btnFacebook = document.getElementById('btnFacebook');
  const btnEmail = document.getElementById('btnEmail');
  const welcomeStatusEl = document.getElementById('welcomeStatus');

  if (!openWelcomeBtn || !welcomeModalEl || !closeWelcomeBtn) {
    // required elements missing — abort silently
    return;
  }

  function openWelcomeModal() {
    welcomeModalEl.style.display = 'flex';
    welcomeModalEl.classList.add('active');
    if (welcomeStatusEl) welcomeStatusEl.innerHTML = '';
    // optional: focus first action
    setTimeout(() => { btnGoogle && btnGoogle.focus(); }, 120);
  }

  function closeWelcomeModal() {
    welcomeModalEl.style.display = 'none';
    welcomeModalEl.classList.remove('active');
    if (welcomeStatusEl) welcomeStatusEl.innerHTML = '';
  }

  openWelcomeBtn.addEventListener('click', openWelcomeModal);
  closeWelcomeBtn.addEventListener('click', closeWelcomeModal);

  // close when clicking backdrop
  window.addEventListener('click', (ev) => {
    if (ev.target === welcomeModalEl) closeWelcomeModal();
  });

  // close via Escape key
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && welcomeModalEl.classList.contains('active')) {
      closeWelcomeModal();
    }
  });

  // tiny fake sign-in simulation (replace with real integration later)
  function simulateSignIn(providerLabel) {
    if (!welcomeStatusEl) return;
    welcomeStatusEl.innerHTML = `<span class="spinner"></span>Redirecting with ${providerLabel}...`;
    // simulate short redirect -> success -> close
    setTimeout(() => {
      welcomeStatusEl.innerHTML = `✅ Signed in with ${providerLabel}`;
      setTimeout(closeWelcomeModal, 800);
    }, 900);
  }

  btnGoogle && btnGoogle.addEventListener('click', () => simulateSignIn('Google'));
  btnFacebook && btnFacebook.addEventListener('click', () => simulateSignIn('Facebook'));
  btnEmail && btnEmail.addEventListener('click', () => simulateSignIn('Email'));
});
// Visitor Counter Logic
document.addEventListener("DOMContentLoaded", () => {
  const counterElement = document.getElementById("counterNumber");
  let count = localStorage.getItem("visitorCount");

  if (!count) {
    count = 1; // first visit
  } else {
    count = parseInt(count) + 1; // increment
  }

  localStorage.setItem("visitorCount", count);

  // Animate counting
  let current = 0;
  const duration = 1200; // total time
  const step = Math.ceil(count / (duration / 16));

  const animate = () => {
    current += step;
    if (current >= count) {
      counterElement.textContent = count.toLocaleString();
    } else {
      counterElement.textContent = current.toLocaleString();
      requestAnimationFrame(animate);
    }
  };
  animate();

  // Pulse glow effect
  counterElement.classList.add("counter-pulse");
  setTimeout(() => counterElement.classList.remove("counter-pulse"), 1200);
});
