// ------------------------- Doctor Chat -------------------------
const doctorAvatar = document.getElementById("doctorAvatar");
const doctorModal = document.getElementById("doctorModal");
const closeDoctorModal = document.getElementById("closeDoctorModal");

doctorAvatar.addEventListener("click", () => {
  doctorModal.style.display = "flex";
});

closeDoctorModal.addEventListener("click", () => {
  doctorModal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === doctorModal) {
    doctorModal.style.display = "none";
  }
});

// ------------------------- Upload Symptoms -------------------------
const uploadSymptomsBtn = document.getElementById("uploadSymptomsBtn");
const symptomsModal = document.getElementById("symptomsModal");
const closeSymptomsModal = document.getElementById("closeSymptomsModal");

uploadSymptomsBtn.addEventListener("click", () => {
  symptomsModal.style.display = "flex";
});

closeSymptomsModal.addEventListener("click", () => {
  symptomsModal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === symptomsModal) {
    symptomsModal.style.display = "none";
  }
});

// ------------------------- Health Tips -------------------------
const healthTipsBtn = document.getElementById("healthTipsBtn");
const healthTipsModal = document.getElementById("healthTipsModal");
const closeHealthTipsModal = document.getElementById("closeHealthTipsModal");

healthTipsBtn.addEventListener("click", () => {
  healthTipsModal.style.display = "flex";
});

closeHealthTipsModal.addEventListener("click", () => {
  healthTipsModal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === healthTipsModal) {
    healthTipsModal.style.display = "none";
  }
});

// ------------------------- Runner Avatar -------------------------
const runnerAvatar = document.getElementById("runnerAvatar");

runnerAvatar.addEventListener("click", () => {
  alert("Runner avatar clicked! Future functionality can go here.");
});
