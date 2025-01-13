
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");


document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("currentyear");
  const lastModified = document.getElementById("lastModified");

  const currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;

  lastModified.textContent = `Last Updated: ${document.lastModified}`;

  
  const courses = [
    { name: "CSE 110", id: "cse110", credits: 2 },
    { name: "WDD 130", id: "wdd130", credits: 2 },
    { name: "CSE 111", id: "cse111", credits: 2 },
    { name: "CSE 210", id: "cse210", credits: 2 },
    { name: "WDD 131", id: "wdd131", credits: 2 },
    { name: "WDD 231", id: "wdd231", credits: 2 },
  ];

  
  const completedCourses = ["cse110", "wdd130", "cse111", "cse210", "wdd131"];

  const courseContainer = document.getElementById("course-container");
  const totalCreditsElement = document.getElementById("total-credits");

  
  function renderCourses(filteredCourses) {
    courseContainer.innerHTML = ""; 
    let totalCredits = 0;

    filteredCourses.forEach((course) => {
      const courseDiv = document.createElement("div");
      courseDiv.className = "course";
      courseDiv.id = course.id;
      courseDiv.textContent = course.name;

      
      if (completedCourses.includes(course.id)) {
        courseDiv.style.backgroundColor = "#8b4513"; 
        courseDiv.style.color = "white"; 
      }

      courseContainer.appendChild(courseDiv);
      totalCredits += course.credits;
    });

    
    totalCreditsElement.textContent = `Total credits: ${totalCredits}`;
  }

  
  renderCourses(courses);

  
  document.getElementById("all").addEventListener("click", () => {
    renderCourses(courses); 
  });

  document.getElementById("cse").addEventListener("click", () => {
    const cseCourses = courses.filter((course) => course.id.startsWith("cse"));
    renderCourses(cseCourses);
  });

  document.getElementById("wdd").addEventListener("click", () => {
    const wddCourses = courses.filter((course) => course.id.startsWith("wdd"));
    renderCourses(wddCourses); 
  });
});


hamburger.addEventListener("click", () => {
  
  if (navLinks.style.display === "flex") {
    navLinks.style.display = "none";
  } else {
    navLinks.style.display = "flex";
    navLinks.style.flexDirection = "column"; 
  }

  
  hamburger.textContent = hamburger.textContent === "☰" ? "X" : "☰";

  
  hamburger.classList.toggle("active");
});
