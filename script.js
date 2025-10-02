// --- Temporary stub analytics functions to prevent errors ---
function trackFitnessActivity() {}
function trackSteps() {}
function trackCaloriesBurned() {}
function trackDailyGoal() {}
function trackGoalCompletion() {}
function trackHealthTipView() {}
function trackModalOpen() {}
function trackModalClose() {}
function trackButtonClick() {}
function trackHealthQuery() {}
function trackUserAction() {}
function initializeAnalytics() {}

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

  // Privacy Policy Modal close on outside click
  const privacyModal = document.getElementById('privacyPolicyModal');
  if (event.target === privacyModal && privacyModal) {
    privacyModal.style.display = "none";
    privacyModal.classList.remove("active");
    document.body.style.overflow = "auto";
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
  if (stepInterval)
}