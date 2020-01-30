const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
  email: { type: String },
  password: { type: String },
  events: [
    {
      title: String,
      time: String,
      location: String,
      date: Number,
      month: Number,
      year: Number
    }
  ]
});

module.exports = mongoose.model("User", User);
