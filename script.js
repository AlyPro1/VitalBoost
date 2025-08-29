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

// Doctor Modal
const doctorModal = document.getElementById("doctorModal");
const doctorAvatar = document.getElementById("doctorAvatar");
const closeDoctor = document.getElementById("closeDoctor");

doctorAvatar.addEventListener("click", () => {
  doctorModal.style.display = "block";
});
closeDoctor.addEventListener("click", () => {
  doctorModal.style.display = "none";
});

// Runner Modal
const runnerModal = document.getElementById("runnerModal");
const runnerAvatar = document.getElementById("runnerAvatar");
const closeRunner = document.getElementById("closeRunner");

runnerAvatar.addEventListener("click", () => {
  runnerModal.style.display = "block";
});
closeRunner.addEventListener("click", () => {
  runnerModal.style.display = "none";
});

// Close modal if clicked outside
window.addEventListener("click", (e) => {
  if (e.target === doctorModal) doctorModal.style.display = "none";
  if (e.target === runnerModal) runnerModal.style.display = "none";
});
// Select avatars
const doctorAvatar = document.getElementById("doctorAvatar");
const runnerAvatar = document.getElementById("runnerAvatar");

// Select modals
const doctorModal = document.getElementById("doctorModal");
const runnerModal = document.getElementById("runnerModal");

// Select close buttons
const closeDoctor = document.getElementById("closeDoctor");
const closeRunner = document.getElementById("closeRunner");

// Open doctor modal
if (doctorAvatar) {
  doctorAvatar.addEventListener("click", () => {
    doctorModal.style.display = "flex";
  });
}

// Open runner modal
if (runnerAvatar) {
  runnerAvatar.addEventListener("click", () => {
    runnerModal.style.display = "flex";
  });
}

// Close doctor modal
if (closeDoctor) {
  closeDoctor.addEventListener("click", () => {
    doctorModal.style.display = "none";
  });
}

// Close runner modal
if (closeRunner) {
  closeRunner.addEventListener("click", () => {
    runnerModal.style.display = "none";
  });
}

// Close modal when clicking outside container
window.addEventListener("click", (event) => {
  if (event.target === doctorModal) {
    doctorModal.style.display = "none";
  }
  if (event.target === runnerModal) {
    runnerModal.style.display = "none";
  }
});
