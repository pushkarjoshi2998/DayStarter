// routes/api.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

// GET /api/weather
router.get("/weather", async (req, res) => {
    const { lat, lon } = req.query;
    if (!lat || !lon) return res.status(400).json({ error: "lat and lon required" });

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;
        const resp = await axios.get(url);
        const d = resp.data;

        res.json({
            temp: d.main.temp,
            feels_like: d.main.feels_like,
            humidity: d.main.humidity,
            wind: d.wind.speed * 3.6, // m/s → km/h
            description: d.weather[0].description,
            main: d.weather[0].main,
            city: d.name,
            country: d.sys.country,
        });
    } catch (err) {
        console.error("Weather API error:", err.message);
        res.status(500).json({ error: "Failed to fetch weather" });
    }
});


// GET /api/quote
router.get("/quote", async (req, res) => {
    try {
        const resp = await axios.get("https://zenquotes.io/api/today");
        const d = resp.data[0];
        res.json({ quote: d.q, author: d.a });
    } catch (err) {
        console.error("Quote API error:", err.message);
        res.status(500).json({ error: "Failed to fetch quote" });
    }
});


// GET /api/news
router.get("/news", async (req, res) => {
    const category = req.query.category || "technology";
    const allowed = ["technology", "sports", "entertainment", "general"];
    const cat = allowed.includes(category) ? category : "technology";

    try {
        const url = `https://newsapi.org/v2/top-headlines?category=${cat}&language=en&pageSize=8&apiKey=${process.env.NEWS_API_KEY}`;
        const resp = await axios.get(url);
        res.json({ articles: resp.data.articles });
    } catch (err) {
        console.error("News API error:", err.message);
        res.status(500).json({ error: "Failed to fetch news" });
    }
});

module.exports = router;
