var express = require('express');
var mysql = require('mysql');
// var session = require('express-session');
// var session = require('cookie-session');
var cookieParser = require('cookie-parser');
var app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;

var connection = require('./../dbConnection.js');


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

app.post('/', (req, res)=>{
    
    connection.getConnection((err, conn)=>{
        if (err) {
            console.log('Error in creating connection!');
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in creating connection!');
        }else{
            console.log("connection done");
            console.log(req.body);
            const hashed_password = bcrypt.hashSync(req.body.Password, saltRounds)   ;
            var sql = 'INSERT INTO userdetails (Email,Password,Name)  VALUES('+ mysql.escape(req.body.Email)+','+ mysql.escape(hashed_password)+','+ mysql.escape(req.body.Name)+');';
            conn.query(sql,  (err, result)=> {
                if (err) {
                    console.log('Invalid Credentials! 1111');
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    });
                    res.end('Invalid Credentials!');
                }else{
                    console.log("SignedUp");
                    res.end("Signed Up");
                }
            });
        }
        conn.release();
    })
});


module.exports = app;
