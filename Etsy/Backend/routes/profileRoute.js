var express = require('express');
var mysql = require('mysql');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var app = express();

var connection = require('./../dbConnection.js');

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

app.get('/', function (req, res) {

    console.log('Inside profile GET');
    console.log('Request Body: ' + req.body);

    //Query

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
            var sql = 'SELECT * from userdetails WHERE ProfileId = ' + mysql.escape(req.body.ProfileId);
            conn.query(sql, function (err, result) {

                if (err) {
                    console.log('Error in retrieving profile data');
                    res.writeHead(400, {
                        'Content-type': 'text/plain'
                    });
                    res.end('Error in retrieving profile data');
                }
                else {
                    // console.log(result[0].password);
                    console.log('Profile Data: ', result);
                    res.writeHead(200, {
                        'Content-type': 'application/json'
                    });
                    res.end(JSON.stringify(result[0]));

                }
            });
        }
    });
});


module.exports = app;