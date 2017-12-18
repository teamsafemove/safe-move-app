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
        res.sendFile(path.join(__dirname, "../assets/html/results.html"));
    });
}
