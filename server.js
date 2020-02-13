const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const PORT = 5000;
const axios = require("axios");

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

mongoose.connect(
  "mongodb://localhost:27017/eventful-calendar",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  () => console.log("Connected to db")
);

app.use(express.json());

const verifyToken = (req, res, next) => {
  const bearer = req.headers["authorization"];
  const bearerHeader = bearer.split(" ");
  const token = bearerHeader[1];
  if (token) {
    jwt.verify(token, "secretkey", (err, tokenData) => {
      if (err) {
        console.log(err);
        res.status(403).send("Forbidden");
      } else {
        req.tokenData = tokenData;
        next();
      }
    });
  }
};

app.get("/events", verifyToken, (req, res) => {
  const email = req.tokenData.user.email;
  User.findOne({ email })
    .then(user => {
      res.status(200).send(user.events);
    })
    .catch(err => {
      console.log(err);
    });
});

app.post("/addevent", verifyToken, (req, res) => {
  const { title, time, icon, date, month, year, id } = req.body;
  const event = { title, time, icon, date, month, year, id };
  const email = req.tokenData.user.email;
  User.findOne({ email })
    .then(user => {
      user.events.push(event);
      user.save().then(() => {
        res.status(200).send("Event saved");
      });
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete("/deleteevent/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  const email = req.tokenData.user.email;

  User.update(
    { email: email },
    { $pull: { events: { id: id } } },
    { safe: true, multi: true }
  )
    .then(() => {
      res.status(200).send("Event deleted");
    })
    .catch(err => {
      console.log(err);
    });
});

app.post("/editevent/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  const { title, time, icon } = req.body;
  const email = req.tokenData.user.email;
  User.updateOne(
    { email: email, "events.id": id },
    {
      $set: {
        "events.$.title": title,
        "events.$.time": time,
        "events.$.icon": icon
      }
    }
  )
    .then(user => {
      res.status(200).send("Event updated");
    })
    .catch(err => {
      console.log(err);
    });
});

app.post("/moveevent/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  const { newDay } = req.body;
  const email = req.tokenData.user.email;
  User.updateOne(
    { email: email, "events.id": id },
    {
      $set: {
        "events.$.date": newDay
      }
    }
  )
    .then(() => {
      res.status(200).send("Event moved");
    })
    .catch(err => {
      console.log(err);
    });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).then(user => {
    if (!user) {
      //some status codes allow to send back data (message) and others don't (e.g. 403)
      res.status(201).send("That email is not registered");
    } else {
      bcrypt.compare(password, user.password, (err, isSame) => {
        if (err) {
          res.status(201).send("Problem comparing the passwords");
        } else {
          if (!isSame) {
            res.status(201).send("Wrong password");
          } else {
            jwt.sign({ user }, "secretkey", (err, token) => {
              res.status(200).send({ token: token, userName: user.name });
            });
          }
        }
      });
    }
  });
});

app.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  if (password.length < 8) {
    res.status(500).send();
    return;
  }
  if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$/.test(email) === false) {
    res.status(201).send("Please enter a valid email address");
    return;
  }
  if (password !== password2) {
    res.status(201).send("Passwords must match");
    return;
  }
  User.findOne({ email }).then(user => {
    if (user) {
      res.status(201).send("That email is already registered");
      return;
    }
  });
  const user = new User({ name, email, password });
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      user.save().then(user => {
        jwt.sign({ user }, "secretkey", (err, token) => {
          res.send(token);
        });
      });
    });
  });
});

app.post("/holidays", (req, res) => {
  const { country, year } = req.body;
  axios
    .get(
      `https://calendarific.com/api/v2/holidays?&api_key=423d3eeb339e68f8ac6484808dbda88b657f40b8&country=${country}&year=${year}`
    )
    .then(response => {
      const allHolidays = response.data.response.holidays;
      const selectHolidays = allHolidays.filter(
        holiday =>
          holiday.type.includes("National holiday") ||
          holiday.type.includes("Common local holiday") ||
          holiday.type.includes("Clock change/Daylight Saving Time") ||
          (holiday.type.includes("Observance") &&
            //not including Scottish holidays because of duplicates (e.g. Easter Monday)
            !holiday.locations.includes("SCT"))
      );
      res.status(200).send(selectHolidays);
    });
});

app.get("/checkAuth", verifyToken, (req, res) => {
  res.status(200).send(req.tokenData);
});
