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
  const { token, nameToCheck } = req.query;
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
        "SELECT EXISTS(SELECT * from shopdetails WHERE ShopName=" +
        mysql.escape(nameToCheck) +
        ");";

      // console.log(sql);
      conn.query(sql, function (err, result) {
        if (err) {
          console.log("Error while retrieving name your shop data");
          res.writeHead(400, {
            "Content-type": "text/plain",
          });
          res.end("Error while retrieving name your shop data");
        } else {
          // console.log(result[0].password);
          //   console.log("Items Data: ", result);
          res.writeHead(200, {
            "Content-type": "application/json",
          });
          //   console.log(result[0]["EXISTS(SELECT * from shopdetails WHERE ShopName='First Etsy Shop')"]);
          var key = Object.keys(result[0])[0];
          // console.log(key );
          console.log(result[0][key]);
          if (result[0][key] === 1) {
            console.log(result[0][key]);
            res.end("false");
          } else {
            res.end("true");
          }
        }
      });
    }
    conn.release();
  });
});

app.get("/check-shop-exists", function (req, res) {
  console.log("Inside check shop exists  GET");
  //   console.log("Request Body ItemId: " + req.query.ItemId);
  const { token } = req.query;
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
        "SELECT ShopName from shopdetails WHERE ProfileId = " +
        mysql.escape(ProfileId) +
        ";";

      // console.log(sql);
      conn.query(sql, function (err, result) {
        if (err) {
          console.log("Error while  check shop exists data");
          res.writeHead(400, {
            "Content-type": "text/plain",
          });
          res.end("Error while check shop exists data");
        } else {
          res.writeHead(200, {
            "Content-type": "application/json",
          });

          if (result.length === 0) {
            res.end("Not Found");
          } else {
            res.end(result[0].ShopName);
          }
        }
      });
    }
    conn.release();
  });
});

app.post("/add-shop-name", function (req, res) {
  console.log("Inside add shop name  post");
  //   console.log("Request Body ItemId: " + req.query.ItemId);
  const { token, nameToAdd } = req.body;
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
      var sql =
        "INSERT INTO shopdetails(ShopName, ProfileId) VALUES(" +
        mysql.escape(nameToAdd) +
        "," +
        mysql.escape(ProfileId) +
        ");";

      console.log(sql);
      conn.query(sql, function (err, result) {
        if (err) {
          console.log("Error in add shop data");
          res.writeHead(400, {
            "Content-type": "text/plain",
          });
          res.end("Error in add shop data");
        } else {
          // console.log(result[0].password);
          console.log("Profile Data: ", result);
          res.writeHead(200, {
            "Content-type": "application/json",
          });
          res.end("Added Shop Name");
        }
      });
    }
    conn.release();
  });
});

