// ============================
// Visitor Counter
// ============================
document.addEventListener("DOMContentLoaded", () => {
  let count = localStorage.getItem("visitorCount") || 0;
  count++;
  localStorage.setItem("visitorCount", count);
  const visitorElement = document.getElementById("visitor-count");
  if (visitorElement) {
    visitorElement.textContent = count;
  }
});

// ============================
// Rotating / Flipping Images
// ============================
let currentIndex = 0;
const images = document.querySelectorAll(".rotating-image");

function rotateImages() {
  images.forEach((img, index) => {
    img.style.display = index === currentIndex ? "block" : "none";
  });
  currentIndex = (currentIndex + 1) % images.length;
}

if (images.length > 0) {
  setInterval(rotateImages, 3000); // Change image every 3s
  rotateImages(); // Start immediately
}

// ============================
// Modal Open / Close
// ============================
const modal = document.getElementById("myModal");
const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("closeModal");

// Open modal
function openModal() {
  if (modal) {
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent scroll
  }
}

// Close modal
function closeModal() {
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Restore scroll
  }
}

// Event Listeners
if (openBtn) openBtn.addEventListener("click", openModal);
if (closeBtn) closeBtn.addEventListener("click", closeModal);

// Close modal if clicked outside content
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});


