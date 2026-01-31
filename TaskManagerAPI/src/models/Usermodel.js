const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      minlength: 3,
      maxlength: 30,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
      lowercase: true,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
