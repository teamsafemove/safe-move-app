var express = require("express");
var bodyParser = require("body-parser");
//-------------------------------------------------------------------------------------------------------
var app = express();
var PORT = process.env.PORT || 8080;
//-------------------------------------------------------------------------------------------------------
var db = require("./app/models");
var iCSV = require('./import-csv.js');

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
//-------------------------------------------------------------------------------------------------------
// require("./app/routes/api-routes")(app);
// require("./app/routes/html-routes")(app);
require("./app/routes/sms-routes")(app);
//-------------------------------------------------------------------------------------------------------
db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
        iCSV();
    });
});