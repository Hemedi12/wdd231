//hamburgur menu
const hamburger = document.querySelector(".menu-toggle");
const navElement = document.querySelector(".menuLinks");
const navLinks = document.querySelector(".navbar");

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navbar = document.querySelector(".navbar");

  menuToggle.addEventListener("click", function () {
    // Toggle the 'active' class to show or hide the navbar
    navbar.classList.toggle("active");
    menuToggle.style.marginRight = "0";
  });
});

// Add a click event listener to the hamburger button
hamburger.addEventListener("click", () => {
  // Toggle the nav-links between showing and hiding
  if (navLinks.style.display === "flex") {
    navLinks.style.display = "none";
  } else {
    navLinks.style.display = "flex";
    navLinks.style.flexDirection = "column"; // Ensure vertical layout for mobile
    hamburger.style.color = "white";
    navLinks.style.background = "#003f6b";
    navLinks.style.marginTop = "0";
  }

  // Toggle the hamburger icon between '☰' (hamburger) and 'X' (close)
  hamburger.textContent = hamburger.textContent === "☰" ? "X" : "☰";

  // Optionally add/remove an active class to the hamburger for styling purposes
  hamburger.classList.toggle("active");
});

// Toggle menu for hamburger
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

//year
const year = document.querySelector("#year");
const today = new Date();

year.innerHTML = `<span class='highlight'>${today.getFullYear()}</span>&copy; Charles Hemedi`;

const option = { year: "numeric", month: "long", day: "numeric" };
const lastUpdated = today.toLocaleDateString("en-US", option);

document.getElementById(
  "last-update"
).textContent = `Last Update ${lastUpdated}`;
