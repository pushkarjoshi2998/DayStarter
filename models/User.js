const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  email:    { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  city:     { type: String, required: true, trim: true },

  preferences: {
    theme:        { type: String, default: "auto" },
    newsCategory: { type: String, default: "technology" },
    widgets: {
      weather:  { type: Boolean, default: true },
      quote:    { type: Boolean, default: true },
      news:     { type: Boolean, default: true },
      todo:     { type: Boolean, default: true },
      calendar: { type: Boolean, default: true },
    }
  }
}, { timestamps: true });

// never send password back in API responses
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model("User", userSchema);