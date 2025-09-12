document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const quitSmokingBtn = document.getElementById('quitSmokingBtn');
  const quitSmokingModal = document.getElementById('quitSmokingModal');
  const closeQuitSmokingModal = document.getElementById('closeQuitSmokingModal');

  // Calculator elements (may be inside modal)
  const cigarettesPerDayInput = document.getElementById('cigarettesPerDay');
  const costPerPackInput = document.getElementById('costPerPack');
  const cigarettesPerPackInput = document.getElementById('cigarettesPerPack');
  const dailySavingsDisplay = document.getElementById('dailySavings');
  const weeklySavingsDisplay = document.getElementById('weeklySavings');
  const yearlySavingsDisplay = document.getElementById('yearlySavings');

  // Progress circle elements (may be inside modal)
  const circleElement = document.querySelector('.money-saved-meter .circle');
  const circleText = document.querySelector('.money-saved-meter .circle-text');

  // Butterfly container
  const butterflyContainer = document.querySelector('.butterfly-effect');

  // Dynamic <style> for runtime keyframes
  let dynamicStyleEl = document.getElementById('qs-dynamic-styles');
  if (!dynamicStyleEl) {
    dynamicStyleEl = document.createElement('style');
    dynamicStyleEl.id = 'qs-dynamic-styles';
    document.head.appendChild(dynamicStyleEl);
  }
  const dynamicSheet = dynamicStyleEl.sheet;

  // Safe helpers
  function safeText(el, value) { if (el) el.textContent = value; }

  // Calculator logic
  function calculateSavings() {
    if (!dailySavingsDisplay || !weeklySavingsDisplay || !yearlySavingsDisplay) return;

    const cigarettesPerDay = parseFloat(cigarettesPerDayInput?.value) || 0;
    const costPerPack = parseFloat(costPerPackInput?.value) || 0;
    const cigarettesPerPack = parseFloat(cigarettesPerPackInput?.value) || 1;

    if (cigarettesPerDay <= 0 || costPerPack <= 0 || cigarettesPerPack <= 0) {
      safeText(dailySavingsDisplay, '$0.00');
      safeText(weeklySavingsDisplay, '$0.00');
      safeText(yearlySavingsDisplay, '$0.00');
      return;
    }

    const costPerCig = costPerPack / cigarettesPerPack;
    const daily = cigarettesPerDay * costPerCig;
    const weekly = daily * 7;
    const yearly = daily * 365;

    safeText(dailySavingsDisplay, `$${daily.toFixed(2)}`);
    safeText(weeklySavingsDisplay, `$${weekly.toFixed(2)}`);
    safeText(yearlySavingsDisplay, `$${yearly.toFixed(2)}`);
  }

  // Wire calculator inputs (guarded)
  try {
    if (cigarettesPerDayInput) cigarettesPerDayInput.addEventListener('input', calculateSavings);
    if (costPerPackInput) costPerPackInput.addEventListener('input', calculateSavings);
    if (cigarettesPerPackInput) cigarettesPerPackInput.addEventListener('input', calculateSavings);
  } catch (err) {
    console.warn('Calculator binding error', err);
  }

  // Initial calculation attempt
  calculateSavings();

  // Modal open/close logic (guarded & idempotent)
  if (quitSmokingBtn && quitSmokingModal && closeQuitSmokingModal) {
    quitSmokingBtn.addEventListener('click', () => {
      try {
        // open modal
        quitSmokingModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        // refresh visuals
        calculateSavings();
        updateSmokeFreeProgress(15); // example, replace with real value later
        // start butterflies (safe)
        generateButterfliesSafely();
      } catch (err) {
        console.error('Error opening Quit Smoking modal:', err);
      }
    });

    closeQuitSmokingModal.addEventListener('click', closeModalSafely);

    // Close when clicking outside the modal content
    quitSmokingModal.addEventListener('click', (event) => {
      if (event.target === quitSmokingModal) closeModalSafely();
    });

    // Close with Escape key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && quitSmokingModal.classList.contains('active')) {
        closeModalSafely();
      }
    });
  } else {
    console.warn('Quit smoking elements not found (quitSmokingBtn or quitSmokingModal).');
  }

  function closeModalSafely() {
    try {
      quitSmokingModal.classList.remove('active');
      document.body.style.overflow = '';
      clearButterflies();
    } catch (err) {
      console.error('Error closing Quit Smoking modal:', err);
    }
  }

  // Progress circle updater (safe)
  function updateSmokeFreeProgress(days) {
    if (!circleElement || !circleText) return;
    const radius = 15.9155; // SVG radius used
    const circumference = 2 * Math.PI * radius;
    const maxDays = 30;
    const progress = Math.max(0, Math.min(1, days / maxDays));
    const dash = (progress * circumference).toFixed(2);
    circleElement.style.strokeDasharray = `${dash} ${circumference}`;
    circleText.textContent = Math.round(days);
  }

  // ------------------------------
  // Butterflies: robust generation
  // ------------------------------
  let butterflyCounter = 0;
  let activeButterflies = [];

  function createButterfly() {
    if (!butterflyContainer) return null;

    const idSuffix = `qsfly_${Date.now().toString(36)}_${Math.floor(Math.random()*10000)}`;
    const keyframeName = `qsFly_${idSuffix}`;

    // define unique keyframes to avoid collisions and avoid writing into cross-origin sheets
    const p1x = Math.round((Math.random() * 120 - 60)); // px
    const p1y = Math.round((Math.random() * 120 - 60));
    const p2x = Math.round((Math.random() * 120 - 60));
    const p2y = Math.round((Math.random() * 120 - 60));
    const duration = (Math.random() * 8 + 6).toFixed(2) + 's';
    const rotate1 = Math.round(Math.random() * 360);
    const rotate2 = Math.round(Math.random() * 360);

    const frames = `
      @keyframes ${keyframeName} {
        0% { transform: translate(0px, 0px) rotate(0deg); }
        25% { transform: translate(${p1x}px, ${p1y}px) rotate(${rotate1}deg); }
        50% { transform: translate(${p2x}px, ${p2y}px) rotate(${rotate2}deg); }
        75% { transform: translate(${p1x/2}px, ${p1y/2}px) rotate(${rotate1/2}deg); }
        100% { transform: translate(0px, 0px) rotate(0deg); }
      }
    `;
    try {
      // append keyframes to our dedicated dynamic style element
      dynamicSheet.insertRule(frames, dynamicSheet.cssRules.length);
    } catch (err) {
      // If insertRule fails (very rare), log and continue (but animation won't be unique)
      console.warn('Could not insert keyframes for butterfly', err);
    }

    // create DOM node
    const butterfly = document.createElement('div');
    butterfly.className = 'qs-butterfly';
    butterfly.style.width = `${Math.random() * 22 + 12}px`;
    butterfly.style.height = butterfly.style.width;
    butterfly.style.position = 'absolute';
    // Use percentages relative to container instead of vw/vh
    butterfly.style.left = `${Math.random() * 90}%`;
    butterfly.style.top = `${Math.random() * 80}%`;
    butterfly.style.opacity = (Math.random() * 0.6 + 0.3).toString();
    butterfly.style.zIndex = 0;
    butterfly.style.pointerEvents = 'none';
    butterfly.style.transformOrigin = 'center center';
    butterfly.style.animation = `${keyframeName} ${duration} infinite ease-in-out`;
    // simple visual (svg-like) — you can replace with an actual SVG background later
    butterfly.innerHTML = `<svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true"><path d="M2 12c6-4 11 1 11 1s5-5 11-1c-3 4-8 4-11 4S5 16 2 12z" fill="rgba(255,255,255,0.8)"/></svg>`;
    butterflyContainer.appendChild(butterfly);

    activeButterflies.push(butterfly);
    butterflyCounter++;
    return butterfly;
  }

  function generateButterfliesSafely() {
    try {
      clearButterflies();
      // create up to 10 butterflies but be conservative on small screens
      const count = window.innerWidth < 640 ? 4 : 8;
      for (let i = 0; i < count; i++) createButterfly();
    } catch (err) {
      console.error('generateButterfliesSafely failed', err);
    }
  }

  function clearButterflies() {
    // remove nodes
    activeButterflies.forEach(b => {
      if (b && b.parentNode) b.parentNode.removeChild(b);
    });
    activeButterflies = [];
  }

  // Expose for debugging from console
  window.__qs = {
    generateButterflies: generateButterfliesSafely,
    clearButterflies,
    calculateSavings,
    updateSmokeFreeProgress
  };

  // Final safety: ensure progress circle uses initial values
  updateSmokeFreeProgress(15);
});
