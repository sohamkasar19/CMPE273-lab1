var express = require("express");
var mysql = require("mysql");
var app = express();
var uuid = require("uuid");
const jwt = require("jsonwebtoken");
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
  let ProfileId = decode.id
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
              "INSERT INTO orderdetails(OrderId, ItemId, Quantity) VALUES(" +
              mysql.escape(OrderId) +
              "," +
              mysql.escape(item.ItemId) +
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
                console.log("Order details POST done");
                res.end("Order details POST done");
              }
            });
          });
        }
      });
    //   console.log("after orderTableInserted" + orderTableInserted);
      //   const addItemsToOrderDetails = (OrderId, addedItems) => {
      // addedItems.map((item) => {
      //     var sql =
      //       "INSERT INTO orderdetails(OrderId, ItemId, Quantity) VALUES(" +
      //       mysql.escape(OrderId) +
      //       "," +
      //       mysql.escape(item.ItemId) +
      //       "," +
      //       mysql.escape(item.quantityInCart) +
      //       ");";
      //       conn.query(sql, function (err, result) {
      //           if (err) {
      //             console.log("Error in adding orderdetails data");
      //             res.writeHead(400, {
      //               "Content-type": "text/plain",
      //             });
      //             res.end("Error in adding orderdetails data");
      //           } else {
      //               console.log("Order details POST done");
      //               res.end("Order details POST done")
      //           }
      //         });
      //   });
      //   }
    }
  });
});

// app.get("/details", function (req, res) {
//   console.log("Inside item  GET");
//   console.log("Request Body ItemId: " + req.query.ItemId);
//   const ItemId = req.query.ItemId;
//   connection.getConnection(function (err, conn) {
//     if (err) {
//       console.log("Error in creating connection!");
//       res.writeHead(400, {
//         "Content-type": "text/plain",
//       });
//       res.end("Error in creating connection!");
//     } else {
//       //Login validation query

//       var sql =
//         "SELECT * from itemdetails WHERE ItemId = " + mysql.escape(ItemId);
//       conn.query(sql, function (err, result) {
//         if (err) {
//           console.log("Error in retrieving single item data");
//           res.writeHead(400, {
//             "Content-type": "text/plain",
//           });
//           res.end("Error in retrieving single item data");
//         } else {
//           // console.log(result[0].password);
//           //   console.log("Items Data: ", result);
//           res.writeHead(200, {
//             "Content-type": "application/json",
//           });
//           for (const [key, item] of Object.entries(result)) {
//             var file = item.ItemImage;
//             var filetype = file.split(".").pop();
//             console.log(file);
//             var filelocation = path.join(__dirname + "/../public/items", file);
//             var img = fs.readFileSync(filelocation);
//             var base64img = new Buffer(img).toString("base64");
//             item.ItemImage = "data:image/" + filetype + ";base64," + base64img;
//           }
//           //   console.log(result);
//           res.end(JSON.stringify(result));
//         }
//       });
//     }
//   });
// });

module.exports = app;
