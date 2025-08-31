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
// HEALTH TIPS MODAL
// =============================

// Select the new elements
const healthTipsBtn = document.getElementById('healthTipsBtn');
const healthTipsModal = document.getElementById('healthTipsModal');
const closeHealthTips = document.getElementById('closeHealthTips');

if(healthTipsBtn && healthTipsModal && closeHealthTips) {
  
  // Open the Health Tips modal
  healthTipsBtn.addEventListener('click', () => {
    doctorModal.style.display = 'none'; // Hide the doctor modal
    healthTipsModal.style.display = 'flex'; // Show the tips modal
  });

  // Close the Health Tips modal
  closeHealthTips.addEventListener('click', () => {
    healthTipsModal.style.display = 'none';
  });

  // Also close it by clicking the background
  window.addEventListener('click', (event) => {
    if (event.target === healthTipsModal) {
      healthTipsModal.style.display = 'none';
    }
  });
}
// ✅ Health Tips Button Logic
document.addEventListener("DOMContentLoaded", () => {
  
  if (healthTipsBtn) {
    healthTipsBtn.addEventListener("click", () => {
      // Example list of health tips
      const tips = [
        "💧 Stay hydrated — drink at least 8 glasses of water daily.",
        "🥗 Eat more whole foods like fruits, vegetables, and lean proteins.",
        "🏃 Exercise at least 30 minutes a day, 5 times a week.",
        "😴 Aim for 7–8 hours of quality sleep every night.",
        "🧘 Reduce stress with meditation, deep breathing, or yoga.",
        "🚶 Take short breaks to stretch if you sit for long periods.",
        "❌ Avoid smoking and limit alcohol for long-term health.",
        "💡 Regular check-ups can catch issues early."
      ];

      // Pick a random tip
      const randomTip = tips[Math.floor(Math.random() * tips.length)];

      // Show it in an alert (you can replace with a modal, toast, etc.)
      alert("Health Tip: " + randomTip);
    });
  }
});
// ✅ Select button once
const healthTipsBtn = document.getElementById("healthTipsBtn");
const healthTipsModal = document.getElementById("healthTipsModal");
const healthTipsClose = document.getElementById("healthTipsClose");
const healthTipText = document.getElementById("healthTipText");

const healthTips = [
  "💧 Stay hydrated — drink at least 8 glasses of water daily!",
  "🥗 Eat a rainbow of fruits and vegetables every day.",
  "🏃 Move at least 30 minutes daily — walking counts!",
  "😴 Sleep 7–9 hours each night for recovery.",
  "🧘 Manage stress with deep breathing or meditation.",
  "🚶 Take short breaks to stretch if sitting for long hours."
];

let currentTipIndex = 0;
let tipInterval;

// Open modal and start auto cycle
healthTipsBtn.addEventListener("click", () => {
  healthTipsModal.style.display = "flex";
  showTip(currentTipIndex);
  tipInterval = setInterval(nextTip, 4000); // every 4s flip
});

// Close modal and stop auto cycle
healthTipsClose.addEventListener("click", () => {
  healthTipsModal.style.display = "none";
  clearInterval(tipInterval);
});

// Functions
function showTip(index) {
  healthTipText.textContent = healthTips[index];
  healthTipText.classList.remove("show");
  void healthTipText.offsetWidth; // reset animation
  healthTipText.classList.add("show");
}

function nextTip() {
  currentTipIndex = (currentTipIndex + 1) % healthTips.length;
  showTip(currentTipIndex);
}
