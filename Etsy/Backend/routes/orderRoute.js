var express = require("express");
var mysql = require("mysql");
var app = express();
var uuid = require("uuid");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

var connection = require("../dbConnection.js");

app.post("/add", function (req, res) {
  console.log("Inside add order POST");
  const { addedItems, total, token } = req.body;
  console.log(req.body);
  let decode = null;
  try {
    decode = jwt.verify(token, process.env.SECRET);
  } catch (error) {
    return res.status(400).send("invalid token");
  }
  let ProfileId = decode.id;
  console.log("Inside checkout Post" + ProfileId);
  //   console.log(addedItems[0].ItemId+ " "+total);
  connection.getConnection(function (err, conn) {
    if (err) {
      console.log("Error in creating connection!");
      res.writeHead(400, {
        "Content-type": "text/plain",
      });
      res.end("Error in creating connection!");
    } else {
      //Login validation query
      const OrderId = uuid.v1();
      var sql =
        "INSERT INTO ordertable(OrderId, ProfileId, OrderDate, Total) VALUES(" +
        mysql.escape(OrderId) +
        "," +
        mysql.escape(ProfileId) +
        ", CURDATE()," +
        mysql.escape(total) +
        ");";
      let orderTableInserted = false;
      conn.query(sql, function (err, result) {
        if (err) {
          console.log("Error in adding ordertable data");
          res.writeHead(400, {
            "Content-type": "text/plain",
          });
          res.end("Error in adding ordertable data");
        } else {
          //   addItemsToOrderDetails(OrderId, addedItems);
          console.log("Adding to orderdetails");
          addedItems.map((item) => {
            var sql2 =
              "INSERT INTO orderdetails(OrderId, ItemId, ItemName, Price, Quantity) VALUES(" +
              mysql.escape(OrderId) +
              "," +
              mysql.escape(item.ItemId) +
              "," +
              mysql.escape(item.ItemName) +
              "," +
              mysql.escape(item.Price) +
              "," +
              mysql.escape(item.quantityInCart) +
              ");";
            conn.query(sql2, function (err, result) {
              if (err) {
                console.log("Error in adding orderdetails data");
                res.writeHead(400, {
                  "Content-type": "text/plain",
                });
                res.end("Error in adding orderdetails data");
              } else {
                // console.log("Order details POST done");
                // res.end("Order details POST done");
                var sql3 =
                  "UPDATE itemdetails SET QuantityAvailable = QuantityAvailable - " +
                  mysql.escape(item.quantityInCart) +
                  ",QuantitySold = QuantitySold + " +
                  mysql.escape(item.quantityInCart) +
                  " WHERE ItemID = " +
                  mysql.escape(item.ItemId) +
                  ";";
                console.log(sql3);
                conn.query(sql3, function (err, result) {
                  if (err) {
                    console.log("Error in adding orderdetails data");
                    res.writeHead(400, {
                      "Content-type": "text/plain",
                    });
                    res.end("Error in adding orderdetails data");
                  } else {
                    console.log("Order details POST done");
                    res.end("Order details POST done");
                  }
                });
              }
            });
          });
        }
      });
    }
  });
});

app.get("/all-orders", function (req, res) {
  console.log("Inside all order details  GET");
  //   console.log("Request Body ItemId: " + req.query.ItemId);
  const token = req.query.token;
  console.log(token );
  let decode = null; 
  try {
    decode = jwt.verify(token, process.env.SECRET);
  } catch (error) {
    return res.status(400).send("invalid token");
  }
  let ProfileId = decode.id;

  console.log("Inside all order details  GET" + ProfileId);
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
        "SELECT * FROM ordertable  WHERE  ProfileId = " +
        mysql.escape(ProfileId);
      //   console.log(sql);
      conn.query(sql, function (err, result) {
        if (err) {
          console.log("Error in retrieving from orderTable ");
          res.writeHead(400, {
            "Content-type": "text/plain",
          });
          res.end("Error in retrieving from orderTable ");
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

app.get("/details", function (req, res) {
  console.log("Inside  order details  GET");
  //   console.log("Request Body ItemId: " + req.query.ItemId);
  const OrderId = req.query.OrderId;
  // console.log(token);

  // console.log("Inside order details  GET" + ProfileId);
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
        "SELECT orderdetails.OrderId, orderdetails.ItemName, orderdetails.Price, orderdetails.Quantity, itemdetails.ItemImage  FROM orderdetails INNER JOIN itemdetails ON orderdetails.ItemId = itemdetails.ItemId  WHERE  OrderId = " +
        mysql.escape(OrderId);
      //   console.log(sql);
      conn.query(sql, function (err, result) {
        if (err) {
          console.log("Error in retrieving from orderTable ");
          res.writeHead(400, {
            "Content-type": "text/plain",
          });
          res.end("Error in retrieving from orderTable ");
        } else {
          // console.log(result[0].password);
          //   console.log("Items Data: ", result);
          res.writeHead(200, {
            "Content-type": "application/json",
          });
          //   console.log(result);
          for (const [key, item] of Object.entries(result)) {
            var file = item.ItemImage;
            var filetype = file.split(".").pop();
            console.log(file);
            var filelocation = path.join(__dirname + "/../public/uploads", file);
            var img = fs.readFileSync(filelocation);
            var base64img = new Buffer(img).toString("base64");
            item.ItemImage = "data:image/" + filetype + ";base64," + base64img;
          }
          res.end(JSON.stringify(result));
        }
      });
    }
  });
});

module.exports = app;
