// Select the hamburger button and the nav-links container
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

// JavaScript to populate the footer with the current year and last modified date
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("currentyear");
  const lastModified = document.getElementById("lastModified");

  const currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;

  lastModified.textContent = `Last Updated: ${document.lastModified}`;

  // Dynamically populate the course list and calculate credits
  const courses = [
    { name: "CSE 110", id: "cse110", credits: 2 },
    { name: "WDD 130", id: "wdd130", credits: 2 },
    { name: "CSE 111", id: "cse111", credits: 2 },
    { name: "CSE 210", id: "cse210", credits: 2 },
    { name: "WDD 131", id: "wdd131", credits: 2 },
    { name: "WDD 231", id: "wdd231", credits: 2 },
  ];

  // List of completed course IDs
  const completedCourses = ["cse110", "wdd130", "cse111", "cse210", "wdd131"];

  const courseContainer = document.getElementById("course-container");
  const totalCreditsElement = document.getElementById("total-credits");

  // Function to render courses
  function renderCourses(filteredCourses) {
    courseContainer.innerHTML = ""; // Clear previous courses
    let totalCredits = 0;

    filteredCourses.forEach((course) => {
      const courseDiv = document.createElement("div");
      courseDiv.className = "course";
      courseDiv.id = course.id;
      courseDiv.textContent = course.name;

      // Check if the course is completed and apply styling
      if (completedCourses.includes(course.id)) {
        courseDiv.style.backgroundColor = "#8b4513"; // Set background color for completed courses
        courseDiv.style.color = "white"; // Optional: change text color for contrast
      }

      courseContainer.appendChild(courseDiv);
      totalCredits += course.credits;
    });

    // Display total credits
    totalCreditsElement.textContent = `Total credits: ${totalCredits}`;
  }

  // Initially render all courses
  renderCourses(courses);

  // Course filter buttons
  document.getElementById("all").addEventListener("click", () => {
    renderCourses(courses); // Show all courses
  });

  document.getElementById("cse").addEventListener("click", () => {
    const cseCourses = courses.filter((course) => course.id.startsWith("cse"));
    renderCourses(cseCourses); // Show only CSE courses and recalculate credits
  });

  document.getElementById("wdd").addEventListener("click", () => {
    const wddCourses = courses.filter((course) => course.id.startsWith("wdd"));
    renderCourses(wddCourses); // Show only WDD courses and recalculate credits
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
  }

  // Toggle the hamburger icon between '☰' (hamburger) and 'X' (close)
  hamburger.textContent = hamburger.textContent === "☰" ? "X" : "☰";

  // Optionally add/remove an active class to the hamburger for styling purposes
  hamburger.classList.toggle("active");
});
