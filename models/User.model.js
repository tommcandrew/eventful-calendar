const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
  name: String,
  email: String,
  password: String,
  events: [
    {
      id: String,
      title: String,
      time: String,
      timePeriod: String,
      date: Number,
      month: Number,
      year: Number
    }
  ]
});

module.exports = mongoose.model("User", User);
