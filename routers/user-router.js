const express = require("express");
const Users = require("./user-model.js");
const bcrypt = require("bcryptjs");
const protected = require("../auth/protected-middleware.js");
const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("It's alive!");
// });

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 6);
  user.password = hash;

  Users.add(user)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}` });
      } else {
        res.status(401).json({ message: "invalid credentials" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/", protected, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
module.exports = router;
