let year = new Date().getFullYear();
let month = new Date().getMonth();

function openPopup() {
  document.getElementById("overlay").classList.add("active");
}

function closePopup() {
  document.getElementById("overlay").classList.remove("active");
}

document.getElementById("overlay").addEventListener("click", (e) => {
  if (e.target.id === "overlay") {
    closePopup();
  }
});

function renderCalendar() {
  const label = document.getElementById("month-label");
  const grid = document.getElementById("cal-grid");

  label.textContent = `${year}/ ${month + 1}`;

  const days = grid.querySelectorAll(".day");
  days.forEach((d) => d.remove());

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    empty.className = "day empty";
    grid.appendChild(empty);
  }

  for (let d = 1; d <= totalDays; d++) {
    const cell = document.createElement("div");
    cell.className = "day";
    cell.textContent = d;

    if (
      d === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      cell.classList.add("today");
    }

    cell.addEventListener("click", () => {
      document
        .querySelectorAll(".day.selected")
        .forEach((el) => el.classList.remove("selected"));

      cell.classList.add("selected");
    });
    grid.appendChild(cell);
  }
}

document.getElementById("prev").addEventListener("click", () => {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  renderCalendar();
});

document.getElementById("next").addEventListener("click", () => {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  renderCalendar();
});

renderCalendar();
