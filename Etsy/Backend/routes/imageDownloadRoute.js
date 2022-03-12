var express = require("express");
var mysql = require("mysql");
const multer = require("multer");
var app = express();
const fs = require("fs");

var connection = require("./../dbConnection.js");


// app.get("/", function (req, res) {
//     console.log("Inside download image GET");
    
// }


// module.exports = app;