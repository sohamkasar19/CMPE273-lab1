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
  // filename: function (req, file, cb) {
  //   cb(null, file.originalname);
  // },
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


//download photo
app.get("/download-photo/", (req, res) => {
  console.log("Inside Download File" + req.query.file);
  var file = req.query.file;

  var filetype = file.split(".").pop();

  var filelocation = path.join(__dirname + "/../public/uploads", file);
  var img = fs.readFileSync(filelocation);
  var base64img = new Buffer(img).toString("base64");
  res.writeHead(200, {
    "Content--type": "image/" + filetype,
  });
  // console.log(base64img);
  res.end("data:image/" + filetype + ";base64," + base64img);
});

app.get("/", function (req, res) {
  console.log("Inside profile GET");
  // console.log("Request Body JWT TOKEN: " + req.query.token);

  if (!req.query.token) {
    console.log("No token");
    res.writeHead(400, {
      "Content-type": "text/plain",
    });
    res.end("No token");
  } else {
    const token = req.query.token;
    // console.log("Token : " + token);
    let decode = null;
    try {
      decode = jwt.verify(token, process.env.SECRET);
    } catch (error) {
      return res.status(400).send("invalid token");
    }
    let ProfileId = decode.id;
    // console.log("From Session: "+ res.cookie.access_token)
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
        // console.log("No error");
        var sql =
          "SELECT * from userdetails WHERE ProfileId = " +
          mysql.escape(ProfileId);
        conn.query(sql, function (err, result) {
          if (err) {
            console.log("Error in retrieving profile data");
            res.writeHead(400, {
              "Content-type": "text/plain",
            });
            res.end("Error in retrieving profile data");
          } else {
            // console.log(result[0].password);
            // console.log("Profile Data: ", result);
            res.writeHead(200, {
              "Content-type": "application/json",
            });
            res.end(JSON.stringify(result[0]));
          }
        });
      }
      conn.release();
    });
  }
});

app.post("/", (req, res) => {
  console.log("Inside profile POST");

  connection.getConnection((err, conn) => {
    if (err) {
      console.log("Error in creating connection!");
      res.writeHead(400, {
        "Content-type": "text/plain",
      });
      res.end("Error in creating connection!");
    } else {
      console.log("connection done");
      console.log(req.body);
      if (req.body.ProfileImage) {
        var sql =
          "UPDATE userdetails SET Email = " +
          mysql.escape(req.body.Email) +
          ", Name = " +
          mysql.escape(req.body.Name) +
          ", DOB = " +
          mysql.escape(req.body.DOB) +
          ", About = " +
          mysql.escape(req.body.About) +
          ", City = " +
          mysql.escape(req.body.City) +
          ", Country = " +
          mysql.escape(req.body.Country) +
          ", Address = " +
          mysql.escape(req.body.Address) +
          ", Gender = " +
          mysql.escape(req.body.Gender) +
          ", ProfileImage = " +
          mysql.escape(req.body.ProfileImage) +
          ", Phonenumber = " +
          mysql.escape(req.body.Phonenumber) +
          " WHERE ProfileId = " +
          mysql.escape(req.body.ProfileId) +";";
      } else {
        var sql =
          "UPDATE userdetails SET Email = " +
          mysql.escape(req.body.Email) +
          ", Name = " +
          mysql.escape(req.body.Name) +
          ", DOB = " +
          mysql.escape(req.body.DOB) +
          ", About = " +
          mysql.escape(req.body.About) +
          ", City = " +
          mysql.escape(req.body.City) +
          ", Country = " +
          mysql.escape(req.body.Country) +
          ", Address = " +
          mysql.escape(req.body.Address) +
          ", Gender = " +
          mysql.escape(req.body.Gender) +
          ", Phonenumber = " +
          mysql.escape(req.body.Phonenumber) +
          " WHERE ProfileId = " +
          mysql.escape(req.body.ProfileId)+";";
      }
     console.log(sql);
      conn.query(sql, (err, result) => {
        if (err) {
          console.log("User details add" + err);
          res.writeHead(400, {
            "Content-Type": "text/plain",
          });
          res.end("Invalid Credentials!");
        } else {
          console.log("Profile POST done");
        }
      });
    }
    conn.release();
  });
});

app.get("/new", function (req, res) {
  console.log("Inside profile GET");
  // console.log("Request Body JWT TOKEN: " + req.query.token);

  if (!req.query.token) {
    console.log("No token");
    res.writeHead(400, {
      "Content-type": "text/plain",
    });
    res.end("No token");
  } else {
    const token = req.query.token;
    // console.log("Token : " + token);
    let decode = null;
    try {
      decode = jwt.verify(token, process.env.SECRET);
    } catch (error) {
      return res.status(400).send("invalid token");
    }
    let ProfileId = decode.id;
    // console.log("From Session: "+ res.cookie.access_token)
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
        // console.log("No error");
        var sql =
          "SELECT * from userdetails WHERE ProfileId = " +
          mysql.escape(ProfileId);
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
            if (result[0].ProfileImage) {
              for (const [key, user] of Object.entries(result)) {
                var file = user.ProfileImage;
                var filetype = file.split(".").pop();
                console.log(file);
                var filelocation = path.join(
                  __dirname + "/../public/uploads",
                  file
                );
                var img = fs.readFileSync(filelocation);
                var base64img = new Buffer(img).toString("base64");
                user.ProfileImage =
                  "data:image/" + filetype + ";base64," + base64img;
              }
            }
            res.end(JSON.stringify(result[0]));
          }
        });
      }
    });
    conn.release();
  }
});

app.get("/new/id", function (req, res) {
  console.log("Inside profile id GET");

  const { ProfileId } = req.query;

  // console.log("From Session: "+ res.cookie.access_token)
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
        mysql.escape(ProfileId);
      conn.query(sql, function (err, result) {
        if (err) {
          console.log("Error in retrieving profile data");
          res.writeHead(400, {
            "Content-type": "text/plain",
          });
          res.end("Error in retrieving profile data");
        } else {
          // console.log(result[0].password);
          // console.log("Profile Data: ", result);
          res.writeHead(200, {
            "Content-type": "application/json",
          });
          if (result[0].ProfileImage) {
            for (const [key, user] of Object.entries(result)) {
              var file = user.ProfileImage;
              var filetype = file.split(".").pop();
              console.log(file);
              var filelocation = path.join(
                __dirname + "/../public/uploads",
                file
              );
              var img = fs.readFileSync(filelocation);
              var base64img = new Buffer(img).toString("base64");
              user.ProfileImage =
                "data:image/" + filetype + ";base64," + base64img;
            }
          }
          res.end(JSON.stringify(result[0]));
        }
      });
    }
    conn.release();
  });
});


module.exports = app;
