var express = require('express');
var mysql = require('mysql');
var session = require('express-session');
// var cookieSession  = require("cookie-session");
var cookieParser = require("cookie-parser");
var jwt = require('jsonwebtoken');
require("dotenv").config();
const bcrypt = require('bcrypt');
const saltRounds = 10;
var app = express();

var connection = require('./../dbConnection.js');
app.use(cookieParser());



app.get('/', function(req, res) {
    console.log(req.session.user);
    res.end(req.session.user);
})

app.post('/', function (req, res) {

    console.log('Inside login POST');
    console.log('Request Body: ' + req.body.Email);

    connection.getConnection(function (err, conn) {
        if (err) {
            console.log('Error in creating connection!');
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in creating connection!');
        }
        else {
            //Login validation query
            console.log("No error");
            var sql = 'SELECT * from userdetails WHERE Email = ' + mysql.escape(req.body.Email);
            conn.query(sql, function (err, result) {

                if (err) {
                    console.log('Invalid Credentials! 1111');
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    });
                    res.end('Invalid Credentials!');
                }
                else {
                    // console.log(result[0].password);
                    if (result.length == 0 || bcrypt.compareSync(req.body.Password, result[0].Password)) {
                        res.writeHead(201, {
                            'Content-type': 'text/plain'
                        })
                        console.log('Invalid Credentials!');
                        res.end('Invalid Credentials!');
                    }
                    else {
                        
                        
                        // console.log(process.env.SECRET);
                        const token = jwt.sign({"id":result[0].ProfileId},process.env.SECRET);
                        
                        console.log('Login successful!');

                        let userdetails = result[0]
                        return res.json({token});
                    }
                }
            });
        }
        conn.release();
    });
});


module.exports = app;