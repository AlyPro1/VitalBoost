// script.js — Clean, single-file version for VitalBoost
// Replace your existing script.js entirely with this file.

(function () {
  document.addEventListener("DOMContentLoaded", () => {
    /* -------------------------
       Floating Elements (smooth)
    --------------------------*/
    try {
      const floatingEls = document.querySelectorAll(".floating-element");
      floatingEls.forEach((el, i) => {
        let t = Math.random() * Math.PI * 2;
        const speed = 0.01 + Math.random() * 0.02;
        const amp = 8 + Math.random() * 18;
        function animate() {
          t += speed;
          const y = Math.sin(t + i) * amp;
          const x = Math.cos(t * 0.6 + i) * (amp / 6);
          el.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) rotate(${(t * 6) % 360}deg)`;
          requestAnimationFrame(animate);
        }
        animate();
      });
    } catch (e) { /* ignore */ }

    /* -------------------------
       Visitor / Counter
    --------------------------*/
    try {
      let visitors = parseInt(localStorage.getItem("vital_visitors") || "0", 10);
      visitors = Number.isFinite(visitors) ? visitors + 1 : 1;
      localStorage.setItem("vital_visitors", String(visitors));
      const counterEl = document.getElementById("counterNumber") || document.getElementById("visitorCount");
      if (counterEl) counterEl.textContent = visitors;
    } catch (e) { /* ignore */ }

    /* -------------------------
       Hero Carousel
    --------------------------*/
    try {
      const slides = Array.from(document.querySelectorAll(".image-slide"));
      if (slides.length > 0) {
        const order = slides.map((s, i) => i).sort(() => Math.random() - 0.5);
        let idx = 0;
        function showSlide(i) {
          slides.forEach((s) => s.classList.remove("active"));
          slides[order[i]].classList.add("active");
        }
        showSlide(idx);
        setInterval(() => {
          idx = (idx + 1) % slides.length;
          showSlide(idx);
        }, 5000);
      }
    } catch (e) { /* ignore */ }

    /* -------------------------
       Modal helpers & Avatar wiring
    --------------------------*/
    const doctorModal = document.getElementById("doctorModal");
    const runnerModal = document.getElementById("runnerModal");
    const aiDoctorChatModal = document.getElementById("aiDoctorChatModal");
    const doctorAvatar = document.getElementById("doctorAvatar");
    const runnerAvatar = document.getElementById("runnerAvatar");
    const chatWithAIDoctorBtn = document.getElementById("chatWithAIDoctorBtn");

    function openModal(modal) {
      if (!modal) return;
      modal.classList.add("active");
      // Prefer class-based styling but also support display style
      modal.style.display = "block";
      const closeBtn = modal.querySelector(".modal-close");
      if (closeBtn) closeBtn.focus();
      document.body.style.overflow = "hidden";
    }

    function closeModal(modal) {
      if (!modal) return;
      modal.classList.remove("active");
      modal.style.display = "none";
      document.body.style.overflow = "";
    }

    if (doctorAvatar && doctorModal) {
      doctorAvatar.addEventListener("click", (e) => {
        e.stopPropagation();
        openModal(doctorModal);
      });
    }
    if (runnerAvatar && runnerModal) {
      runnerAvatar.addEventListener("click", (e) => {
        e.stopPropagation();
        openModal(runnerModal);
      });
    }
    if (chatWithAIDoctorBtn && aiDoctorChatModal) {
      chatWithAIDoctorBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (doctorModal) closeModal(doctorModal);
        openModal(aiDoctorChatModal);
      });
    }

    // Close buttons inside overlays
    try {
      document.querySelectorAll(".modal-overlay .modal-close").forEach((btn) => {
        btn.addEventListener("click", (ev) => {
          const parent = btn.closest(".modal-overlay");
          if (parent) closeModal(parent);
        });
      });
    } catch (e) { /* ignore */ }

    // Click overlay to close
    window.addEventListener("click", (ev) => {
      const target = ev.target;
      if (target && target.classList && target.classList.contains("modal-overlay")) {
        closeModal(target);
      }
    });

    // ESC to close any open overlay
    window.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape") {
        [doctorModal, runnerModal, aiDoctorChatModal].forEach((m) => {
          if (m && (m.classList.contains("active") || m.style.display === "block")) closeModal(m);
        });
        // also close health tips popup if open (created later)
        const ht = document.getElementById("healthTipsPopup");
        if (ht && ht.style.display === "flex") ht.style.display = "none";
      }
    });

    // Fix pointer events for avatar container (prevents container overlay from blocking clicks)
    try {
      const avatarsPopup = document.querySelector(".avatars-popup");
      if (avatarsPopup) {
        avatarsPopup.style.pointerEvents = "none";
        const items = avatarsPopup.querySelectorAll(".avatar-item");
        items.forEach((it) => (it.style.pointerEvents = "auto"));
      }
    } catch (e) { /* ignore */ }

    /* -------------------------
       AI Doctor Chat (single unified implementation)
       Uses: chatMessages (id), healthQuery (id), sendQueryBtn (id)
    --------------------------*/
    const chatMessages = document.getElementById("chatMessages");
    const healthQuery = document.getElementById("healthQuery");
    const sendQueryBtn = document.getElementById("sendQueryBtn");
    const chatForm = document.getElementById("chatForm"); // optional legacy form
    const chatInputLegacy = document.getElementById("chatInput"); // optional

    const AI_REPLIES = [
      "It sounds like you need to rest and stay hydrated. 💧",
      "I recommend booking a real checkup if symptoms continue. 🏥",
      "Try light exercise and balanced meals. 🍎",
      "That could be stress-related. Deep breaths may help. 🌿",
      "Monitor your symptoms and let me know if they change. 👩‍⚕️",
      "If you have severe chest pain or trouble breathing, seek immediate care."
    ];

    function safeAppendMessage(text, who = "ai", isTyping = false) {
      if (!chatMessages) return null;
      const div = document.createElement("div");
      div.className = `chat-message ${who}`;
      const content = document.createElement("div");
      content.className = "chat-bubble";
      if (isTyping) {
        content.innerHTML = `<span class="typing-dots"><span>.</span><span>.</span><span>.</span></span>`;
      } else {
        // escape minimal to avoid accidental HTML injection
        content.textContent = text;
      }
      div.appendChild(content);
      chatMessages.appendChild(div);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      return div;
    }

    function getAIReply(userText) {
      // Simple selection — could call backend later
      return AI_REPLIES[Math.floor(Math.random() * AI_REPLIES.length)];
    }

    function sendMessageFromInput() {
      if (!healthQuery) return;
      const text = healthQuery.value.trim();
      if (!text) return;
      safeAppendMessage(text, "user");
      healthQuery.value = "";
      // typing indicator
      const typingEl = safeAppendMessage("", "ai", true);
      setTimeout(() => {
        if (typingEl && typingEl.parentNode) typingEl.remove();
        const reply = getAIReply(text);
        safeAppendMessage(reply, "ai");
      }, 900 + Math.random() * 900);
    }

    if (sendQueryBtn) {
      sendQueryBtn.addEventListener("click", sendMessageFromInput);
    }
    if (healthQuery) {
      healthQuery.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          sendMessageFromInput();
        }
      });
    }

    // Legacy form handler (if you use chatForm + chatInput)
    if (chatForm && chatInputLegacy) {
      chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const txt = chatInputLegacy.value.trim();
        if (!txt) return;
        safeAppendMessage(txt, "user");
        chatInputLegacy.value = "";
        setTimeout(() => safeAppendMessage(getAIReply(txt), "ai"), 900 + Math.random() * 900);
      });
    }

    /* -------------------------
       Upload Symptoms
    --------------------------*/
    const uploadTrigger = document.getElementById("uploadTrigger");
    const symptomUpload = document.getElementById("symptomUpload");
    const uploadedFiles = document.getElementById("uploadedFiles");

    if (uploadTrigger && symptomUpload) {
      uploadTrigger.addEventListener("click", () => symptomUpload.click());
    }
    if (symptomUpload && uploadedFiles) {
      symptomUpload.addEventListener("change", () => {
        uploadedFiles.innerHTML = "";
        if (symptomUpload.files.length === 0) {
          uploadedFiles.innerHTML = "<p>No files uploaded.</p>";
        } else {
          const ul = document.createElement("ul");
          Array.from(symptomUpload.files).forEach((file) => {
            const li = document.createElement("li");
            li.textContent = `📄 ${file.name}`;
            ul.appendChild(li);
          });
          uploadedFiles.appendChild(ul);
        }
      });
    }

    /* -------------------------
       Health Tips: small inline + popup (create if needed)
    --------------------------*/
    const healthTipsBtn = document.getElementById("healthTipsBtn");
    const healthTipsContainer = document.getElementById("healthTipsContainer");

    const HEALTH_TIPS_ARRAY = [
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

    // Small inline tip (keeps your previous small box behavior)
    function showInlineTip() {
      if (!healthTipsContainer) return;
      const randomTip = HEALTH_TIPS_ARRAY[Math.floor(Math.random() * HEALTH_TIPS_ARRAY.length)];
      const tipElement = document.createElement("div");
      tipElement.className = "tip-item";
      tipElement.textContent = randomTip;
      healthTipsContainer.innerHTML = "";
      healthTipsContainer.appendChild(tipElement);
      tipElement.style.opacity = 0;
      tipElement.style.transform = "translateY(-20px)";
      setTimeout(() => {
        tipElement.style.transition = "all 0.5s ease";
        tipElement.style.opacity = 1;
        tipElement.style.transform = "translateY(0)";
      }, 50);
    }

    // Create a big popup with flip-cards only once
    let healthTipsPopup = document.getElementById("healthTipsPopup");
    if (!healthTipsPopup) {
      healthTipsPopup = document.createElement("div");
      healthTipsPopup.id = "healthTipsPopup";
      healthTipsPopup.style.display = "none";
      healthTipsPopup.style.justifyContent = "center";
      healthTipsPopup.style.alignItems = "center";
      healthTipsPopup.style.position = "fixed";
      healthTipsPopup.style.top = "0";
      healthTipsPopup.style.left = "0";
      healthTipsPopup.style.width = "100%";
      healthTipsPopup.style.height = "100%";
      healthTipsPopup.style.background = "rgba(0,0,0,0.7)";
      healthTipsPopup.style.zIndex = "2200";

      // build inner HTML (3 example cards, uses the CSS classes your CSS expects)
      healthTipsPopup.innerHTML = `
        <div class="health-tips-popup-content" role="dialog" aria-modal="true" style="max-width:900px;width:92%;margin:40px auto;background:#fff;border-radius:14px;padding:22px;position:relative;">
          <button class="health-tips-close" id="closeHealthTipsPopup" aria-label="Close" style="position:absolute;right:14px;top:10px;font-size:26px;border:none;background:transparent;cursor:pointer;">&times;</button>
          <h2 style="text-align:center;margin-top:6px;margin-bottom:18px;">💡 Daily Health Tips</h2>
          <div class="health-tip-card" style="perspective:1000px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px;">
            <div class="health-tip-inner" style="transform-style:preserve-3d;transition:transform 0.8s;cursor:pointer;border-radius:12px;overflow:hidden;">
              <div class="health-tip-front" style="backface-visibility:hidden;padding:18px;min-height:200px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#6a11cb,#2575fc);color:#fff;font-weight:700;">
                <div><div style="font-size:28px">💧 Stay Hydrated</div><div style="margin-top:8px;font-weight:500;font-size:14px">Drink 8+ glasses daily</div></div>
              </div>
              <div class="health-tip-back" style="backface-visibility:hidden;transform:rotateY(180deg);padding:18px;min-height:200px;background:#f7f7f7;color:#222;display:flex;align-items:center;justify-content:center;">
                <div>Hydration helps energy, digestion, and skin. Try infused water with lemon or cucumber.</div>
              </div>
            </div>

            <div class="health-tip-inner" style="transform-style:preserve-3d;transition:transform 0.8s;cursor:pointer;border-radius:12px;overflow:hidden;">
              <div class="health-tip-front" style="backface-visibility:hidden;padding:18px;min-height:200px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#ff7e5f,#feb47b);color:#fff;font-weight:700;">
                <div><div style="font-size:28px">🥦 Eat Greens</div><div style="margin-top:8px;font-weight:500;font-size:14px">Veggies every meal</div></div>
              </div>
              <div class="health-tip-back" style="backface-visibility:hidden;transform:rotateY(180deg);padding:18px;min-height:200px;background:#fafafa;color:#222;display:flex;align-items:center;justify-content:center;">
                <div>Vegetables are rich in micronutrients and fiber. Aim for a colorful plate each meal.</div>
              </div>
            </div>

            <div class="health-tip-inner" style="transform-style:preserve-3d;transition:transform 0.8s;cursor:pointer;border-radius:12px;overflow:hidden;">
              <div class="health-tip-front" style="backface-visibility:hidden;padding:18px;min-height:200px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#11998e,#38ef7d);color:#fff;font-weight:700;">
                <div><div style="font-size:28px">😴 Sleep Well</div><div style="margin-top:8px;font-weight:500;font-size:14px">7–8 hours</div></div>
              </div>
              <div class="health-tip-back" style="backface-visibility:hidden;transform:rotateY(180deg);padding:18px;min-height:200px;background:#fff6e6;color:#222;display:flex;align-items:center;justify-content:center;">
                <div>Quality sleep restores energy and mental clarity. Keep a consistent bedtime routine.</div>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(healthTipsPopup);

      // attach flip-on-click behavior for each .health-tip-inner inside popup
      try {
        healthTipsPopup.querySelectorAll(".health-tip-inner").forEach((inner) => {
          inner.addEventListener("click", () => {
            // toggle rotateY
            const isFlipped = inner.style.transform && inner.style.transform.includes("rotateY(180deg)");
            inner.style.transform = isFlipped ? "rotateY(0deg)" : "rotateY(180deg)";
          });
        });
      } catch (e) { /* ignore */ }

      // close handler
      const closeHealthBtn = document.getElementById("closeHealthTipsPopup");
      if (closeHealthBtn) {
        closeHealthBtn.addEventListener("click", () => {
          healthTipsPopup.style.display = "none";
        });
      }

      // click outside to close
      healthTipsPopup.addEventListener("click", (ev) => {
        if (ev.target === healthTipsPopup) healthTipsPopup.style.display = "none";
      });
    } // end create popup

    // Attach the primary Health Tips button if present
    if (healthTipsBtn) {
      healthTipsBtn.addEventListener("click", (ev) => {
        ev.stopPropagation();
        // show inline tip (small box) for quick response
        showInlineTip();
        // then open big popup after a short delay for visual flow
        const htPopup = document.getElementById("healthTipsPopup");
        if (htPopup) {
          // small delay so inline tip appears first, then popup opens
          setTimeout(() => {
            htPopup.style.display = "flex";
          }, 250);
        }
      });
    }

    // Also allow pressing ESC to close popup (already covered above)
  }); // DOMContentLoaded
})(); // IIFE end

