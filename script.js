document.addEventListener("DOMContentLoaded", () => {
  // =============================
  // Floating Images Animation
  // =============================
  const floatingElements = document.querySelectorAll(".floating-element");
  floatingElements.forEach((el, index) => {
    let speed = 2 + Math.random() * 2;
    let direction = index % 2 === 0 ? 1 : -1;
    let position = 0;

    function float() {
      position += direction * 0.3;
      if (Math.abs(position) > 15) direction *= -1;
      el.style.transform = `translateY(${position}px)`;
      requestAnimationFrame(float);
    }
    float();
  });

  // =============================
  // Visitor Counter (demo only)
  // =============================
  let visitorCount = localStorage.getItem("visitorCount") || 0;
  visitorCount++;
  localStorage.setItem("visitorCount", visitorCount);
  const visitorDisplay = document.getElementById("counterNumber");
  if (visitorDisplay) visitorDisplay.textContent = visitorCount;

  // =============================
  // Hero Background Carousel
  // =============================
  const slides = document.querySelectorAll(".image-slide");
  let currentIndex = 0;
  const shuffledSlides = Array.from(slides).sort(() => Math.random() - 0.5);

  function rotateSlides() {
    shuffledSlides.forEach(slide => slide.classList.remove("active"));
    shuffledSlides[currentIndex].classList.add("active");
    currentIndex = (currentIndex + 1) % shuffledSlides.length;
  }

  setInterval(rotateSlides, 5000);
  rotateSlides(); // initial display

  // =============================
  // Simple CTA Button Alert (Demo)
  // =============================
  const checkupBtn = document.getElementById("checkupBtn");
  if (checkupBtn) {
    checkupBtn.addEventListener("click", () => {
      alert("Redirecting you to free health checkup!");
    });
  }

  // =============================
  // Modals: Doctor & Runner
  // =============================
  const doctorAvatar = document.getElementById("doctorAvatar");
  const runnerAvatar = document.getElementById("runnerAvatar");

  const doctorModal = document.getElementById("doctorModal");
  const runnerModal = document.getElementById("runnerModal");

  const closeButtons = document.querySelectorAll(".modal-close");

  if (doctorAvatar && doctorModal) {
    doctorAvatar.addEventListener("click", () => {
      doctorModal.style.display = "block";
    });
  }

  if (runnerAvatar && runnerModal) {
    runnerAvatar.addEventListener("click", () => {
      runnerModal.style.display = "block";
    });
  }

  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      if (doctorModal) doctorModal.style.display = "none";
      if (runnerModal) runnerModal.style.display = "none";
    });
  });

  // Close modal if clicked outside
  window.addEventListener("click", e => {
    if (e.target === doctorModal) doctorModal.style.display = "none";
    if (e.target === runnerModal) runnerModal.style.display = "none";
  });
});
