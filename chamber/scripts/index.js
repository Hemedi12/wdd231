const currentYearSpan = document.getElementById("currentyear");
const currentYear = new Date().getFullYear();
const lastModification = document.getElementById("lastModified");
let oLastModif = new Date(document.lastModified);

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

document.addEventListener("DOMContentLoaded", async () => {
  const membersContainer = document.getElementById("membersContainer");
  const toggleViewBtn = document.getElementById("toggleView");

  // Fetch the data from the JSON file
  async function fetchMembers() {
    const response = await fetch("./data/members.json");
    const members = await response.json();
    return members;
  }

  // Render the members on the page
  function renderMembers(members, isGridView) {
    membersContainer.innerHTML = ""; // Clear container
    membersContainer.className = isGridView ? "grid-view" : "list-view";

    members.forEach((member) => {
      const memberCard = document.createElement("div");
      memberCard.classList.add("member-card");

      memberCard.innerHTML = `
                <img src="./images/${member.icon}" alt="${member.name}">
                <h2>${member.name}</h2>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p><a href="${member.website}" target="_blank">${member.website}</a></p>
                <p>Membership Level: ${member.membershipLevel}</p>
                <p>${member.additionalInfo}</p>
            `;
      membersContainer.appendChild(memberCard);
    });
  }

  // Initial render in grid view
  const members = await fetchMembers();
  let isGridView = true;
  renderMembers(members, isGridView);

  // Toggle between grid and list view
  toggleViewBtn.addEventListener("click", () => {
    isGridView = !isGridView;
    renderMembers(members, isGridView);
  });
});