app.get("/details", function (req, res) {
  console.log("Inside get shop details GET");

  const { ShopName } = req.query;
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
        "SELECT * from shopdetails WHERE ShopName = " +
        mysql.escape(ShopName) +
        ";";

      // console.log(sql);
      conn.query(sql, function (err, result) {
        if (err) {
          console.log("Error while  get shop details data");
          res.writeHead(400, {
            "Content-type": "text/plain",
          });
          res.end("Error while get shop details data");
        } else {
          res.writeHead(200, {
            "Content-type": "application/json",
          });
          if (result[0].ShopImage) {
            for (const [key, user] of Object.entries(result)) {
              var file = user.ShopImage;
              var filetype = file.split(".").pop();
              // console.log(file);
              var filelocation = path.join(
                __dirname + "/../public/uploads",
                file
              );
              var img = fs.readFileSync(filelocation);
              var base64img = new Buffer(img).toString("base64");
              user.ShopImage =
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

app.get("/details-by-id", function (req, res) {
  console.log("Inside get shop details by id GET");

  const { ShopId } = req.query;
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
        "SELECT ShopName from shopdetails WHERE ShopId = " +
        mysql.escape(ShopId) +
        ";";

      // console.log(sql);
      conn.query(sql, function (err, result) {
        if (err) {
          console.log("Error while  get shop details data");
          res.writeHead(400, {
            "Content-type": "text/plain",
          });
          res.end("Error while get shop details data");
        } else {
          res.writeHead(200, {
            "Content-type": "application/json",
          });
          res.end(JSON.stringify(result[0]));
        }
      });
    }
    conn.release();
  });
});

app.get("/items", function (req, res) {
  console.log("Inside get shop items GET");

  const { ShopId } = req.query;

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
        "SELECT * from itemdetails WHERE ShopId = " +
        mysql.escape(ShopId) +
        ";";

      // console.log(sql);
      conn.query(sql, function (err, result) {
        if (err) {
          console.log("Error while  get shop items data");
          res.writeHead(400, {
            "Content-type": "text/plain",
          });
          res.end("Error while get shop items data");
        } else {
          res.writeHead(200, {
            "Content-type": "application/json",
          });

          for (const [key, user] of Object.entries(result)) {
            if (user.ItemImage) {
              var file = user.ItemImage;
              var filetype = file.split(".").pop();
              // console.log(file);
              var filelocation = path.join(
                __dirname + "/../public/uploads",
                file
              );
              var img = fs.readFileSync(filelocation);
              var base64img = new Buffer(img).toString("base64");
              user.ItemImage =
                "data:image/" + filetype + ";base64," + base64img;
            }
          }

          res.end(JSON.stringify(result));
        }
      });
    }
    conn.release();
  });
});

app.get("/check-owner", function (req, res) {
  console.log("Inside get shop items GET");

  const { ShopId, token } = req.query;
  // console.log(token);
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
        "SELECT ProfileId from shopdetails WHERE ShopId = " +
        mysql.escape(ShopId) +
        ";";

      // console.log(sql);
      conn.query(sql, function (err, result) {
        if (err) {
          console.log("Error while check if owner ");
          res.writeHead(400, {
            "Content-type": "text/plain",
          });
          res.end("Error while check if owner ");
        } else {
          res.writeHead(200, {
            "Content-type": "application/json",
          });

          let OwnerId = result[0].ProfileId;

          if (OwnerId === ProfileId) {
            res.end("true");
          } else {
            res.end("false");
          }
        }
      });
    }
    conn.release();
  });
});

app.post("/add-photo", function (req, res) {
  console.log("Inside add shop photo  post");
  //   console.log("Request Body ItemId: " + req.query.ItemId);
  const { ShopImage, ShopId } = req.body;

  connection.getConnection(function (err, conn) {
    if (err) {
      console.log("Error in creating connection!");
      res.writeHead(400, {
        "Content-type": "text/plain",
      });
      res.end("Error in creating connection!");
    } else {
      var sql =
        "UPDATE shopdetails SET ShopImage = " +
        mysql.escape(ShopImage) +
        " WHERE ShopId = " +
        mysql.escape(ShopId) +
        ";";

      console.log(sql);
      conn.query(sql, function (err, result) {
        if (err) {
          console.log("Error in add shop photo");
          res.writeHead(400, {
            "Content-type": "text/plain",
          });
          res.end("Error in add shop photo");
        } else {
          // console.log(result[0].password);
          // console.log("Profile Data: ", result);
          res.writeHead(200, {
            "Content-type": "application/json",
          });
          var file = ShopImage;
          var filetype = file.split(".").pop();
          // console.log(file);
          var filelocation = path.join(__dirname + "/../public/uploads", file);
          var img = fs.readFileSync(filelocation);
          var base64img = new Buffer(img).toString("base64");
          ShopImageEncoded = "data:image/" + filetype + ";base64," + base64img;
          // console.log(ShopImageEncoded);
          res.end(ShopImageEncoded);
        }
      });
    }
    conn.release();
  });
});

module.exports = app;
