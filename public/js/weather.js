// Fetches weather from your Express backend (which calls OpenWeatherMap)

const weatherIcons = {
  "clear sky": "☀️", "few clouds": "🌤️", "scattered clouds": "⛅",
  "broken clouds": "☁️", "overcast clouds": "☁️",
  "light rain": "🌦️", "moderate rain": "🌧️", "heavy intensity rain": "🌧️",
  "thunderstorm": "⛈️", "snow": "❄️", "mist": "🌫️", "haze": "🌫️",
  "fog": "🌫️", "drizzle": "🌦️",
};

function getWeatherIcon(desc) {
  const d = desc.toLowerCase();
  for (const [key, icon] of Object.entries(weatherIcons)) {
    if (d.includes(key)) return icon;
  }
  return "🌡️";
}

const weatherStyles = {
  rain: { bg: "rgba(44, 62, 80, 0.6)", border: "rgba(91,154,181,0.4)", accent: "#5b9ab5", emoji: "🌧️" },
  storm: { bg: "rgba(26, 26, 46, 0.7)", border: "rgba(124,92,191,0.4)", accent: "#7c5cbf", emoji: "⛈️" },
  clear: { bg: "rgba(249,212,35, 0.25)", border: "rgba(232,93,4,0.4)", accent: "#e85d04", emoji: "☀️" },
  cloud: { bg: "rgba(189,195,199,0.3)", border: "rgba(84,110,122,0.4)", accent: "#546e7a", emoji: "☁️" },
  snow: { bg: "rgba(174,214,241,0.3)", border: "rgba(41,128,185,0.4)", accent: "#2980b9", emoji: "❄️" },
  mist: { bg: "rgba(200,200,200,0.2)", border: "rgba(150,150,150,0.3)", accent: "#888", emoji: "🌫️" },
};

function applyWeatherTheme(main) {
  const widget = document.getElementById("widget-weather");
  const m = main.toLowerCase();

  let style = null;
  if (m.includes("rain") || m.includes("drizzle")) style = weatherStyles.rain;
  else if (m.includes("thunder") || m.includes("storm")) style = weatherStyles.storm;
  else if (m.includes("clear")) style = weatherStyles.clear;
  else if (m.includes("cloud")) style = weatherStyles.cloud;
  else if (m.includes("snow")) style = weatherStyles.snow;
  else if (m.includes("mist") || m.includes("haze") || m.includes("fog")) style = weatherStyles.mist;

  if (!style) return; // no match, keep default glass look

  widget.style.background = style.bg;
  widget.style.borderColor = style.border;
  widget.style.transition = "background 0.8s ease, border-color 0.8s ease";

  // accent the temperature color
  document.getElementById("weather-temp").style.color = style.accent;

  widget.classList.remove("sunny", "rainy");
  if (m.includes("clear")) widget.classList.add("sunny");
  if (m.includes("rain") || m.includes("drizzle")) widget.classList.add("rainy");
}

async function fetchWeather(lat, lon) {
  try {
    const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Weather fetch failed");

    document.getElementById("weather-icon").textContent = getWeatherIcon(data.description);
    document.getElementById("weather-temp").textContent = `${Math.round(data.temp)}°C`;
    document.getElementById("weather-desc").textContent = data.description;
    document.getElementById("weather-location").textContent = `📍 ${data.city}, ${data.country}`;
    document.getElementById("weather-humidity").textContent = `💧 ${data.humidity}%`;
    document.getElementById("weather-wind").textContent = `💨 ${Math.round(data.wind)} km/h`;

    applyWeatherTheme(data.main);
  } catch (err) {
    document.getElementById("weather-desc").textContent = "Unable to fetch weather";
    console.error("Weather error:", err);
  }
}

function initWeather() {
  if (!navigator.geolocation) {
    document.getElementById("weather-location").textContent = "📍 Geolocation not supported";
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
    () => {
      // fallback to a default city if user denies
      document.getElementById("weather-location").textContent = "📍 Location denied — using default";
      fetchWeather(12.9716, 77.5946); // Bengaluru fallback
    }
  );
}

initWeather();
