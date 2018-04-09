var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.post('/', function(req, res){
    console.log(req.body);

    if(req.body.result.action == "checkVote"){
        var age = req.body.result.parameters.age;
        console.log(age);
        
        var response = "";

        if(age.amount >= 18){
            response = "Yes";
        }else{
            response = "No";
        }

        res.json({
            "speech": response,
            "displayText": response
        });
    }else if(req.body.result.action == "Add"){
        var sum = parseFloat(req.body.result.parameters.number2) + parseFloat(req.body.result.parameters.number1);
        var responseText = "The sum of "+ req.body.result.parameters.number2+ " and "+ req.body.result.parameters.number1 + " is "+ sum;

        res.json({
            "speech": responseText,
            "displayText": responseText
        });
    }else if(req.body.result.action == "Subtract"){
        var diff = parseFloat(req.body.result.parameters.number2) - parseFloat(req.body.result.parameters.number1);
        var responseText = "The difference between "+ req.body.result.parameters.number2 + " and "+ req.body.result.parameters.number1 + " is "+ diff;

        res.json({
            "speech": responseText,
            "displayText": responseText
        });
    }else if(req.body.result.action == "Multiply"){
        var mul = parseFloat(req.body.result.parameters.number2) * parseFloat(req.body.result.parameters.number1);
        var responseText = "The product of "+ req.body.result.parameters.number2 + " and "+ req.body.result.parameters.number1 + " is "+ mul;

        res.json({
            "speech": responseText,
            "displayText": responseText
        });
    }else if(req.body.result.action == "Divide"){
        var div = parseFloat(req.body.result.parameters.number2) / parseFloat(req.body.result.parameters.number1);
        var responseText = req.body.result.parameters.number2 + " divided by "+ req.body.result.parameters.number1 + " is "+ div;

        res.json({
            "speech": responseText,
            "displayText": responseText
        });
    }else if(req.body.result.action == "Get-weather"){
        var city = req.body.result.parameters.city;
        var url = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=977e4873c14852fdf44afe66f47c3b14";

        request(url, function(error, response, body){
            var temp = Math.round(JSON.parse(body).main.temp-273.15);
            var responseText = "Temperature in "+city+" is "+temp+" degree centigrade.";

            res.json({
                "speech": responseText,
                "displayText": responseText
            });
        })
    }
});

var port = process.env.PORT || 3000;
var ip = process.env.IP || "127.0.0.1";

app.listen(port);