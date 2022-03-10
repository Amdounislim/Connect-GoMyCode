const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isGranted: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    default: "user",
    enum: ["admin", "user"]
  }
});

module.exports = model("user", userSchema);
