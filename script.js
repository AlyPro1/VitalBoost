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
// --- Chat with AI Doctor ---
const askDoctorBtn = document.getElementById("askDoctorBtn");
const doctorInput = document.getElementById("doctorInput");
const chatMessages = document.getElementById("chatMessages");

const fakeReplies = [
  "It sounds like you should rest and drink plenty of water.",
  "I recommend scheduling a full health checkup for accurate advice.",
  "Can you share how long you've been experiencing these symptoms?",
  "Try some light exercise and a balanced diet, it may help.",
  "If the issue continues, consulting a real doctor would be best."
];

function addMessage(sender, text) {
  const message = document.createElement("div");
  message.classList.add("message", sender);
  message.textContent = text;
  chatMessages.appendChild(message);

  // Auto-scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

askDoctorBtn.addEventListener("click", () => {
  const userMessage = doctorInput.value.trim();
  if (userMessage === "") return;

  // Show user message
  addMessage("user", userMessage);
  doctorInput.value = "";

  // Show typing animation
  const typingMsg = document.createElement("div");
  typingMsg.classList.add("message", "doctor", "typing");
  typingMsg.textContent = "AI Doctor is typing...";
  chatMessages.appendChild(typingMsg);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Simulate delay before doctor reply
  setTimeout(() => {
    typingMsg.remove();
    const reply = fakeReplies[Math.floor(Math.random() * fakeReplies.length)];
    addMessage("doctor", reply);
  }, 1500); // 1.5s delay
});
