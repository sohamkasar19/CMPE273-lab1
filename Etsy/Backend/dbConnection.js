import mysql from 'mysql' ;
import * as fs from 'fs';

const bufferData = fs.readFileSync('config.json');
const JSONData = bufferData.toString();
let constants = JSON.parse(JSONData);

const connection = mysql.createPool({
    // connectionLimit: 100,
    host: constants.DB.host,
    user: constants.DB.username,
    password: constants.DB.password,
    port: constants.DB.port,
    database: constants.DB.database
});

export default connection;

// var mysql = require('mysql');
// const connection = mysql.createPool({
//     // connectionLimit: 100,
//     host: constants.DB.host,
//     user: constants.DB.username,
//     password: constants.DB.password,
//     port: constants.DB.port,
//     database: constants.DB.database
// });

// export default connection;
// // module.exports = connection;