// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function (app) {
    app.get("/home", function (req, res) {
        res.sendFile(path.join(__dirname, "../assets/html/home.html"));
    });

    app.post("/results", function (req, res) {
        res.sendFile(path.join(__dirname, "../assets/html/results.html"));
    });

}
