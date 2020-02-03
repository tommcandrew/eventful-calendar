require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

mongoose.connect(
  process.env.MONGODB_URI,
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
        console.log("event saved");
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
    { $pull: { events: { _id: id } } },
    { safe: true, multi: true }
  )
    .then(() => {
      console.log("event deleted");
      res.status(200).send("Event deleted");
    })
    .catch(err => {
      console.log(err);
    });
});

app.post("/editevent/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  const { title, time, location } = req.body;
  const email = req.tokenData.user.email;
  User.updateOne(
    { email: email, "events._id": id },
    {
      $set: {
        "events.$.title": title,
        "events.$.time": time,
        "events.$.location": location
      }
    }
  )
    .then(() => {
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
      console.log("not registered");
      res.status(403).send();
    } else {
      bcrypt.compare(password, user.password, (err, isSame) => {
        if (err) {
          console.log("Problem comparing the passwords");
          res.status(201).send("Problem comparing the passwords");
        } else {
          if (!isSame) {
            console.log("Wrong password");
            res.status(201).send("Wrong password");
          } else {
            console.log("Password correct - now generating jwt");
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
    console.log("password must be at least 8 characters");
    res.status(500).send();
    return;
  }
  if (password !== password2) {
    console.log("passwords must match");
    res.status(500).send();
    return;
  }
  User.findOne({ email }).then(user => {
    if (user) {
      console.log("already registered");
      res.status(500).send();
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

app.get("/checkAuth", verifyToken, (req, res) => {
  res.status(200).send(req.tokenData);
});
