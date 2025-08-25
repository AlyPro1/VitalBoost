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
