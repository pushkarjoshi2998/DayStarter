const today   = new Date();
let   current = new Date(today.getFullYear(), today.getMonth(), 1);

const monthsname = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const dayNames = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function renderCalendar() {
  const year        = current.getFullYear();
  const month       = current.getMonth();
  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  document.getElementById("cal-month-label").textContent = `${monthsname[month]} ${year}`;

  const grid = document.getElementById("calendar-grid");
  grid.innerHTML = "";

  // day name headers
  dayNames.forEach(name => {
    const cell = document.createElement("div");
    cell.className   = "cal-day-name";
    cell.textContent = name;
    grid.appendChild(cell);
  });

  // empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    empty.className = "cal-day empty";
    grid.appendChild(empty);
  }

  // actual day numbers
  for (let d = 1; d <= daysInMonth; d++) {
    const cell = document.createElement("div");
    cell.className   = "cal-day";
    cell.textContent = d;

    const isToday =
      d === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();

    if (isToday) cell.classList.add("today");
    grid.appendChild(cell);
  }
}

document.getElementById("cal-prev").addEventListener("click", () => {
  current.setMonth(current.getMonth() - 1);
  renderCalendar();
});

document.getElementById("cal-next").addEventListener("click", () => {
  current.setMonth(current.getMonth() + 1);
  renderCalendar();
});

renderCalendar();