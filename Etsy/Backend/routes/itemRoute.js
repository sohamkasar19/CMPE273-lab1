var express = require("express");
var mysql = require("mysql");
const multer = require("multer");
var app = express();
const fs = require("fs");
const path = require("path");
require("dotenv").config();
var jwt = require("jsonwebtoken");
var crypto = require("crypto");

var connection = require("../dbConnection.js");

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

app.post("/upload-photo", upload.single("photos"), (req, res) => {
  console.log("req.body", req.body);
  res.end(res.req.file.filename);
});

app.get("/all-images", function (req, res) {
  console.log("Inside download all item images GET");
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
            var filelocation = path.join(
              __dirname + "/../public/uploads",
              file
            );
            var img = fs.readFileSync(filelocation);
            var base64img = new Buffer(img).toString("base64");
            item.ItemImage = "data:image/" + filetype + ";base64," + base64img;
          }
          //   console.log(result);
          res.end(JSON.stringify(result));
        }
      });
    }
  });
});

app.get("/details", function (req, res) {
  console.log("Inside item  GET");
  console.log("Request Body ItemId: " + req.query.ItemId);
  const ItemId = req.query.ItemId;
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
        "SELECT * from itemdetails WHERE ItemId = " + mysql.escape(ItemId);
      conn.query(sql, function (err, result) {
        if (err) {
          console.log("Error in retrieving single item data");
          res.writeHead(400, {
            "Content-type": "text/plain",
          });
          res.end("Error in retrieving single item data");
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
            var filelocation = path.join(
              __dirname + "/../public/uploads",
              file
            );
            var img = fs.readFileSync(filelocation);
            var base64img = new Buffer(img).toString("base64");
            item.ItemImage = "data:image/" + filetype + ";base64," + base64img;
          }
          //   console.log(result);
          res.end(JSON.stringify(result));
        }
      });
    }
  });
});

app.get("/favouritesImages", function (req, res) {
  console.log("Inside favouritesImages  GET");
  const token = req.query.token;
  let decode = null;
  try {
    decode = jwt.verify(token, process.env.SECRET);
  } catch (error) {
    return res.status(400).send("invalid token");
  }
  let ProfileId = decode.id;
  connection.getConnection(function (err, conn) {
    if (err) {
      console.log("Error in creating connection! " + err);
      res.writeHead(400, {
        "Content-type": "text/plain",
      });
      res.end("Error in creating connection!");
    } else {
      //Login validation query

      var sql =
        "SELECT * FROM favourites INNER JOIN itemdetails ON favourites.ItemId = itemdetails.ItemId WHERE ProfileId = " +
        mysql.escape(ProfileId);
      conn.query(sql, function (err, result) {
        if (err) {
          console.log("Error in retrieving favourite item data");
          res.writeHead(400, {
            "Content-type": "text/plain",
          });
          res.end("Error in retrieving favourite item data");
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
            var filelocation = path.join(
              __dirname + "/../public/uploads",
              file
            );
            var img = fs.readFileSync(filelocation);
            var base64img = new Buffer(img).toString("base64");
            item.ItemImage = "data:image/" + filetype + ";base64," + base64img;
          }
          //   console.log(result);
          res.end(JSON.stringify(result));
        }
      });
    }
  });
});

app.get("/favourites", function (req, res) {
  console.log("Inside favourites  GET");
  const token = req.query.token;
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
        "SELECT ItemId FROM favourites WHERE ProfileId = " +
        mysql.escape(ProfileId);
      conn.query(sql, function (err, result) {
        if (err) {
          console.log("Error in retrieving favourite item data");
          res.writeHead(400, {
            "Content-type": "text/plain",
          });
          res.end("Error in retrieving favourite item data");
        } else {
          // console.log(result[0].password);
          //   console.log("Items Data: ", result);
          res.writeHead(200, {
            "Content-type": "application/json",
          });

          //   console.log(result);
          res.end(JSON.stringify(result));
        }
      });
    }
  });
});

app.post("/set-remove-favourite", function (req, res) {
  console.log("Inside set favourite  POST");
  const { token, ItemId, isDelete } = req.body;
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
      if (isDelete) {
        var sql =
          "DELETE FROM favourites WHERE ProfileId = " +
          mysql.escape(ProfileId) +
          " AND ItemId = " +
          mysql.escape(ItemId) +
          ";";
      } else {
        var sql =
          "INSERT INTO favourites(ProfileId, ItemId) VALUES(" +
          mysql.escape(ProfileId) +
          "," +
          mysql.escape(ItemId) +
          ");";
      }
      conn.query(sql, function (err, result) {
        if (err) {
          console.log("Error in setting favourite item data");
          res.writeHead(400, {
            "Content-type": "text/plain",
          });
          res.end("Error in setting favourite item data");
        } else {
          // console.log(result[0].password);
          //   console.log("Items Data: ", result);
          res.writeHead(200, {
            "Content-type": "application/json",
          });

          //   console.log(result);
          res.end("Set remove Favourite Done");
        }
      });
    }
  });
});

