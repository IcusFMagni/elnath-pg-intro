var express = require('express');
var pg = require('pg')
var bodyParser = require('body-parser');
var app = express();
var port = 5000;


app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

var config = {
    database: 'shoestore', //name of database
    host: 'localhost',//where is your database
    port: 5432,//port number for database
    max: 10, //how many connections at one time
    idleTimeoutMillies: 30000// 30 sec to try and connect
};

var pool = new pg.Pool(config);



app.get('/shoes', function (req, res) {
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

app.post('/shoes', function(req, res) {
    pool.connect(function(errorConnectingToDatabase,client,done){
        if(errorConnectingToDatabase) {
            res.sendStatus(500)
        } else {
            client.query(`INSERT INTO shoes (name, cost)
            VALUES ($1, $2)`,[req.body.name, req.body.cost], function (errorMakingQuery,result) {
                done();
                if(errorMakingQuery){
                    console.log('query failed', errorMakingQuery)
                    res.sendStatus(500)
                } else {
                    res.sendStatus(201)
                }
            }
        
        )
        }
    })
})

app.listen(port, function(){
    console.log('listening on port:', port)
})
