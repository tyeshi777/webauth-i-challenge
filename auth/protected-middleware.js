// const bcrypt = require("bcryptjs");

// const Users = require("../routers/user-model.js");

function protected(req, res, next) {
  // const { username, password } = req.headers;

  if (req.session && req.session.username) {
    next();
  } else {
    res.status(401).json({ message: "invalid credentials" });
  }

  // if (username && password) {
  //   Users.findBy({ username })
  //     .first()
  //     .then(user => {
  //       if (user && bcrypt.compareSync(password, user.password)) {
  //         next();
  //       } else {
  //         res.status(401).json({ message: `invalid credentials` });
  //       }
  //     })
  //     .catch(err => {
  //       res.status(500).json(err);
  //     })
  //     .catch(err =>
  //       res.status(400).json({ message: "please provide a valid credentials" })
  //     );
  // }
}

module.exports = protected;
