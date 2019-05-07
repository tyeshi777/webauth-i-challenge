const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");

const userRouter = require("./routers/user-router.js");

const server = express();

const sessionConfig = {
  name: "monster",
  secret: "keep it secret, keep it safe -gandalf",
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 2,
    secure: false
  },
  resave: false,
  saveUninitialized: true
};

server.use(session(sessionConfig));
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(morgan());
server.use("/api/users/", userRouter);

module.exports = server;
