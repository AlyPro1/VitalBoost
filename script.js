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