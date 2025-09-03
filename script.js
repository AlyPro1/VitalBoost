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
    }
  });
}

// Open runner modal
if (runnerAvatar) {
  runnerAvatar.addEventListener("click", () => {
    if (runnerModal) {
      runnerModal.style.display = "flex";
      runnerModal.classList.add("active");
    }
  });
}

// Close doctor modal
if (closeDoctor) {
  closeDoctor.addEventListener("click", () => {
    if (doctorModal) {
      doctorModal.style.display = "none";
      doctorModal.classList.remove("active");
    }
  });
}

// Close runner modal
if (closeRunner) {
  closeRunner.addEventListener("click", () => {
    if (runnerModal) {
      runnerModal.style.display = "none";
      runnerModal.classList.remove("active");
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
  
  // Start counting steps (faster for demo - every 100ms)
  stepInterval = setInterval(() => {
    currentSteps += Math.floor(Math.random() * 3) + 1; // Random 1-3 steps
    updateStepDisplay();
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
// ===================
// Calories Burned Logic
// ===================

// Get elements
const openCaloriesBurnedBtn = document.getElementById("openCaloriesBurned"); 
const caloriesBurnedModal = document.getElementById("caloriesBurnedModal");
const closeCaloriesBurnedBtn = document.getElementById("closeCaloriesBurned");

const cyclingBtn = document.getElementById("cyclingBtn");
const gymBtn = document.getElementById("gymBtn");
const yogaBtn = document.getElementById("yogaBtn");

const minutesInput = document.getElementById("minutesInput");
const calculateCaloriesBtn = document.getElementById("calculateCaloriesBtn");

const caloriesDisplay = document.getElementById("caloriesDisplay");
const caloriesProgressFill = document.getElementById("caloriesProgressFill");
const milestoneMessage = document.getElementById("milestoneMessage");
const caloriesRewardMessage = document.getElementById("caloriesRewardMessage");

let selectedActivity = null;
let caloriesBurned = 0;
const calorieGoal = 500; // Example daily goal

// Open modal
if (openCaloriesBurnedBtn) {
  openCaloriesBurnedBtn.addEventListener("click", () => {
    caloriesBurnedModal.style.display = "flex";
  });
}

// Close modal
if (closeCaloriesBurnedBtn) {
  closeCaloriesBurnedBtn.addEventListener("click", () => {
    caloriesBurnedModal.style.display = "none";
  });
}

// Close modal on overlay click
window.addEventListener("click", (e) => {
  if (e.target === caloriesBurnedModal) {
    caloriesBurnedModal.style.display = "none";
  }
});

// Activity selection
if (cyclingBtn && gymBtn && yogaBtn) {
  [cyclingBtn, gymBtn, yogaBtn].forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedActivity = btn.id; // Save which button clicked
      milestoneMessage.textContent = `Selected: ${btn.textContent}`;
    });
  });
}

// Calculate calories
if (calculateCaloriesBtn) {
  calculateCaloriesBtn.addEventListener("click", () => {
    const minutes = parseInt(minutesInput.value) || 0;
    if (!selectedActivity || minutes <= 0) {
      milestoneMessage.textContent = "⚠️ Please select an activity and enter minutes.";
      return;
    }

    // Simple calorie burn estimates
    const calorieRates = {
      cyclingBtn: 8,
      gymBtn: 10,
      yogaBtn: 5,
    };

    caloriesBurned = minutes * (calorieRates[selectedActivity] || 6);
    caloriesDisplay.textContent = `Total: ${caloriesBurned} kcal`;

    // Progress bar update
    const progress = Math.min((caloriesBurned / calorieGoal) * 100, 100);
    caloriesProgressFill.style.width = `${progress}%`;

    // Messages
    if (caloriesBurned >= calorieGoal) {
      milestoneMessage.textContent = "🎉 Goal Reached!";
      caloriesRewardMessage.textContent = "🏆 You earned a Crypto reward!";
    } else {
      milestoneMessage.textContent = `🔥 Keep going! ${calorieGoal - caloriesBurned} kcal left to goal.`;
      caloriesRewardMessage.textContent = "";
    }
  });
}
