var express = require("express");
var bodyParser = require("body-parser");
var client = require("twilio")('AC63dd4f83c2c7e4c0fe510ed82af11156', 'c95b870b1b775b2f7f751f5a05cbd0ec');

var app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: "application/vnd.api+json"
}));

app.use(express.static("./app/assets"));



app.get("/api/test", function (req, res) {
    client.sendMessage({

    });
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});