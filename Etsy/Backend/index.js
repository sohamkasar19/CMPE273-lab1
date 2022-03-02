// var express = require('express');
// var cors = require('cors');
// var mysql = require('mysql');
// const router = express.Router();

import  express  from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mysql from 'mysql' ;
import * as fs from 'fs';
import bodyParser from 'body-parser';
 
import loginRoute from './routes/login.js';

var app = express();

const bufferData = fs.readFileSync('config.json');
const JSONData = bufferData.toString();
let constants = JSON.parse(JSONData);
console.log(constants.DB)
//set up cors
app.use(cors({ origin: constants.frontEnd, credentials: true }));

//DB connection
var connection = mysql.createPool({
    // connectionLimit: 100,
    host: constants.DB.host,
    user: constants.DB.username,
    password: constants.DB.password,
    port: constants.DB.port,
    database: constants.DB.database
});

connection.getConnection((err) => {
    if(err) {
        throw  'Error occured: ' + err;  
    }
    console.log("pool created");
})
app.use(bodyParser.json());

app.use('/login', loginRoute);
// app.post('/login', function (req, res) {

//     console.log('Inside login POST');
//     console.log('Request Body: ' + req.body.Email);

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
//             console.log("No error");
//             var sql = 'SELECT * from user_details WHERE Username = ' + mysql.escape(req.body.Email);
//             conn.query(sql, function (err, result) {

//                 if (err) {
//                     console.log('Invalid Credentials! 1111');
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

app.get('/', (req, res) => {
    console.log('TEST');
    res.send('Hello from HomePage')
});

app.listen(8080, ()=>{
    console.log("Running on 8080");
})

