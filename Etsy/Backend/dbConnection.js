var mysql = require('mysql');

var constants = require('./config.json');

const connection = mysql.createPool({
    connectionLimit: 1000,
    host: constants.DB.host,
    user: constants.DB.username,
    password: constants.DB.password,
    port: constants.DB.port,
    database: constants.DB.database
});

module.exports = connection;

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