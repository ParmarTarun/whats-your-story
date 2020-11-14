const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim:true,
    required: [true, "Please provide an email."],
  },
  password: {
    type: String,
    trim:true,
    required: [true, "Please provide a password"],
  },
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
