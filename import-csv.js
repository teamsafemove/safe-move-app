
module.exports = function () {
    var db = require("./app/models");
    var fs = require('fs');
    var $ = jQuery = require('./app/jquery-csv/jquery');
    require('./app/jquery-csv/jquery.csv');


    var crimes = './app/db/oc_crimes.csv';
    fs.readFile(crimes, 'UTF-8', function (err, csv) {
        // convert csv to Object
        $.csv.toObjects(csv, {}, function (err, data) {
            for (var i = 0, len = data.length; i < len; i++) {
                //  suppriss error to dublicate entries
                db.crimes.create(data[i]).catch(function (error) {
                    console.warn('Skipping record:', error.parent.sqlMessage);
                });
            }
        });
    });

    var zhvi = './app/db/oc_prices.csv';
    fs.readFile(zhvi, 'UTF-8', function (err, hotdog) {
        // convert csv to Object
        $.csv.toObjects(hotdog, {}, function (err, data) {
            for (var i = 0, len = data.length; i < len; i++) {
                //  suppriss error to dublicate entries
                db.zhvis.create(data[i]).catch(function (error) {
                    console.warn('Skipping record:', error.parent.sqlMessage);
                });
            }
        });
    });
}