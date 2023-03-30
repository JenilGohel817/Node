const mongoose = require("mongoose");

const registerUser = new mongoose.Schema({
  name: {
    type: String,
    required: "Please enter your name",
    trim: true,
  },
  email: {
    type: String,
    required: "Please enter your email",
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: "Please enter your password",
    trim: true,
  },
  confirmpassword: {
    type: String,
    required: "Please enter your Confirm Password",
    trim: true,
  },
});

// Create Collection

const Register = new mongoose.model("Register", registerUser);
module.exports = Register;
