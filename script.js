document.addEventListener('DOMContentLoaded', () => {

    // =============================
    // ORIGINAL: Floating Elements & Counter
    // =============================
    const floatingElements = document.querySelectorAll(".floating-element");
    if (floatingElements.length > 0) {
        floatingElements.forEach((el) => {
            let direction = Math.random() < 0.5 ? -1 : 1;
            let speed = 1 + Math.random() * 1;
            let currentY = 0;
            function float() {
                if (Math.abs(currentY) > 20) direction *= -1;
                currentY += direction * 0.1 * speed;
                el.style.transform = `translateY(${currentY}px)`;
                requestAnimationFrame(float);
            }
            float();
        });
    }

    const counterNumber = document.getElementById("counterNumber");
    if (counterNumber) {
        let count = 0;
        const targetCount = 100; // Let's set a target
        const interval = setInterval(() => {
            count += Math.ceil(Math.random() * 5);
            if (count > targetCount) {
                count = targetCount;
                clearInterval(interval);
            }
            counterNumber.textContent = count;
        }, 80);
    }
    
    // =============================
    // ORIGINAL: Hero Background Carousel
    // =============================
    const slides = document.querySelectorAll('.image-slide');
    if (slides.length > 0) {
        let currentIndex = 0;
        const shuffledSlides = Array.from(slides).sort(() => Math.random() - 0.5);
        function rotateSlides() {
            shuffledSlides.forEach(slide => slide.classList.remove('active'));
            shuffledSlides[currentIndex].classList.add('active');
            currentIndex = (currentIndex + 1) % shuffledSlides.length;
        }
        setInterval(rotateSlides, 5000);
        rotateSlides();
    }

    // =============================
    // ALL MODAL CONTROLS
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

    if(doctorAvatar) doctorAvatar.addEventListener("click", () => doctorModal.style.display = "flex");
    if(runnerAvatar) runnerAvatar.addEventListener("click", () => runnerModal.style.display = "flex");

    if(closeDoctor) closeDoctor.addEventListener("click", () => doctorModal.style.display = "none");
    if(closeRunner) closeRunner.addEventListener("click", () => runnerModal.style.display = "none");
    if(closeAIDoctor) closeAIDoctor.addEventListener("click", () => aiDoctorChatModal.style.display = "none");
    if(closeHealthTips) closeHealthTips.addEventListener("click", () => healthTipsModal.style.display = "none");
    
    if(chatWithAIDoctorBtn) chatWithAIDoctorBtn.addEventListener("click", () => {
        if(doctorModal) doctorModal.style.display = "none";
        if(aiDoctorChatModal) aiDoctorChatModal.style.display = "flex";
    });
    
    if(healthTipsBtn) healthTipsBtn.addEventListener("click", () => {
        if(doctorModal) doctorModal.style.display = "none";
        if(healthTipsModal) healthTipsModal.style.display = "flex";
    });

    window.addEventListener("click", (event) => {
        if (event.target === doctorModal) doctorModal.style.display = "none";
        if (event.target === runnerModal) runnerModal.style.display = "none";
        if (event.target === aiDoctorChatModal) aiDoctorChatModal.style.display = "none";
        if (event.target === healthTipsModal) healthTipsModal.style.display = "none";
    });
    
    // =============================
    // AI CHAT INTERACTIVITY LOGIC
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
                if (thinkingBubble) chatMessages.removeChild(thinkingBubble);
                const simulatedResponse = `Regarding your query about "${userMessage}", please remember I am an AI assistant. For any real medical advice, consult a qualified doctor.`;
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

}); // <-- This closes the main DOMContentLoaded listener