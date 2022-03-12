var express = require("express");
var mysql = require("mysql");
const multer = require("multer");
var app = express();
const fs = require("fs");
const path = require("path");

var connection = require("../dbConnection.js");

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: "./public/items/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
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

app.get("/all-images", function (req, res) {
  console.log("Inside download item images GET");
  connection.getConnection(function (err, conn) {
    if (err) {
      console.log("Error in creating connection!");
      res.writeHead(400, {
        "Content-type": "text/plain",
      });
      res.end("Error in creating connection!");
    } else {
      //Login validation query

      var sql = "SELECT * from itemdetails";
      conn.query(sql, function (err, result) {
        if (err) {
          console.log("Error in retrieving items data");
          res.writeHead(400, {
            "Content-type": "text/plain",
          });
          res.end("Error in retrieving items data");
        } else {
          // console.log(result[0].password);
          //   console.log("Items Data: ", result);
          res.writeHead(200, {
            "Content-type": "application/json",
          });
          for (const [key, item] of Object.entries(result)) {
            var file = item.ItemImage;
            var filetype = file.split(".").pop();
            console.log(file);
            var filelocation = path.join(__dirname + "/../public/items", file);
            var img = fs.readFileSync(filelocation);
            var base64img = new Buffer(img).toString("base64");
            item.ItemImage = "data:image/"+filetype+";base64,"+base64img;
          }
          //   console.log(result);
          res.end(JSON.stringify(result));
        }
      });
    }
  });
});

module.exports = app;
