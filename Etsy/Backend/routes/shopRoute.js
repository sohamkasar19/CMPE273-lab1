var express = require("express");
var mysql = require("mysql");
const multer = require("multer");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var app = express();

const fs = require("fs");
const path = require("path");
var crypto = require("crypto");
require("dotenv").config();
var connection = require("./../dbConnection.js");
// const { log } = require("console");
const jwt = require("jsonwebtoken");

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    if (
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpg" &&
      file.mimetype !== "image/jpeg"
    ) {
      var err = new Error();
      err.code = "filetype";
      return cb(err);
    } else {
      var fileName = crypto.randomBytes(10).toString("hex");
      file.filename = fileName;
      cb(null, fileName + ".jpg");
    }
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
app.post("/upload-photo", upload.single("photos"), (req, res) => {
  console.log("req.body", req.body);
  res.end(res.req.file.filename);
});


app.get("/check-shop-name", function (req, res) {
    console.log("Inside check shop name  GET");
    //   console.log("Request Body ItemId: " + req.query.ItemId);
    const {token, nameToCheck} = req.query;
    console.log(token);
    let decode = null;
    try {
      decode = jwt.verify(token, process.env.SECRET);
    } catch (error) {
      return res.status(400).send("invalid token");
    }
    let ProfileId = decode.id;
 
    connection.getConnection(function (err, conn) {
      if (err) {
        console.log("Error in creating connection!");
        res.writeHead(400, {
          "Content-type": "text/plain",
        });
        res.end("Error in creating connection!");
      } else {
        //Login validation query
  
        var sql =
          "INSERT INTO shopdetails(ShopName, ProfileId) VALUES("+mysql.escape(nameToCheck)+","+mysql.escape(ProfileId)+");"
        //   console.log(sql);
        conn.query(sql, function (err, result) {
          if (err) {
            console.log("Error in setting Name ");
            res.writeHead(200, {
              "Content-type": "application/json",
            });
            res.end("false");
          } else {
            // console.log(result[0].password);
            //   console.log("Items Data: ", result);
            res.writeHead(200, {
              "Content-type": "application/json",
            });
            //   console.log(result);
            res.end("true");
          }
        });
      }
    });
  });




module.exports = app;
