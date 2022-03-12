var express = require("express");
var cors = require("cors");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var session = require('express-session');
// var cookieSession  = require("cookie-session");
var cookieParser = require("cookie-parser");

var loginRoute = require("./routes/loginRoute.js");
var signupRoute = require("./routes/signupRoute.js");
var profileRoute = require("./routes/profileRoute.js");
var itemRoute = require("./routes/itemRoute.js")

var connection = require("./dbConnection.js");
var constants = require("./config.json");

var app = express();

// import  express  from 'express';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import mysql from 'mysql' ;
// import * as fs from 'fs';
// import bodyParser from 'body-parser';
// import session from 'express-session';

// import loginRoute from './routes/loginRoute.js';
// import signupRoute from './routes/signupRoute.js';
// import profileRoute from './routes/profileRoute.js';

// var app = express();

// const bufferData = fs.readFileSync('config.json');
// const JSONData = bufferData.toString();
// let constants = JSON.parse(JSONData);
// console.log(constants.DB)

//setting up session
app.set("trust proxy", 1);
app.use(session({
    secret: 'cmpe273-etsy-app',
    resave: true,
    saveUninitialized: true,
    duration: 60 * 60 * 100,
    activeDuration: 5 * 60 * 100
}));
// var sessionMiddleware = session({
//   resave: true,
//   saveUninitialized: true,
//   secret: "cmpe273-etsy-app",
//   // store: store
// })
// app.use(sessionMiddleware);

app.use(function (req, res, next) {
  req.session.user = "dsadsaasd";
  next();
});

//setting up session
// app.set("trust proxy", 1);
// app.use(
//   cookieSession({
//     name: "session",
//     secret: 'cmpe273-etsy-app',
//     httpOnly: true,
//     maxAge: 30 * 60 * 1000,
//     secure: false,
//     overwrite: false,
//   })
// );

app.use(cookieParser());

//set up cors
app.use(cors({ origin: constants.frontEnd, credentials: true }));

//DB connection
// var connection = mysql.createPool({
//     // connectionLimit: 100,
//     host: constants.DB.host,
//     user: constants.DB.username,
//     password: constants.DB.password,
//     port: constants.DB.port,
//     database: constants.DB.database
// });

connection.getConnection((err) => {
  if (err) {
    throw "Error occured: " + err;
  }
  console.log("pool created");
});

app.use(bodyParser.json());




app.use("/login",  loginRoute);

app.use("/signup",  signupRoute);

app.use("/profile", profileRoute);

app.use("/item", itemRoute);

app.get("/", (req, res) => {
  console.log("TEST");
  res.send("Hello from HomePage");
});

app.listen(8080, () => {
  console.log("Running on 8080");
});
