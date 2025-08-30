document.addEventListener('DOMContentLoaded', () => {

    // =============================
    // HERO BACKGROUND CAROUSEL
    // =============================
    const slides = document.querySelectorAll('.image-slide');
    if (slides.length > 0) {
        let currentIndex = 0;
        function rotateSlides() {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[currentIndex].classList.add('active');
            currentIndex = (currentIndex + 1) % slides.length;
        }
        setInterval(rotateSlides, 5000);
        rotateSlides();
    }

    // =============================
    // ALL MODAL ELEMENT SELECTIONS
    // =============================
    const doctorAvatar = document.getElementById("doctorAvatar");
    const runnerAvatar = document.getElementById("runnerAvatar");
    
    const doctorModal = document.getElementById("doctorModal");
    const runnerModal = document.getElementById("runnerModal");
    const aiDoctorChatModal = document.getElementById("aiDoctorChatModal");
    const healthTipsModal = document.getElementById("healthTipsModal");

    const closeDoctor = document.getElementById("closeDoctor");
    const closeRunner = document.getElementById("closeRunner");
    const closeAIDoctor = document.getElementById("closeAIDoctor");
    const closeHealthTips = document.getElementById("closeHealthTips");

    const chatWithAIDoctorBtn = document.getElementById("chatWithAIDoctorBtn");
    const healthTipsBtn = document.getElementById('healthTipsBtn');

    // =============================
    // MODAL EVENT LISTENERS
    // =============================
    if (doctorAvatar) {
        doctorAvatar.addEventListener("click", () => {
            if (doctorModal) doctorModal.style.display = "flex";
        });
    }

    if (runnerAvatar) {
        runnerAvatar.addEventListener("click", () => {
            if (runnerModal) runnerModal.style.display = "flex";
        });
    }

    if (closeDoctor) closeDoctor.addEventListener("click", () => doctorModal.style.display = "none");
    if (closeRunner) closeRunner.addEventListener("click", () => runnerModal.style.display = "none");
    if (closeAIDoctor) closeAIDoctor.addEventListener("click", () => aiDoctorChatModal.style.display = "none");
    if (closeHealthTips) closeHealthTips.addEventListener("click", () => healthTipsModal.style.display = "none");
    
    if (chatWithAIDoctorBtn) {
        chatWithAIDoctorBtn.addEventListener("click", () => {
            if (doctorModal) doctorModal.style.display = "none";
            if (aiDoctorChatModal) aiDoctorChatModal.style.display = "flex";
        });
    }
    
    if (healthTipsBtn) {
        healthTipsBtn.addEventListener("click", () => {
            if (doctorModal) doctorModal.style.display = "none";
            if (healthTipsModal) healthTipsModal.style.display = "flex";
        });
    }

    window.addEventListener("click", (event) => {
        if (event.target === doctorModal) doctorModal.style.display = "none";
        if (event.target === runnerModal) runnerModal.style.display = "none";
        if (event.target === aiDoctorChatModal) aiDoctorChatModal.style.display = "none";
        if (event.target === healthTipsModal) healthTipsModal.style.display = "none";
    });
    
    // =============================
    // AI CHAT INTERACTIVITY
    // =============================
    const chatMessages = document.getElementById('chatMessages');
    const healthQueryInput = document.getElementById('healthQuery');
    const sendQueryBtn = document.getElementById('sendQueryBtn');

    if (chatMessages && healthQueryInput && sendQueryBtn) {
        sendQueryBtn.addEventListener('click', sendMessage);
        healthQueryInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                sendMessage();
            }
        });

        function sendMessage() {
            const userText = healthQueryInput.value.trim();
            if (userText === "") return;
            displayMessage(userText, 'user');
            healthQueryInput.value = "";
            getAIResponse(userText);
        }

        function displayMessage(message, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message-bubble ${sender}-message`;
            messageDiv.innerText = message;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function getAIResponse(userMessage) {
            displayMessage("Thinking...", 'ai');
            setTimeout(() => {
                const thinkingBubble = Array.from(chatMessages.children).find(child => child.innerText === "Thinking...");
                if (thinkingBubble) thinkingBubble.remove();
                const simulatedResponse = `Regarding "${userMessage}", please remember I am an AI assistant. For real medical advice, consult a qualified doctor.`;
                displayMessage(simulatedResponse, 'ai');
            }, 1500);
        }
    }

    // =============================
    // UPLOAD SYMPTOMS FEATURE
    // =============================
    const uploadTriggerBtn = document.getElementById('uploadTrigger');
    const symptomUploadInput = document.getElementById('symptomUpload');
    const uploadedFilesContainer = document.getElementById('uploadedFiles');

    if (uploadTriggerBtn && symptomUploadInput && uploadedFilesContainer) {
        uploadTriggerBtn.addEventListener('click', () => {
            symptomUploadInput.click();
        });
        symptomUploadInput.addEventListener('change', () => {
            uploadedFilesContainer.innerHTML = '';
            if (symptomUploadInput.files.length > 0) {
                for (const file of symptomUploadInput.files) {
                    const filePill = document.createElement('div');
                    filePill.className = 'file-pill';
                    filePill.textContent = `📄 ${file.name}`;
                    uploadedFilesContainer.appendChild(filePill);
                }
            }
        });
    }

});