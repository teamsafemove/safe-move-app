var express = require("express");
var bodyParser = require("body-parser");

var client = require("twilio")('AC63dd4f83c2c7e4c0fe510ed82af11156', 'c95b870b1b775b2f7f751f5a05cbd0ec');
var MessagingResponse = require('twilio').twiml.MessagingResponse;
var db = require("./app/models");
var iCSV = require('./import-csv.js');
var exphbs = require("express-handlebars");



var app = express();
var PORT = process.env.PORT || 8080;
//-------------------------------------------------------------------------------------------------------

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: "application/vnd.api+json"
}));
//-------------------------------------------------------------------------------------------------------

app.use(express.static("./app/assets"));
//-------------------------------------------------------------------------------------------------------


// require("./app/routes/api-routes")(app);
// require("./app/routes/html-routes")(app);
require("./app/routes/sms-routes")(app);
//-------------------------------------------------------------------------------------------------------

require("./app/routes/html-routes.js")(app);
require("./app/routes/api-routes.js")(app);


db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
        iCSV();
    });
});