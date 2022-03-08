var express = require("express");
var mysql = require("mysql");
const multer = require("multer");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var app = express();
const fs = require('fs');
const path = require('path');

var connection = require("./../dbConnection.js");
const { log } = require("console");

// import  express  from 'express';
// var app = express();

// import mysql from 'mysql' ;
// import * as fs from 'fs';

// const bufferData = fs.readFileSync('config.json');
// const JSONData = bufferData.toString();
// let constants = JSON.parse(JSONData);

// var connection = mysql.createPool({
//     // connectionLimit: 100,
//     host: constants.DB.host,
//     user: constants.DB.username,
//     password: constants.DB.password,
//     port: constants.DB.port,
//     database: constants.DB.database
// });

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname.split('.').slice(0, -1).join('.') + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  //   limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}


//uploading photo
app.post("/upload-photo", upload.array("photos", 5), (req, res) => {
  console.log("req.body", req.body);
  res.end();
});
// app.post("/upload-photo", (req, res) => {
// //   console.log("req.body", req.file);
// //   res.end();
//     upload(req, res, (err) => {
//         if(err) {
//             console.log("Error in upload photo");
//         }
//         else {
//             console.log(req.file);
//         }
//     })
// });

//download photo
app.post('/download-photo/:file(*)', (req, res) => {
    console.log('Inside Download File');
    var file = req.params.file;
    
    var filelocation = path.join(__dirname + '/../public/uploads', file);
    var img = fs.readFileSync(filelocation);
    var base64img = new Buffer(img).toString('base64');
    res.writeHead(200, {
        'Content--type': 'image/jpg'
    });
    // console.log(base64img);
    res.end(base64img);
});

app.get("/", function (req, res) {
  console.log("Inside profile GET");
  console.log("Request Body: " + req.body);
  //Query

  connection.getConnection(function (err, conn) {
    if (err) {
      console.log("Error in creating connection!");
      res.writeHead(400, {
        "Content-type": "text/plain",
      });
      res.end("Error in creating connection!");
    } else {
      //Login validation query
      console.log("No error");
      var sql =
        "SELECT * from userdetails WHERE ProfileId = " +
        mysql.escape(req.session.user.ProfileId);
      conn.query(sql, function (err, result) {
        if (err) {
          console.log("Error in retrieving profile data");
          res.writeHead(400, {
            "Content-type": "text/plain",
          });
          res.end("Error in retrieving profile data");
        } else {
          // console.log(result[0].password);
          console.log("Profile Data: ", result);
          res.writeHead(200, {
            "Content-type": "application/json",
          });
          res.end(JSON.stringify(result[0]));
        }
      });
    }
  });
});
// app.post("/upload-file", upload.array("photos", 5), (req, res) => {
//   console.log("req.body", req.body);
//   res.end();
// });

module.exports = app;