app.post("/add", function (req, res) {
  console.log("Inside add item  POST");
  const itemToAdd = req.body;

  connection.getConnection(function (err, conn) {
    if (err) {
      console.log("Error in creating connection!");
      res.writeHead(400, {
        "Content-type": "text/plain",
      });
      res.end("Error in creating connection!");
    } else {
      var sql =
        "INSERT INTO itemdetails(ItemName,ShopId,QuantityAvailable,Category,Price,ItemImage,Description) VALUES(" +
        mysql.escape(itemToAdd.ItemName) +
        "," +
        mysql.escape(itemToAdd.ShopId) +
        "," +
        mysql.escape(itemToAdd.QuantityAvailable) +
        "," +
        mysql.escape(itemToAdd.Category) +
        ", " +
        mysql.escape(itemToAdd.Price) +
        ", " +
        mysql.escape(itemToAdd.ItemImage) +
        ", " +
        mysql.escape(itemToAdd.Description) +
        "); ";
      console.log(sql);
      conn.query(sql, function (err, result) {
        if (err) {
          console.log("Error in add item data");
          res.writeHead(400, {
            "Content-type": "text/plain",
          });
          res.end("Error in add item data");
        } else {
          res.writeHead(200, {
            "Content-type": "application/json",
          });

          res.end("Item Added");
        }
      });
    }
  });
});

app.post("/edit", function (req, res) {
  console.log("Inside add item  POST");
  const itemToAdd = req.body;
  console.log(itemToAdd.ItemImage.length);

  connection.getConnection(function (err, conn) {
    if (err) {
      console.log("Error in creating connection!");
      res.writeHead(400, {
        "Content-type": "text/plain",
      });
      res.end("Error in creating connection!");
    } else {
      if(itemToAdd.ItemImage.length === 0){
        var sql =
        "UPDATE itemdetails SET ItemName = " +
        mysql.escape(itemToAdd.ItemName) +
        ", Category = " +
        mysql.escape(itemToAdd.Category) +
        ", QuantityAvailable = " +
        mysql.escape(itemToAdd.QuantityAvailable) +
        ", Price = " +
        mysql.escape(itemToAdd.Price) +
        ", Description = " +
        mysql.escape(itemToAdd.Description) +
        " WHERE ItemId = " +
        mysql.escape(itemToAdd.ItemId) +
        " ; ";
      }
      else {
        var sql =
        "UPDATE itemdetails SET ItemName = " +
        mysql.escape(itemToAdd.ItemName) +
        ", Category = " +
        mysql.escape(itemToAdd.Category) +
        ", QuantityAvailable = " +
        mysql.escape(itemToAdd.QuantityAvailable) +
        ", Price = " +
        mysql.escape(itemToAdd.Price) +
        ", Description = " +
        mysql.escape(itemToAdd.Description) +
        ", ItemImage = " +
        mysql.escape(itemToAdd.ItemImage) +
        " WHERE ItemId = " +
        mysql.escape(itemToAdd.ItemId) +
        " ; ";
      }
      
      console.log(sql);
      conn.query(sql, function (err, result) {
        if (err) {
          console.log("Error in add item data");
          res.writeHead(400, {
            "Content-type": "text/plain",
          });
          res.end("Error in add item data");
        } else {
          res.writeHead(200, {
            "Content-type": "application/json",
          });

          res.end("Item Added");
        }
      });
    }
  });
});

app.get("/search", function (req, res) {
  console.log("Inside download search item GET");
  let { searchWord } = req.query;
 
  connection.getConnection(function (err, conn) {
    if (err) {
      console.log("Error in creating connection!");
      res.writeHead(400, {
        "Content-type": "text/plain",
      });
      res.end("Error in creating connection!");
    } else {
      //Login validation query

      var sql = "SELECT * FROM itemdetails WHERE ItemName LIKE '%"+ (searchWord)+"%';";
      console.log(sql);
      conn.query(sql, function (err, result) {
        if (err) {
          console.log("Error in retrieving items search data");
          res.writeHead(400, {
            "Content-type": "text/plain",
          });
          res.end("Error in retrieving items search data");
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
            var filelocation = path.join(
              __dirname + "/../public/uploads",
              file
            );
            var img = fs.readFileSync(filelocation);
            var base64img = new Buffer(img).toString("base64");
            item.ItemImage = "data:image/" + filetype + ";base64," + base64img;
          }
            // console.log(result.length);
          res.end(JSON.stringify(result));
        }
      });
    }
  });
});

module.exports = app;
