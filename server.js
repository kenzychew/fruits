//* imports -> require
require("dotenv").config(); //? https://github.com/motdotla/dotenv
const express = require("express");
const mongoose = require("mongoose");

//* config
const log = require('debug')('fruits:server')
const app = express();
const port = 3000;
mongoose.connect(process.env.MONGODB_URI);
mongoose.set("debug", true);
mongoose.connection.on("connected", () => { //? log connection status to terminal on start
    log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

const Fruit = require('./models/Fruit');

//* middleware

//* routes
app.get("/", (req, res) => {
  // res.send("Hello World!");
  res.render("index.ejs");
});

app.get("/fruits/new", (req, res) => {
    res.send("new fruits");
  });

//* listen
app.listen(port, () => {
  log(`Example app listening on port ${port}`);
});
