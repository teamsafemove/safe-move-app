module.exports = function () {
    var db = require("./app/models");
    var fs = require('fs');
    var $ = jQuery = require('./app/jquery-csv/jquery');
    require('./app/jquery-csv/jquery.csv');


    var crimes = './app/db/oc_crimes.csv';
    fs.readFile(crimes, 'UTF-8', function (err, csv) {
        $.csv.toObjects(csv, {}, function (err, data) {
            for (var i = 0, len = data.length; i < len; i++) {
                console.log(data[i]);
                db.crimes.create(data[i]);
            }
        });
    });
}