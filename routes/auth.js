const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User");

// GET /register
router.get("/register", (req, res) => {
    if (req.session.userId) return res.redirect("/");
    res.render("register", { error: null });
});

// POST /register
router.post("/register", async (req, res) => {
    const { name, email, password, city } = req.body;

    if (!name || !email || !password || !city) {
        return res.render("register", { error: "All fields are required" });
    }

    try {
        const existing = await User.findOne({ email });
        if (existing) {
            return res.render("register", { error: "Email already registered" });
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed, city });

        // auto login after register
        req.session.userId = user._id;
        req.session.name = user.name;

        res.redirect("/");
    } catch (err) {
        console.error("Register error:", err);
        res.render("register", { error: "Something went wrong, try again" });
    }
});

// GET /login
router.get("/login", (req, res) => {
    if (req.session.userId) return res.redirect("/");
    res.render("login", { error: null });
});

// POST /login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render("login", { error: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.render("login", { error: "No account found with that email" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.render("login", { error: "Incorrect password" });
        }

        req.session.userId = user._id;
        req.session.name = user.name;

        res.redirect("/");
    } catch (err) {
        console.error("Login error:", err);
        res.render("login", { error: "Something went wrong, try again" });
    }
});

// GET /logout
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
});

module.exports = router;