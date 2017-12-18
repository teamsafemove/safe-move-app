var db = require("../models");
//-------------------------------------------------------------------------------------------------------
var client = require("twilio")('AC63dd4f83c2c7e4c0fe510ed82af11156', 'c95b870b1b775b2f7f751f5a05cbd0ec');
var MessagingResponse = require('twilio').twiml.MessagingResponse;
const twiml = new MessagingResponse();
//-------------------------------------------------------------------------------------------------------
city = '';
cost = 0;
//-------------------------------------------------------------------------------------------------------


module.exports = function (app) {
    app.post('/sms', (req, res) => {
        var userMessage = parseInt(req.body.Body);

        if (userMessage.toString().length == 5 & typeof userMessage == "number") {
            searchZip(userMessage, res);


        } else {
            console.log(typeof userMessage, userMessage.toString().length, userMessage);
            searchCity(userMessage, res);
        }


    });

    function searchZip(zip, res) {
        db.zhvis.findOne({
            where: {
                Zip: zip
            }
        }).then(result => {
            if (!result) {
                twiml.message("Zip not found");

                res.writeHead(200, {
                    'Content-Type': 'text/xml'
                });
                res.end(twiml.toString());
                return;
            }
            result = result.dataValues;
            cost = result.Zhvi;
            //this bit of code takes a number and formats it to xxx,xxx.yy for displaying money
            cost = cost.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
            city = result.City;
            db.crimes.findOne({
                where: {
                    City: city
                }
            }).then(crime => {
                vCrimes = crime.violent_crimes;
                pCrimes = crime.property_crimes;
                population = crime.Population;

                twiml.message("Info for zipcode  " +
                    zip + ".\nCity: " + city + "\nCost: $" + cost + "\nPopulation: " + population + "\nViolence index: " + vCrimes + "\nProperty Crime Index: " + pCrimes
                );

                res.writeHead(200, {
                    'Content-Type': 'text/xml'
                });
                res.end(twiml.toString());
            });
        });
    }

    function searchCity(City, res) {
        db.zhvis.findOne({
            where: {
                City: City
            }
        }).then(result => {
            if (!result) {
                twiml.message("City not found");
                res.writeHead(200, {
                    'Content-Type': 'text/xml'
                });
                res.end(twiml.toString());
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/xml'
            });
            res.end(twiml.toString());
        })
        result = result.dataValues;
        cost = result.Zhvi;
        //this bit of code takes a number and formats it to xxx,xxx.yy for displaying money
        cost = cost.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        db.crimes.findOne({
            where: {
                City: City
            }
        }).then(crime => {
            vCrimes = crime.violent_crimes;
            pCrimes = crime.property_crimes;
            population = crime.Population;

            twiml.message("Info for zipcode  " +
                zip + ".\nCity: " + city + "\nCost: $" + cost + "\nPopulation: " + population + "\nViolence index: " + vCrimes + "\nProperty Crime Index: " + pCrimes
            );

            res.writeHead(200, {
                'Content-Type': 'text/xml'
            });
            res.end(twiml.toString());
        });
    }
};
