document.addEventListener('DOMContentLoaded', () => {
  const quitSmokingBtn = document.getElementById('quitSmokingBtn');
  const quitSmokingModal = document.getElementById('quitSmokingModal');
  const closeQuitSmokingModal = document.getElementById('closeQuitSmokingModal');

  // Calculator elements
  const cigarettesPerDayInput = document.getElementById('cigarettesPerDay');
  const costPerPackInput = document.getElementById('costPerPack');
  const cigarettesPerPackInput = document.getElementById('cigarettesPerPack');
  const dailySavingsDisplay = document.getElementById('dailySavings');
  const weeklySavingsDisplay = document.getElementById('weeklySavings');
  const yearlySavingsDisplay = document.getElementById('yearlySavings');

  // Function to calculate savings
  function calculateSavings() {
    const cigarettesPerDay = parseFloat(cigarettesPerDayInput.value) || 0;
    const costPerPack = parseFloat(costPerPackInput.value) || 0;
    const cigarettesPerPack = parseFloat(cigarettesPerPackInput.value) || 1; // Avoid division by zero

    if (cigarettesPerDay <= 0 || costPerPack <= 0 || cigarettesPerPack <= 0) {
      dailySavingsDisplay.textContent = '$0.00';
      weeklySavingsDisplay.textContent = '$0.00';
      yearlySavingsDisplay.textContent = '$0.00';
      return;
    }

    const costPerCigarette = costPerPack / cigarettesPerPack;
    const dailySavings = cigarettesPerDay * costPerCigarette;
    const weeklySavings = dailySavings * 7;
    const yearlySavings = dailySavings * 365;

    dailySavingsDisplay.textContent = `$${dailySavings.toFixed(2)}`;
    weeklySavingsDisplay.textContent = `$${weeklySavings.toFixed(2)}`;
    yearlySavingsDisplay.textContent = `$${yearlySavings.toFixed(2)}`;
  }

  // Add event listeners for calculator inputs
  cigarettesPerDayInput.addEventListener('input', calculateSavings);
  costPerPackInput.addEventListener('input', calculateSavings);
  cigarettesPerPackInput.addEventListener('input', calculateSavings);

  // Initial calculation when modal opens or page loads
  calculateSavings();

  // Modal open/close logic
  if (quitSmokingBtn && quitSmokingModal && closeQuitSmokingModal) {
    quitSmokingBtn.addEventListener('click', () => {
      quitSmokingModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      generateButterflies(); // Start cinematic effects
    });

    closeQuitSmokingModal.addEventListener('click', () => {
      quitSmokingModal.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
      clearButterflies(); // Stop cinematic effects
    });

    // Close when clicking outside the modal content
    quitSmokingModal.addEventListener('click', (event) => {
      if (event.target === quitSmokingModal) {
        quitSmokingModal.classList.remove('active');
        document.body.style.overflow = '';
        clearButterflies();
      }
    });

    // Close with Escape key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && quitSmokingModal.classList.contains('active')) {
        quitSmokingModal.classList.remove('active');
        document.body.style.overflow = '';
        clearButterflies();
      }
    });
  }

  // Cinematic Butterflies (JS for dynamic generation and movement)
  const butterflyContainer = document.querySelector('.butterfly-effect');
  let butterflyIntervals = [];

  function createButterfly() {
    const butterfly = document.createElement('div');
    butterfly.className = 'butterfly';
    butterfly.style.width = `${Math.random() * 20 + 10}px`; // Random size
    butterfly.style.height = butterfly.style.width;
    butterfly.style.background = `hsl(${Math.random() * 360}, 70%, 70%)`; // Random color
    butterfly.style.borderRadius = '50%';
    butterfly.style.position = 'absolute';
    butterfly.style.left = `${Math.random() * 100}vw`;
    butterfly.style.top = `${Math.random() * 100}vh`;
    butterfly.style.opacity = Math.random() * 0.5 + 0.3;
    butterfly.style.filter = 'blur(1px)';
    butterfly.style.animation = `fly ${Math.random() * 10 + 5}s infinite alternate ease-in-out`;
    butterflyContainer.appendChild(butterfly);

    // Define keyframes dynamically for each butterfly
    const styleSheet = document.styleSheets[0];
    const flyKeyframes = `@keyframes fly {
      0% { transform: translate(0, 0) rotate(0deg); }
      25% { transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(${Math.random() * 360}deg); }
      50% { transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(${Math.random() * 360}deg); }
      75% { transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(${Math.random() * 360}deg); }
      100% { transform: translate(0, 0) rotate(0deg); }
    }`;
    styleSheet.insertRule(flyKeyframes, styleSheet.cssRules.length);

    return butterfly;
  }

  function generateButterflies() {
    clearButterflies(); // Clear any existing butterflies first
    for (let i = 0; i < 10; i++) { // Generate 10 butterflies
      const butterfly = createButterfly();
      // Store interval to remove later if needed, though CSS animation handles movement
      // For more complex JS-driven movement, an interval per butterfly would be needed.
    }
  }

  function clearButterflies() {
    butterflyIntervals.forEach(interval => clearInterval(interval));
    butterflyIntervals = [];
    while (butterflyContainer.firstChild) {
      butterflyContainer.removeChild(butterflyContainer.firstChild);
    }
  }

  // Example of how to update progress circle (for "Smoke Free Days")
  // You would integrate this with your actual data
  function updateSmokeFreeProgress(days) {
    const circle = document.querySelector('.money-saved-meter .circle');
    const circleText = document.querySelector('.money-saved-meter .circle-text');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    const maxDays = 30; // Example max days for 100% progress
    const progress = (days / maxDays) * 100;

    circle.style.strokeDasharray = `${(progress / 100) * circumference} ${circumference}`;
    circleText.textContent = days;
  }

  // Call this function with actual smoke-free days
  updateSmokeFreeProgress(15); // Example: 15 smoke-free days
});
