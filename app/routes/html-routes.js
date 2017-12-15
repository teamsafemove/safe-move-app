// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../assets/html/home.html"));
    });

    app.post("/results", function (req, res) {
        var records = [];
        db.zhvis.findAll({ where: { City: req.body.city } }).then(function(values){
            db.crimes.findOne({where: { City: req.body.city } }).then(function(crimes){
                // console.log(crimes.Population);
                for (var i = 0; i < values.length; i++){
                    var score = 'good';
                    if (crimes.violent_crimes > 0.5 || crimes.property_crimes > 10) {
                        score = 'fair'; 
                    }
                    if (crimes.violent_crimes > 0.7 || crimes.property_crimes > 14) {
                        score = 'bad'; 
                    }
                    records.push({
                        Zip: values[i].Zip,
                        Zhvi: values[i].Zhvi,
                        City: values[i].City,
                        
                        Population: crimes.Population,
                        violent_crimes: crimes.violent_crimes,
                        property_crimes: crimes.property_crimes,
                        safety_score: score,
                    });
                }
            })
            res.render("results", {records: records});            
        })
    });

}
