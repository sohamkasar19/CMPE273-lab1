// var express = require('express');
// var app = express();

import  express  from 'express';
var app = express.Router();

import mysql from 'mysql' ;
import * as fs from 'fs';

const bufferData = fs.readFileSync('config.json');
const JSONData = bufferData.toString();
let constants = JSON.parse(JSONData);

var connection = mysql.createPool({
    // connectionLimit: 100,
    host: constants.DB.host,
    user: constants.DB.username,
    password: constants.DB.password,
    port: constants.DB.port,
    database: constants.DB.database
});

app.post('/', function (req, res) {

    console.log('Inside login POST');
    console.log('Request Body: ' + req.body.Email);

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
            var sql = 'SELECT * from user_details WHERE Username = ' + mysql.escape(req.body.Email);
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
                    if (result.length == 0 || req.body.Password != result[0].password) {
                        res.writeHead(401, {
                            'Content-type': 'text/plain'
                        })
                        console.log('Invalid Credentials!');
                        res.end('Invalid Credentials!');
                    }
                    else {
                        console.log(result);
                        // res.cookie('cookie', result[0].Firstname, {
                        //     maxAge: 360000,
                        //     httpOnly: false,
                        //     path: '/'
                        // });
                        // res.cookie('Accounttype', result[0].Accounttype, {
                        //     maxAge: 360000,
                        //     httpOnly: false,
                        //     path: '/'
                        // });
                        // req.session.user = result[0];
                        // res.writeHead(200, {
                        //     'Content-type': 'text/plain'
                        // })
                        console.log('Login successful!');
                        res.end('Login successful!');
                    }

                }
            });
        }
    });
});

//Login validation
// app.post('/', function (req, res) {

//     console.log('Inside login POST');
//     console.log('Request Body: ', req.body);

//     //Query

//     connection.getConnection(function (err, conn) {
//         if (err) {
//             console.log('Error in creating connection!');
//             res.writeHead(400, {
//                 'Content-type': 'text/plain'
//             });
//             res.end('Error in creating connection!');
//         }
//         else {

//             //Login validation query
//             var sql = 'SELECT * from userdetails WHERE Username = ' + mysql.escape(req.body.Email);
//             conn.query(sql, function (err, result) {

//                 if (err) {
//                     res.writeHead(400, {
//                         'Content-Type': 'text/plain'
//                     });
//                     res.end('Invalid Credentials!');
//                 }
//                 else {
//                     if (result.length == 0 || req.body.Password != result[0].Password) {
//                         res.writeHead(401, {
//                             'Content-type': 'text/plain'
//                         })
//                         console.log('Invalid Credentials!');
//                         res.end('Invalid Credentials!');
//                     }
//                     else {
//                         console.log(result);
//                         // res.cookie('cookie', result[0].Firstname, {
//                         //     maxAge: 360000,
//                         //     httpOnly: false,
//                         //     path: '/'
//                         // });
//                         // res.cookie('Accounttype', result[0].Accounttype, {
//                         //     maxAge: 360000,
//                         //     httpOnly: false,
//                         //     path: '/'
//                         // });
//                         // req.session.user = result[0];
//                         // res.writeHead(200, {
//                         //     'Content-type': 'text/plain'
//                         // })
//                         console.log('Login successful!');
//                         res.end('Login successful!');
//                     }

//                 }
//             });
//         }
//     });
// });

export default app;