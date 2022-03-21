var mysql = require('mysql');

var constants = require('./config.json');

const connection2 = mysql.createConnection({
    host: constants.DB.host,
    user: constants.DB.username,
    password: constants.DB.password,
    port: constants.DB.port,
    database: constants.DB.database,
    waitForConnection: true
});

module.exports = connection2;
