// script.js - Robust version for VitalBoost
// Replace your existing script.js entirely with this file.

(function () {
  // Wait for DOM to be ready (script is loaded at bottom but still safe)
  document.addEventListener('DOMContentLoaded', () => {

    /* -------------------------
       Floating Elements (smooth)
    --------------------------*/
    const floatingEls = document.querySelectorAll('.floating-element');
    floatingEls.forEach((el, i) => {
      // small, independent float using requestAnimationFrame
      let t = Math.random() * Math.PI * 2;
      const speed = 0.01 + Math.random() * 0.02;
      const amp = 8 + Math.random() * 18; // amplitude in px
      function animate() {
        t += speed;
        const y = Math.sin(t + i) * amp;
        const x = Math.cos(t * 0.6 + i) * (amp / 6);
        el.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) rotate(${(t * 6) % 360}deg)`;
        requestAnimationFrame(animate);
      }
      animate();
    });

    /* -------------------------
       Visitor / Counter (uses counterNumber in HTML)
    --------------------------*/
    try {
      let visitors = parseInt(localStorage.getItem('vital_visitors') || '0', 10);
      visitors = Number.isFinite(visitors) ? visitors + 1 : 1;
      localStorage.setItem('vital_visitors', String(visitors));
      const counterEl = document.getElementById('counterNumber') || document.getElementById('visitorCount');
      if (counterEl) counterEl.textContent = visitors;
    } catch (e) {
      // ignore storage errors
      // console.warn('visitor counter failed', e);
    }

    /* -------------------------
       Hero Carousel (safe)
    --------------------------*/
    const slides = Array.from(document.querySelectorAll('.image-slide'));
    if (slides.length > 0) {
      // randomize order for a dynamic feel (keeps DOM positions unchanged)
      const order = slides.map((s, i) => i).sort(() => Math.random() - 0.5);
      let idx = 0;
      function showSlide(i) {
        slides.forEach(s => s.classList.remove('active'));
        slides[order[i]].classList.add('active');
      }
      showSlide(idx);
      setInterval(() => {
        idx = (idx + 1) % slides.length;
        showSlide(idx);
      }, 5000);
    }

    /* -------------------------
       Modal helpers
    --------------------------*/
    const doctorModal = document.getElementById('doctorModal');
    const runnerModal = document.getElementById('runnerModal');
    const aiDoctorChatModal = document.getElementById('aiDoctorChatModal');
    const doctorAvatar = document.getElementById('doctorAvatar');
    const runnerAvatar = document.getElementById('runnerAvatar');

    // AI Doctor Chat button
    const chatWithAIDoctorBtn = document.getElementById('chatWithAIDoctorBtn');

    function openModal(modal) {
      if (!modal) return;
      modal.classList.add('active');
      // trap focus lightly (focus first close button if exists)
      const closeBtn = modal.querySelector('.modal-close');
      if (closeBtn) closeBtn.focus();
      document.body.style.overflow = 'hidden'; // avoid background scroll
    }

    function closeModal(modal) {
      if (!modal) return;
      modal.classList.remove('active');
      document.body.style.overflow = ''; // restore scroll
    }

    // Attach avatar -> open modal
    if (doctorAvatar && doctorModal) {
      doctorAvatar.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(doctorModal);
      });
    }

    if (runnerAvatar && runnerModal) {
      runnerAvatar.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(runnerModal);
      });
    }

    // Chat with AI Doctor button functionality
    if (chatWithAIDoctorBtn && aiDoctorChatModal) {
      chatWithAIDoctorBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        // Close the doctor modal first
        if (doctorModal) closeModal(doctorModal);
        // Then open the AI chat modal
        openModal(aiDoctorChatModal);
      });
    }

    // Find close buttons inside each modal (works even if ids differ)
    if (doctorModal) {
      const close = doctorModal.querySelector('.modal-close');
      if (close) close.addEventListener('click', () => closeModal(doctorModal));
    }
    if (runnerModal) {
      const close = runnerModal.querySelector('.modal-close');
      if (close) close.addEventListener('click', () => closeModal(runnerModal));
    }
    if (aiDoctorChatModal) {
      const close = aiDoctorChatModal.querySelector('.modal-close');
      if (close) close.addEventListener('click', () => closeModal(aiDoctorChatModal));
    }

    // Click outside to close (the overlay is the modal element with class modal-overlay)
    window.addEventListener('click', (ev) => {
      const target = ev.target;
      if (target && target.classList && target.classList.contains('modal-overlay')) {
        closeModal(target);
      }
    });

    // ESC to close
    window.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape') {
        if (doctorModal && doctorModal.classList.contains('active')) closeModal(doctorModal);
        if (runnerModal && runnerModal.classList.contains('active')) closeModal(runnerModal);
        if (aiDoctorChatModal && aiDoctorChatModal.classList.contains('active')) closeModal(aiDoctorChatModal);
      }
    });

    /* -------------------------
       Ensure avatars are clickable (debugging aid)
       If avatars exist but not clickable, we add a small pointer-events fix.
    --------------------------*/
    try {
      const avatarsPopup = document.querySelector('.avatars-popup');
      if (avatarsPopup) {
        // container must not block clicks — allow avatar items to receive pointer events.
        avatarsPopup.style.pointerEvents = 'none';
        const items = avatarsPopup.querySelectorAll('.avatar-item');
        items.forEach(it => it.style.pointerEvents = 'auto');
      }
    } catch (e) { /* silent */ }

    /* -------------------------
       Small safety console notices (remove if noisy)
    --------------------------*/
    // If nothing opens, give a hint:
    if (!(doctorAvatar && doctorModal) && !(runnerAvatar && runnerModal)) {
      // console.info('Modal wiring: ensure avatars (doctorAvatar/runnerAvatar) and modal overlays (doctorModal/runnerModal) have correct IDs.');
    }

  }); // DOMContentLoaded
})(); 
// =====================
// AI Doctor Chat Logic
// =====================
const aiDoctorChatModal = document.getElementById("aiDoctorChatModal");
const chatWithAIDoctorBtn = document.getElementById("chatWithAIDoctorBtn");
const closeAIDoctor = document.getElementById("closeAIDoctor");
const sendQueryBtn = document.getElementById("sendQueryBtn");
const healthQueryInput = document.getElementById("healthQuery");
const chatMessages = document.getElementById("chatMessages");

// Open AI Doctor Chat
chatWithAIDoctorBtn.addEventListener("click", () => {
  aiDoctorChatModal.style.display = "block";
});

// Close AI Doctor Chat
closeAIDoctor.addEventListener("click", () => {
  aiDoctorChatModal.style.display = "none";
});

// Fake replies
const fakeReplies = [
  "It sounds like you need to rest and stay hydrated. 💧",
  "I recommend booking a real checkup if symptoms continue. 🏥",
  "Try light exercise and balanced meals. 🍎",
  "That could be stress-related. Deep breaths may help. 🌿",
  "Monitor your symptoms and let me know if they change. 👩‍⚕️"
];

// Send message
sendQueryBtn.addEventListener("click", () => {
  const userMessage = healthQueryInput.value.trim();
  if (userMessage === "") return;

  // Display user message
  const userMsgDiv = document.createElement("div");
  userMsgDiv.className = "chat-message user";
  userMsgDiv.textContent = userMessage;
  chatMessages.appendChild(userMsgDiv);

  healthQueryInput.value = "";

  // Auto-scroll to latest
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // AI reply after 1.5s
  setTimeout(() => {
    const aiReply = fakeReplies[Math.floor(Math.random() * fakeReplies.length)];
    const aiMsgDiv = document.createElement("div");
    aiMsgDiv.className = "chat-message ai";
    aiMsgDiv.textContent = aiReply;
    chatMessages.appendChild(aiMsgDiv);

    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 1500);
});
document.addEventListener("DOMContentLoaded", () => {
  const chatMessages = document.getElementById("chatMessages");
  const healthQuery = document.getElementById("healthQuery");
  const sendQueryBtn = document.getElementById("sendQueryBtn");

  // Function to add messages to chat
  function addMessage(sender, text, isTyping = false) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message", sender);

    if (isTyping) {
      messageDiv.innerHTML = `<span class="typing-dots"><span>.</span><span>.</span><span>.</span></span>`;
    } else {
      messageDiv.textContent = text;
    }

    chatMessages.appendChild(messageDiv);

    // Auto-scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;

    return messageDiv;
  }

  // Handle sending query
  function sendMessage() {
    const query = healthQuery.value.trim();
    if (!query) return;

    // User message
    addMessage("user", query);
    healthQuery.value = "";

    // Typing indicator for AI
    const typingMessage = addMessage("doctor", "", true);

    // After 1.5 sec, replace typing with AI response
    setTimeout(() => {
      typingMessage.remove();
      addMessage("doctor", getAIResponse(query));
    }, 1500);
  }

  // Fake AI response generator (replace with backend/AI API later)
  function getAIResponse(userInput) {
    return `I understand your concern about "${userInput}". 💡 
Let me suggest some general health advice: stay hydrated, rest well, and if symptoms persist, consult a real doctor. 👨‍⚕️`;
  }

  // Event listeners
  if (sendQueryBtn) {
    sendQueryBtn.addEventListener("click", sendMessage);
  }

  if (healthQuery) {
    healthQuery.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendMessage();
    });
  }
});
// ===============================
// AI Doctor Chat Enhancements
// ===============================

// Auto-scroll function
function scrollToBottom() {
  const chatMessages = document.getElementById("chatMessages");
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to simulate AI typing + delayed response
function simulateAIResponse(userMessage) {
  const chatMessages = document.getElementById("chatMessages");

  // Add typing animation
  const typingDiv = document.createElement("div");
  typingDiv.classList.add("message", "ai-message", "typing");
  typingDiv.textContent = "Doctor is typing...";
  chatMessages.appendChild(typingDiv);
  scrollToBottom();

  // After 1.5 sec, replace with AI reply
  setTimeout(() => {
    typingDiv.remove();

    const aiResponse = document.createElement("div");
    aiResponse.classList.add("message", "ai-message");
    aiResponse.textContent =
      "Thank you for sharing. Based on your symptoms, I recommend consulting a healthcare provider for personalized advice.";
    chatMessages.appendChild(aiResponse);

    scrollToBottom();
  }, 1500);
}

// Handle send button click
document.getElementById("sendQueryBtn")?.addEventListener("click", () => {
  const input = document.getElementById("healthQuery");
  const message = input.value.trim();
  if (message) {
    // Show user message
    const chatMessages = document.getElementById("chatMessages");
    const userMessage = document.createElement("div");
    userMessage.classList.add("message", "user-message");
    userMessage.textContent = message;
    chatMessages.appendChild(userMessage);
    scrollToBottom();

    // Clear input
    input.value = "";

    // Simulate AI response
    simulateAIResponse(message);
  }
});

// Handle Enter key for input
document.getElementById("healthQuery")?.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    document.getElementById("sendQueryBtn").click();
  }
});
// ---------------- AI Doctor Chat Feature ----------------

// Get chat elements
const chatMessages = document.getElementById("chatMessages");
const healthQuery = document.getElementById("healthQuery");
const sendQueryBtn = document.getElementById("sendQueryBtn");

// Helper: auto-scroll
function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Helper: typing animation for AI doctor
function showTypingIndicator() {
  const typingDiv = document.createElement("div");
  typingDiv.className = "ai-message typing";
  typingDiv.innerHTML = `<span class="dot"></span><span class="dot"></span><span class="dot"></span>`;
  chatMessages.appendChild(typingDiv);
  scrollToBottom();
  return typingDiv;
}

// Add message to chat
function addMessage(sender, text) {
  const msgDiv = document.createElement("div");
  msgDiv.className = sender === "user" ? "user-message" : "ai-message";
  msgDiv.textContent = text;
  chatMessages.appendChild(msgDiv);
  scrollToBottom();
}

// Handle send button
sendQueryBtn.addEventListener("click", () => {
  const query = healthQuery.value.trim();
  if (!query) return;

  // Add user message
  addMessage("user", query);
  healthQuery.value = "";

  // Show typing animation
  const typingDiv = showTypingIndicator();

  // Simulate AI reply after 1.5s
  setTimeout(() => {
    typingDiv.remove();
    addMessage("ai", "I'm your AI Doctor 👨‍⚕️ — Based on what you said, it’s best to stay hydrated and rest. Do you want me to suggest remedies?");
  }, 1500);
});
