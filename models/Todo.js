const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true          // ← every todo must belong to a user
  },
  text: { type: String, required: true, trim: true },
  done: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Todo", todoSchema);