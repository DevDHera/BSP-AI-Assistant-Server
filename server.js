var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.post('/', function(req, res){
    console.log(req.body);
});

var port = process.env.PORT || 3000;
var ip = process.env.IP || "127.0.0.1";

app.listen(port, ip);