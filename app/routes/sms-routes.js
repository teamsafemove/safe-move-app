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
            console.log(city, cost);


        } else {
            console.log(typeof userMessage, userMessage.toString().length, userMessage);
            twiml.message("That's not a zipcode I recognize");
            res.writeHead(200, {
                'Content-Type': 'text/xml'
            });
            res.end(twiml.toString());
        }


    });


    function searchZip(zip, res) {
        db.zhvis.findOne({
            where: {
                Zip: zip
            }
        }).then(result => {
            result = result.dataValues;
            cost = result.Zhvi;
            //this bit of code takes a number and formats it to xxx,xxx.yy for displaying money
            cost = cost.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
            city = result.City;
            twiml.message("Info for zipcode  " +
                zip + ".\nCity: " + city + "\nCost: $" + cost);

            res.writeHead(200, {
                'Content-Type': 'text/xml'
            });
            res.end(twiml.toString());
        });
    }
};