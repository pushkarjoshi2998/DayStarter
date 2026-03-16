require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const mongostore = require("connect-mongo").default;

const apiRoutes = require("./routes/api");
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");
const requireAuth = require("./middleware/auth");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongostore.create({ mongoUrl: process.env.MONGO }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 } // 7 days
}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

mongoose
    .connect(process.env.MONGO)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB error:", err));

app.use("/", authRoutes);                        // login, register, logout
app.use("/api", apiRoutes);                      // weather, quote, news
app.use("/api/todos", requireAuth, todoRoutes);  // protected

app.get("/", requireAuth, (req, res) => {
    res.render("index", {
        title: "My Dashboard",
        name: req.session.name,
    });
});

//404
app.use((req, res) => res.status(404).send("Page not found"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});