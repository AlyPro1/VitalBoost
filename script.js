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
// Track Steps Logic
document.addEventListener("DOMContentLoaded", () => {
  const openStepsBtn = document.getElementById("openStepsTracker");
  const stepsTracker = document.getElementById("stepsTracker");
  const stepCount = document.getElementById("stepCount");
  const addStepsBtn = document.getElementById("addSteps");
  const resetStepsBtn = document.getElementById("resetSteps");

  let steps = 0;

  // Only run if elements exist
  if (openStepsBtn && stepsTracker && stepCount && addStepsBtn && resetStepsBtn) {
    // Show / hide tracker
    openStepsBtn.addEventListener("click", () => {
      stepsTracker.style.display =
        stepsTracker.style.display === "none" ? "block" : "none";
    });

    // Add steps
    addStepsBtn.addEventListener("click", () => {
      steps += 100;
      stepCount.textContent = steps;
    });

    // Reset steps
    resetStepsBtn.addEventListener("click", () => {
      steps = 0;
      stepCount.textContent = steps;
    });
  }
});
// Step Tracker Modal
const openStepsBtn = document.querySelector(".track-steps");
const stepsModal = document.getElementById("stepsModal");
const closeSteps = document.getElementById("closeSteps");

const stepCount = document.getElementById("stepCount");
const addSteps = document.getElementById("addSteps");
const resetSteps = document.getElementById("resetSteps");
const progressFill = document.getElementById("progressFill");
const stepsCircle = document.getElementById("stepsCircle");

let steps = 0;
const goal = 5000; // daily step goal

// Open modal
openStepsBtn.addEventListener("click", () => {
  stepsModal.style.display = "flex";
});

// Close modal
closeSteps.addEventListener("click", () => {
  stepsModal.style.display = "none";
});

// Update UI
function updateSteps() {
  stepCount.textContent = steps;

  let progress = Math.min((steps / goal) * 100, 100);
  progressFill.style.width = progress + "%";

  // Glow color based on progress
  if (progress < 50) {
    stepsCircle.style.boxShadow = "0 0 25px limegreen";
    progressFill.style.background = "limegreen";
  } else if (progress < 80) {
    stepsCircle.style.boxShadow = "0 0 25px yellow";
    progressFill.style.background = "yellow";
  } else {
    stepsCircle.style.boxShadow = "0 0 25px red";
    progressFill.style.background = "red";
  }
}

// Add steps
addSteps.addEventListener("click", () => {
  steps += 100;
  updateSteps();

  // Shoe jump animation
  stepsCircle.classList.add("jump");
  setTimeout(() => stepsCircle.classList.remove("jump"), 400);
});

// Reset steps
resetSteps.addEventListener("click", () => {
  steps = 0;
  updateSteps();
});

// Initialize
updateSteps();
