//* imports -> require
require("dotenv").config(); //? https://github.com/motdotla/dotenv
const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');

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
app.use(morgan('dev'));
//* following line is for EJS only -> interpret the body of the POST
app.use(express.urlencoded({ extended: false }));


//* routes
app.get('/', (req, res) => {
  // res.send("Hello World!");
  res.render("index.ejs");
});

app.get('/fruits/new', (req, res) => {
    // res.send("new fruits");
    res.render("fruits/new.ejs");
  });

app.post('/fruits', async (req, res) => {
    if (req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true;
      } else {
        req.body.isReadyToEat = false;
      }
      log("body %o", req.body)
    await Fruit.create(req.body);
    res.redirect('fruits/new');
})

//* listen
app.listen(port, () => {
  log(`Example app listening on port ${port}`);
});
