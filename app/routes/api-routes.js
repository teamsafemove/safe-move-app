var path = require("path");
var db = require("../models");

module.exports = function (app) {

    app.get("/api/city", function (req, res) {
        searchCity = req.query.city;
        db.crimes.findOne({ where: { City: searchCity } }).then(function (city) {
            console.log("Found criminal records for:", req.query.city);
            db.zhvis.findAll({ where: { City: searchCity } }).then(function (zips) {
                console.log("Found price records for:", req.query.city, zips.length);
                res.json({city: city, zips: zips});
            })
            
        })
    });
};
