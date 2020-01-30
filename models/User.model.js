const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
  email: { type: String },
  password: { type: String },
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
