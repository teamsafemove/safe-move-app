var express = require("express");
var bodyParser = require("body-parser");
var client = require("twilio")('AC63dd4f83c2c7e4c0fe510ed82af11156', 'c95b870b1b775b2f7f751f5a05cbd0ec');
var MessagingResponse = require('twilio').twiml.MessagingResponse;
var db = require("./app/models");
var iCSV = require('./import-csv.js');



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
    client.messages.create({
        to: '+17029856854',
        from: '+19496122211',
        body: 'IT FUCKING WORKS!'
    });

    res.end();
});

app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();

    twiml.message('The Robots are coming! Head for the hills!');
    res.writeHead(200, {
        'Content-Type': 'text/xml'
    });
    console.log(req.body.Body);
    res.end(twiml.toString());
});

db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
        iCSV();
    });
});