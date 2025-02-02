const currentYearSpan = document.getElementById("currentyear");
const currentYear = new Date().getFullYear();
const lastModification = document.getElementById("lastModified");
let oLastModif = new Date(document.lastModified);
const hamburger = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("nav ul");

currentYearSpan.textContent = currentYear;

document.addEventListener("DOMContentLoaded", function () {
  const lastModifiedElement = document.getElementById("lastModified");
  const lastModifiedDate = new Date(document.lastModified);
  lastModifiedElement.textContent =
    "Last modified: " + formatDate(lastModifiedDate);
});

function formatDate(date) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleDateString("en-US", options);
}

async function loadWeather() {
  const apiKey = "5905ae91e1231e40f69bbe8513baa58c";
  const city = "Aurich";
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  const response = await fetch(weatherURL);
  const data = await response.json();

  const temperature = Math.round(data.main.temp);
  const description = data.weather
    .map((event) => event.description.toUpperCase())
    .join(", ");
  const forecastHTML = await getForecast(apiKey, city);

  document.getElementById("weather-info").innerHTML = `
        <p>Temperature: ${temperature}°F</p>
        <p>Conditions: ${description}</p>
        <p>3-day Forecast: ${forecastHTML}</p>
    `;
}

async function getForecast(apiKey, city) {
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
  const response = await fetch(forecastURL);
  const data = await response.json();

  // Get today and the next two days' temperatures
  const forecastData = data.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  ); // Get data for midday each day

  // Get day names (today + next two days)
  const today = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Generate HTML for each day's forecast
  const forecastHTML = forecastData.slice(0, 3).map((dayData, index) => {
    const dayName = days[(today.getDay() + index) % 7]; // Get current day and next two days
    return `<p>${dayName}: ${Math.round(dayData.main.temp_max)}°F</p>`;
  });

  return forecastHTML.join("");
}

loadWeather();

async function loadSpotlights() {
  try {
    const response = await fetch("./data/members.json");
    const members = await response.json();

    // Filter members
    const goldAndSilver = members.filter(
      (member) => member.membershipLevel === 3 || member.membershipLevel === 2
    );

    // Select 2-3 random members
    const randomMembers = shuffleArray(goldAndSilver).slice(0, 3);

    const spotlightContainer = document.getElementById("spotlight-container");
    spotlightContainer.innerHTML = randomMembers
      .map(
        (member) => `
            <div class="spotlight-item">
                <img src="./images/${member.icon}" alt="${member.name} logo">
                <h3>${member.name}</h3>
                <p>Phone: ${member.phone}</p>
                <p>${member.additionalInfo}</p>
                <a href="${member.website}">${member.website}</a>
            </div>
        `
      )
      .join("");
  } catch (error) {
    console.error("Error loading spotlights:", error);
  }
}

function shuffleArray(array) {
  return array.sort(() => 0.5 - Math.random());
}

loadSpotlights();

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navbar = document.querySelector("#navbar");

  menuToggle.addEventListener("click", function () {
    // Toggle the 'active' class to show or hide the navbar
    navbar.classList.toggle("active");
  });
});

async function loadEvents() {
  try {
    const response = await fetch("./data/events.json"); // Path to your events.json
    const events = await response.json();

    const eventsContainer = document.getElementById("events-container");

    // Generate HTML for each event
    const eventsHTML = events
      .map(
        (event) => `
        <div class="event-item">
          <h3>${event.title}</h3>
          <p><strong>Date:</strong> ${formatDate(event.date)}</p>
          <p><strong>Location:</strong> ${event.location}</p>
        </div>
      `
      )
      .join("");

    eventsContainer.innerHTML = eventsHTML;
  } catch (error) {
    console.error("Error loading events:", error);
  }
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}
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

// Call the function to load events
loadEvents();
