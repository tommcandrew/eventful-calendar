const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
// const User = require("./models/User.model");
const PORT = process.env.PORT;
const mongoUri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0-hjn2u.gcp.mongodb.net/calendar?retryWrites=true&w=majority`;

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

mongoose.connect(
  mongoUri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  () => console.log("Connected to db")
);

app.use(express.json());

// app.get("/events", verifyToken, (req, res) => {
//   const email = req.tokenData.user.email;
//   User.findOne({ email })
//     .then(user => {
//       res.status(200).send(user.events);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// app.post("/addevent", verifyToken, (req, res) => {
//   const { title, time, location, date, month, year } = req.body;
//   const event = { title, time, location, date, month, year };
//   const email = req.tokenData.user.email;
//   User.findOne({ email })
//     .then(user => {
//       user.events.push(event);
//       user.save().then(() => {
//         console.log("event saved");
//         res.status(200).send("Event saved");
//       });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// app.delete("/deleteevent/:id", verifyToken, (req, res) => {
//   const { id } = req.params;
//   const email = req.tokenData.user.email;

//   User.update(
//     { email: email },
//     { $pull: { events: { _id: id } } },
//     { safe: true, multi: true }
//   )
//     .then(() => {
//       console.log("event deleted");
//       res.status(200).send("Event deleted");
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// app.post("/editevent/:id", verifyToken, (req, res) => {
//   const { id } = req.params;
//   const { title, time, location } = req.body;
//   const email = req.tokenData.user.email;
//   User.updateOne(
//     { "events._id": id },
//     {
//       $set: {
//         "events.$.title": title,
//         "events.$.time": time,
//         "events.$.location": location
//       }
//     }
//   )
//     .then(() => {
//       res.status(200).send("Event updated");
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });
