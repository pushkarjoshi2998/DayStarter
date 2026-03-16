const clockEl = document.getElementById("clock");
const dateEl = document.getElementById("date");
const greetSub = document.getElementById("greeting-sub");

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function pad(n) { return String(n).padStart(2, "0"); }

function applyTheme(hour) {
  const body = document.body;
  body.classList.remove("theme-noon", "theme-evening", "theme-night");
  if (hour >= 5 && hour < 12) {
    greetSub.textContent = "Good Morning";
  } else if (hour >= 12 && hour < 17) {
    greetSub.textContent = "Good Afternoon";
    body.classList.add("theme-noon");
  } else if (hour >= 17 && hour < 20) {
    greetSub.textContent = "Good Evening";
    body.classList.add("theme-evening");
  } else {
    greetSub.textContent = "Good Night";
    body.classList.add("theme-night");
  }
}

function tick() {
  const now = new Date();
  const h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();

  clockEl.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
  dateEl.textContent = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

  // only re-apply theme on minute boundaries to avoid flicker
  if (s === 0 || !document.body.dataset.themeSet) {
    applyTheme(h);
    document.body.dataset.themeSet = "1";
  }
}

tick();
setInterval(tick, 1000);
