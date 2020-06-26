const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;


 // This make the 'Hello' model available here

require('./models/Student');

 // This blocks of code  help us extract ENV 
 // variables using 'dotenv' in 'development' environement
 
if 
(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}


 // Try to connect to 'mongodb' database
 // Here data base name is 'helloworld'
mongoose.Promise = global.Promise;
try {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/full_stack', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, () =>
    console.log("Connected..."));
} catch (error) {
  console.log("could not connect");
}

// Create an Express App
const app = express();

// Make use of 'body-parser' middleware
app.use(bodyParser.json());

// Initialize passport as a middleware
app.use(passport.initialize());

// Requires the Account model with Passport-Local Mongoose plugged in
let User = require('./models/User');

// Use static authenticate method of model in LocalStrategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // Change the default LocalStrategy credential key 'username' to 'email
      passwordField: "password", // Keep the 'password' field as 'password
    },
    // Use static authenticate method of model in LocalStrategy
    User.authenticate()
  )
);

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




// Bindign the API END POINT to APP
require('./routes/authRoute')(app);
require('./routes/studentRoute')(app);

app.get("/", (req, res) => res.send("Hello World Again!"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
