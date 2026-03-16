const express = require("express");
const router  = express.Router();
const Todo    = require("../models/Todo");

// GET /api/todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.session.userId }).sort({ createdAt: 1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// POST /api/todos
router.post("/", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text required" });
  try {
    const todo = await Todo.create({ text, userId: req.session.userId });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: "Failed to create todo" });
  }
});

// PATCH /api/todos/:id
router.patch("/:id", async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, userId: req.session.userId });
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    todo.done = !todo.done;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: "Failed to update todo" });
  }
});

// DELETE /api/todos/:id
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findOneAndDelete({ _id: req.params.id, userId: req.session.userId });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

module.exports = router;