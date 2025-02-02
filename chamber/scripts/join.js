// Automatically set the timestamp
document.getElementById("timestamp").value = new Date().toISOString();

// Modal functionality
const modals = document.querySelectorAll(".modal"); // All modals
const modalLinks = document.querySelectorAll(".modal-link"); // All links that open modals
const closeButtons = document.querySelectorAll(".close"); // Close buttons

// Open a specific modal
function openModal(modalId) {
  const modal = document.querySelector(`#${modalId}`); // Select the modal by ID
  if (modal) {
    closeModals(); // Close any open modals
    modal.style.display = "block";
    document.body.classList.add("modal-open"); // Disable background clicking
  } else {
    console.error("Modal not found!"); // Debugging message
  }
}

// Close all modals
function closeModals() {
  modals.forEach((modal) => {
    modal.style.display = "none";
  });
  document.body.classList.remove("modal-open"); // Re-enable background clicking
}

// Attach event listeners to membership links
modalLinks.forEach((link) => {
  const modalId = link.getAttribute("data-modal"); // Get the associated modal ID from data-modal attribute
  link.addEventListener("click", (e) => {
    e.preventDefault();
    openModal(modalId); // Open the specific modal
  });
});

// Attach event listeners to close buttons for closing modals
closeButtons.forEach((btn) => {
  btn.addEventListener("click", closeModals);
});

// Close modal when clicking outside modal content
window.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal")) {
    closeModals();
  }
});

// Hamburger menu toggle functionality
const hamburger = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#navbar");

// Toggle the menu visibility
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  hamburger.textContent = hamburger.textContent === "☰" ? "X" : "☰"; // Change icon
  hamburger.style.color = "white"; // Keep the icon color consistent
});

// Join Chamber Modal functionality
const joinModal = document.getElementById("joinModal"); // Join modal
const openJoinModalBtn = document.getElementById("openModal"); // Join button

// Open the join modal when the button is clicked
openJoinModalBtn.addEventListener("click", () => {
  openModal("joinModal"); // Open the join modal
});

// Close the join modal when its close button is clicked
const closeJoinModalBtn = joinModal.querySelector(".close"); // Close button for the join modal
closeJoinModalBtn.addEventListener("click", closeModals);

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navbar = document.querySelector("#navbar");

  menuToggle.addEventListener("click", function () {
    // Toggle the 'active' class to show or hide the navbar
    navbar.classList.toggle("active");
  });
});
