const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

/**
 * This make the 'Hello' model available here
 */
require('./models/Post');

/**
 * This blocks of code  help us extract ENV 
 * variables using 'dotenv' in 'development' environement
 */
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

/**
 * Try to connect to 'mongodb' database
 * Here data base name is 'helloworld'
 */
mongoose.Promise = global.Promise;
try {
  mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/helloworld', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, () =>
    console.log("Connected..."));
} catch (error) {
  console.log("could not connect");
}

/**
 * Create an Express App
 */
const app = express();

/**
 * Make use of 'body-parser' middleware
 */
app.use(bodyParser.json());

/**
 * Bindign the API END POINT to APP
 */
require('./routes/helloRoute')(app);


app.get("/", (req, res) => res.send("Hello World!"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
