# DayStarter — Personal Dashboard 🌤️

![Node.js](https://img.shields.io/badge/Node.js-v18+-green?style=flat-square)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey?style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green?style=flat-square)
![EJS](https://img.shields.io/badge/Templating-EJS-orange?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

> A full-stack personal dashboard that greets you by name, shows live weather, top news, a daily quote, your tasks, and a mini calendar — all in one glassmorphism-designed interface.

---

## ✨ Features

- 🕐 **Live Clock & Greeting** — time-based greeting (Good Morning / Afternoon / Evening / Night)
- 🌈 **Dynamic Themes** — background and UI adapts to time of day automatically
- ⛅ **Weather Widget** — auto-detects location, shows temp, humidity, wind speed, and reacts visually to weather conditions
- 💬 **Quote of the Day** — daily motivational quote with typing animation (ZenQuotes API)
- 📰 **News Feed** — top headlines with category filter: Tech, Sports, World, Entertainment (NewsAPI)
- 🔍 **Google Search Bar** — search Google directly from the dashboard
- ✅ **To-Do Tracker** — add, complete, and delete tasks with a progress bar (saved to MongoDB per user)
- 📅 **Mini Calendar** — monthly view with today highlighted and month navigation
- 🔐 **Auth System** — Register, Login, Logout with bcrypt password hashing and session management
- 👤 **Multi-user** — every user has their own private todos, name, city, and preferences

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Templating | EJS |
| Database | MongoDB + Mongoose |
| Auth | bcrypt + express-session + connect-mongo |
| APIs | OpenWeatherMap, NewsAPI, ZenQuotes |
| Frontend | HTML, CSS (Glassmorphism), Vanilla JS |

---

## 📁 Project Structure

```
DayStarter/
├── middleware/
│   └── auth.js               # Route protection middleware
├── models/
│   ├── User.js               # User schema (name, email, password, city, preferences)
│   └── Todo.js               # Todo schema (userId, text, done)
├── routes/
│   ├── auth.js               # Register, Login, Logout
│   ├── api.js                # Weather, Quote, News API endpoints
│   └── todos.js              # Todo CRUD (protected routes)
├── views/
│   ├── index.ejs             # Main dashboard
│   ├── login.ejs             # Login page
│   └── register.ejs          # Register page
├── public/
│   ├── css/
│   │   ├── style.css         # Dashboard styles
│   │   └── auth.css          # Auth page styles
│   └── js/
│       ├── clock.js          # Live clock + time-based theming
│       ├── weather.js        # Weather widget + reactive styling
│       ├── quote.js          # Quote of the day + typing animation
│       ├── news.js           # News feed + category filter
│       ├── todo.js           # Todo CRUD (MongoDB)
│       └── calendar.js       # Mini calendar
├── app.js                    # Express server entry point
├── .env.example              # Environment variable template
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB running locally or a MongoDB Atlas URI

### 1. Clone the repository

```bash
git clone https://github.com/pushkarjoshi2998/daystarter.git
cd daystarter
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/dashboardDB
OPENWEATHER_API_KEY=your_openweathermap_key
NEWS_API_KEY=your_newsapi_key
SESSION_SECRET=your_long_random_secret_string
```

### 4. Run the app

```bash
node app.js
```

### 5. Open in browser

```
http://localhost:3000
```

You'll be redirected to the login page. Register a new account and your dashboard is ready!

---

## 🔑 API Keys

| API | Where to get it | Free tier |
|-----|----------------|-----------|
| OpenWeatherMap | [openweathermap.org/api](https://openweathermap.org/api) | ✅ Yes (note: new keys take up to 2 hours to activate) |
| NewsAPI | [newsapi.org](https://newsapi.org) | ✅ Yes |
| ZenQuotes | No key needed | ✅ Free |

---

## 🔐 Security Features

- Passwords hashed with **bcrypt** (salt rounds: 10) — never stored as plain text
- Server-side sessions via **express-session**
- Sessions persisted in MongoDB via **connect-mongo** — survive server restarts
- API keys stored in `.env` — never exposed to the client
- Protected routes via auth middleware — dashboard requires login
- Per-user data isolation — users can only access their own todos

---

## 🌗 Themes

The dashboard automatically switches theme based on time of day:

| Time | Theme |
|------|-------|
| 5am – 12pm | ☀️ Morning (warm peach & purple) |
| 12pm – 5pm | 🌤️ Noon (yellow & cyan) |
| 5pm – 8pm | 🌇 Evening (orange & red) |
| 8pm – 5am | 🌙 Night (deep purple & dark blue) |

The weather widget also reacts to live weather conditions — rain, sun, storm, cloud, and snow each have unique visual styles.

---

## 📸 Screenshots

> Add screenshots of your dashboard here after deploying!

---

## 🚢 Deployment

This app can be deployed to:

- [Railway](https://railway.app) — recommended, supports Node + MongoDB
- [Render](https://render.com) — free tier available
- [Cyclic](https://cyclic.sh) — simple Node.js deployment

Remember to set all environment variables in your deployment platform's dashboard.

---

## 📝 License

This project is licensed under the MIT License.

---

## 👤 Author

**Pushkar**

- GitHub: [@pushkarjoshi2998](https://github.com/pushkarjoshi2998)
- LinkedIn: [Pushkar Joshi](https://www.linkedin.com/in/pushkar-joshi-653bb3335/)

---

> Built as a full-stack learning project covering Node.js, Express, MongoDB, EJS, REST APIs, authentication, and UI design. 🚀
