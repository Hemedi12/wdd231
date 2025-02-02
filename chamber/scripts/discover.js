async function displayList() {
  let responce = await fetch("./data/members.json");
  let data = await responce.json();
  // console.log(data.companies);
  printlist(data);
}
const peopleDiv = document.querySelector("#companiesOnBoard");
const printlist = (d) => {
  console.log(d);
  d.forEach((element) => {
    let ul = document.createElement("ul");
    let li = document.createElement("li");
    let a = document.createElement("a");

    a.innerHTML = `${element.name}`;
    a.href = `#`;
    li.appendChild(a);
    ul.appendChild(li);
    peopleDiv.appendChild(ul);
  });
};

displayList();

const monthYearElement = document.getElementById("month-year");
const daysElement = document.getElementById("days");
const prevMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");

let currentDate = new Date();

function renderCalendar() {
  // Clear previous calendar
  daysElement.innerHTML = "";

  // Set month and year in header
  const options = { month: "long", year: "numeric" };
  monthYearElement.textContent = currentDate.toLocaleDateString(
    "en-US",
    options
  );

  // Get first and last day of the month
  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();
  const lastDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  // Populate days
  for (let i = 0; i < firstDay; i++) {
    daysElement.innerHTML += `<div></div>`; // Blank spaces before first day
  }
  for (let i = 1; i <= lastDate; i++) {
    const dayElement = document.createElement("div");
    dayElement.textContent = i;
    if (
      i === new Date().getDate() &&
      currentDate.getMonth() === new Date().getMonth() &&
      currentDate.getFullYear() === new Date().getFullYear()
    ) {
      dayElement.classList.add("today"); // Highlight current day
    }
    daysElement.appendChild(dayElement);
  }
}

// Previous and next month navigation
prevMonthButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextMonthButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

// Initial render
renderCalendar();

const cardDiscover = document.querySelector("#main");
async function getPics() {
  const response = await fetch("./data/form.json");
  const data = await response.json();
  console.log(data);
  cardsPics(data);
}

const cardsPics = (d) => {
  console.log(d);
  d.forEach((element) => {
    let cardImage = document.createElement("img");
    cardImage.classList.add("busPic");
    cardImage.loading = "lazy";
    cardImage.src = `${element.image}`;

    cardDiscover.appendChild(cardImage);
  });
};

getPics();

const now = new Date();
const lastVisit = localStorage.getItem("lastVisit");
let message = "";
if (lastVisit) {
  const lastVisitDate = new Date(lastVisit);
  const timeDifference = now - lastVisitDate;
  const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (dayDifference < 1) {
    message = "welcome back! You visited earlier today.";
  } else if (dayDifference === 1) {
    message = "Welcome back! You last visited yesterday.";
  } else {
    message = `Welcome back! It's been ${daysDifference} days since your last visit.`;
  }
} else {
  message = "Welcome to your first visit!";
}
