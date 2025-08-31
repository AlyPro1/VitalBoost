// ===== Helper: Open & Close Modals =====
function openModal(id) {
  document.getElementById(id).classList.add("active");
}

function closeModal(id) {
  document.getElementById(id).classList.remove("active");
}

// ===== Avatars =====
document.getElementById("doctorAvatar").addEventListener("click", () => {
  openModal("doctorModal");
});

document.getElementById("runnerAvatar").addEventListener("click", () => {
  openModal("runnerModal");
});

// ===== Feature Buttons =====
document.getElementById("chatDoctorBtn").addEventListener("click", () => {
  openModal("chatModal");
});

document.getElementById("uploadSymptomsBtn").addEventListener("click", () => {
  openModal("doctorModal"); // Upload Symptoms shown inside Doctor modal
});

document.getElementById("healthTipsBtn").addEventListener("click", () => {
  openModal("healthTipsModal");
});

// ===== Close Buttons =====
document.querySelectorAll(".close-modal").forEach(btn => {
  btn.addEventListener("click", () => {
    const modalId = btn.getAttribute("data-close");
    closeModal(modalId);
  });
});

// ===== Chat Simulation =====
document.getElementById("sendBtn").addEventListener("click", () => {
  const input = document.getElementById("chatInput");
  const chatWindow = document.getElementById("chatWindow");

  if (input.value.trim() !== "") {
    const userMsg = document.createElement("p");
    userMsg.textContent = "👤 You: " + input.value;
    chatWindow.appendChild(userMsg);

    // Fake AI Reply
    const aiMsg = document.createElement("p");
    aiMsg.textContent = "🤖 Doctor: Thanks for sharing! I’ll analyze it.";
    setTimeout(() => chatWindow.appendChild(aiMsg), 800);

    input.value = "";
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
});
