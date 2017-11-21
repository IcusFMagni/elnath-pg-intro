var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 5000;
var shoes = require('./routes/shoes')


app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));


app.use('/shoes', shoes)

app.listen(port, function(){
    console.log('listening on port:', port)
})
