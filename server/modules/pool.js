var pg = require('pg');

var config = {
    database: 'shoestore', //name of database
    host: 'localhost',//where is your database
    port: 5432,//port number for database
    max: 10, //how many connections at one time
    idleTimeoutMillies: 30000// 30 sec to try and connect
};



module.exports = new pg.Pool(config);