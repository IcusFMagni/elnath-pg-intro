var express = require("express");
var router = express.Router();

var pool = require('../modules/pool.js');

router.get('/', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase) {
            console.log('error connecting to database', errorConnectingToDatabase)
            res.sendStatus(500)
        } else {
            client.query('SELECT * FROM shoes', function (errorMakingQuery, result){
                done();
                if(errorMakingQuery) {
                    console.log('query failed', errorMakingQuery)
                    res.sendStatus(500)
                } else {
                    res.send(result.rows);
                }
            })
        }

    })
})

router.post('/', function(req, res) {
    pool.connect(function(errorConnectingToDatabase,client,done){
        if(errorConnectingToDatabase) {
            res.sendStatus(500)
        } else {
            client.query(`INSERT INTO shoes (name, cost)
            VALUES ($1, $2);`,[req.body.name, req.body.cost], function (errorMakingQuery,result) {
                done();
                if(errorMakingQuery){
                    console.log('query failed', errorMakingQuery)
                    res.sendStatus(500)
                } else {
                    res.sendStatus(201)
                }
            }
        
        )}
    })
})

module.exports = router