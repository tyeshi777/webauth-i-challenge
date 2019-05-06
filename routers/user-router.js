const express = require("express");
const Users = require("./user-model.js");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("It's alive!");
});

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

module.exports = router;
