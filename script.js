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
/* ===== VitalBoost — AI Doctor Chat (scoped, safe-to-append) ===== */
(function () {
  const chatMessages = document.getElementById("chatMessages");
  const input = document.getElementById("healthQuery");
  const sendBtn = document.getElementById("sendQueryBtn");

  // Guard so we don't error if the modal isn't on the page yet
  if (!chatMessages || !input || !sendBtn) return;

  // A few friendly placeholder replies
  const AI_REPLIES = [
    "Based on what you described, mild hydration, rest, and monitoring can help. If symptoms last >48h, consider a clinician visit.",
    "Got it. Any fever, chest pain, or shortness of breath? If yes, seek in-person care. Otherwise, track symptoms and hydrate.",
    "That can be common. Try regular sleep, simple meals, and light activity. If it worsens, consult a doctor.",
    "Please avoid self-medication. If pain is severe or persists, consider a professional evaluation.",
    "Try noting when symptoms start, what triggers them, and any relief measures. This helps with accurate assessment.",
    "Gentle breathing exercises and short walks often help. If you feel dizzy or faint, sit/lie down immediately."
  ];

  // Helpers
  const esc = (s) =>
    s.replace(/[&<>"'`]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "`": "&#96;" }[c]));

  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function appendBubble(text, who = "user") {
    const row = document.createElement("div");
    row.className = `vb-msg vb-${who}`;
    const bubble = document.createElement("div");
    bubble.className = "vb-bubble";
    bubble.innerHTML = esc(text);
    row.appendChild(bubble);
    chatMessages.appendChild(row);
    scrollToBottom();
    return row;
  }

  function showTyping() {
    const row = document.createElement("div");
    row.className = "vb-msg vb-ai typing";
    const bubble = document.createElement("div");
    bubble.className = "vb-bubble";
    bubble.innerHTML = `<span class="dots"><span></span><span></span><span></span></span>`;
    row.appendChild(bubble);
    chatMessages.appendChild(row);
    scrollToBottom();
    return row;
  }

  function aiReply() {
    const reply = AI_REPLIES[Math.floor(Math.random() * AI_REPLIES.length)];
    appendBubble(reply, "ai");
  }

  function handleSend() {
    const text = input.value.trim();
    if (!text) return;

    appendBubble(text, "user");
    input.value = "";
    input.focus();

    // Simulate typing 0.9–1.8s
    const typingEl = showTyping();
    const delay = 900 + Math.random() * 900;

    setTimeout(() => {
      typingEl.remove();
      aiReply();
    }, delay);
  }

  // Send on click
  sendBtn.addEventListener("click", handleSend);

  // Send on Enter (but allow Shift+Enter for newline)
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  });

  // Keep chat scrolled to bottom whenever the modal opens
  // (runs when it becomes visible again)
  const chatModal = document.getElementById("aiDoctorChatModal");
  if (chatModal) {
    const observer = new MutationObserver(() => {
      const isOpen = window.getComputedStyle(chatModal).display !== "none";
      if (isOpen) setTimeout(scrollToBottom, 50);
    });
    observer.observe(chatModal, { attributes: true, attributeFilter: ["style", "class"] });
  }
})();
// === Upload Symptoms ===
const uploadTrigger = document.getElementById("uploadTrigger");
const symptomUpload = document.getElementById("symptomUpload");
const uploadedFiles = document.getElementById("uploadedFiles");

// Open file dialog when button is clicked
uploadTrigger.addEventListener("click", () => {
  symptomUpload.click();
});

// Display selected files
symptomUpload.addEventListener("change", () => {
  uploadedFiles.innerHTML = ""; // Clear previous list

  if (symptomUpload.files.length === 0) {
    uploadedFiles.innerHTML = "<p>No files uploaded.</p>";
  } else {
    const fileList = document.createElement("ul");
    for (let file of symptomUpload.files) {
      const li = document.createElement("li");
      li.textContent = `📄 ${file.name}`;
      fileList.appendChild(li);
    }
    uploadedFiles.appendChild(fileList);
  }
});
// === Health Tips Feature ===
const healthTipsBtn = document.getElementById("healthTipsBtn");
const healthTipsContainer = document.getElementById("healthTipsContainer");

// Top-class, engaging health tips
const healthTips = [
  "💧 Drink at least 8 glasses of water daily to stay energized and focused.",
  "🥗 Include a rainbow of vegetables in every meal for maximum nutrients.",
  "🏃‍♂️ 30 minutes of daily exercise boosts mood, metabolism, and immunity.",
  "😴 Prioritize 7-8 hours of sleep to help your body recover and function better.",
  "🧘 Practice mindfulness or meditation for 10 minutes to reduce stress.",
  "💪 Strength training twice a week helps build muscle and burn fat effectively.",
  "🍳 Include protein-rich foods like eggs, chicken, or legumes to feel full longer.",
  "🥤 Avoid sugary drinks; opt for herbal teas or infused water.",
  "🚶 Take short walking breaks every hour to improve circulation and focus.",
  "📵 Limit screen time before bed to improve sleep quality."
];

// Show random tip with animation
healthTipsBtn.addEventListener("click", () => {
  const randomTip = healthTips[Math.floor(Math.random() * healthTips.length)];
  
  // Create tip element
  const tipElement = document.createElement("div");
  tipElement.className = "tip-item";
  tipElement.textContent = randomTip;

  // Clear previous tip or keep history if you want
  healthTipsContainer.innerHTML = "";
  healthTipsContainer.appendChild(tipElement);

  // Animation effect
  tipElement.style.opacity = 0;
  tipElement.style.transform = "translateY(-20px)";
  setTimeout(() => {
    tipElement.style.transition = "all 0.5s ease";
    tipElement.style.opacity = 1;
    tipElement.style.transform = "translateY(0)";
  }, 50);
});
// Health Tips Modal
const healthTipsBtn = document.querySelector('.health-tips');
const healthTipsModal = document.getElementById('healthTipsModal');
const closeHealthTips = document.getElementById('closeHealthTips');
const tipCard = document.querySelector('.tip-card');
const nextTipBtn = document.getElementById('nextTipBtn');

const tips = [
  {
    img: "https://source.unsplash.com/400x250/?water,health",
    tip: "Drink at least 8 glasses of water daily 💧",
    detail: "💡 Staying hydrated improves brain function, skin glow, and muscle performance."
  },
  {
    img: "https://source.unsplash.com/400x250/?fruit,healthy",
    tip: "Eat fresh fruits every day 🍎",
    detail: "💡 Fruits provide essential vitamins and boost immunity naturally."
  },
  {
    img: "https://source.unsplash.com/400x250/?exercise,fitness",
    tip: "Exercise at least 30 minutes daily 🏋️",
    detail: "💡 Regular activity improves heart health, muscles, and mental well-being."
  }
];

let currentTip = 0;

healthTipsBtn.addEventListener('click', () => {
  healthTipsModal.style.display = 'flex';
  showTip(currentTip);
});

closeHealthTips.addEventListener('click', () => {
  healthTipsModal.style.display = 'none';
});

nextTipBtn.addEventListener('click', () => {
  tipCard.classList.toggle('flipped');
  setTimeout(() => {
    currentTip = (currentTip + 1) % tips.length;
    showTip(currentTip);
    tipCard.classList.toggle('flipped');
  }, 1000);
});

function showTip(index) {
  const front = tipCard.querySelector('.tip-front');
  const back = tipCard.querySelector('.tip-back');

  front.innerHTML = `
    <img src="${tips[index].img}" alt="Health Tip">
    <p>${tips[index].tip}</p>
  `;
  back.innerHTML = `<p>${tips[index].detail}</p>`;
}

