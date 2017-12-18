var path = require("path");
var db = require("../models");

module.exports = function (app) {

    app.get("/api/city", function (req, res) {
        var searchCity = req.query.city;
        db.crimes.findOne({ where: { City: searchCity } }).then(function (city) {
            db.zhvis.findAll({ where: { City: searchCity } }).then(function (zips) {
                res.json({city: city, zips: zips});
            })
            
        })
    });
    app.get("/api/comments", function(req, res){
        var searchCity = req.query.city;
        db.comments.findAll({ where: {
            City: searchCity }, order: [["createdAt", "DESC"], ["id", "DESC"]]
        }).then(function(allComments){
            res.json({comments: allComments});
        })
    });
    app.post("/api/comments", function(req, res){
        var city = req.body.city;
        var comment = req.body.comment;
        db.comments.create({Comment: comment, City: city}).then(function(result){
            res.json({message: "OK"});
        }).catch(function (error) {
            console.warn('Skipping record:', error);
        });    
    });
};
