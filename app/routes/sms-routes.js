var db = require("../models");
//-------------------------------------------------------------------------------------------------------
var client = require("twilio")('AC63dd4f83c2c7e4c0fe510ed82af11156', 'c95b870b1b775b2f7f751f5a05cbd0ec');
var MessagingResponse = require('twilio').twiml.MessagingResponse;
//-------------------------------------------------------------------------------------------------------
module.exports = function (app) {
    app.post('/sms', (req, res) => {
        const twiml = new MessagingResponse();
        var userMessage = parseInt(req.body.Body);
        if (userMessage.toString().length == 5 & typeof userMessage == "number") {
            twiml.message("You typed in the zipcode " +
                userMessage + ". Please wait while we search that for you...");
        } else {
            console.log(typeof userMessage, userMessage.toString().length, userMessage);
            twiml.message("That's not a zipcode I recognize");
        }


        res.writeHead(200, {
            'Content-Type': 'text/xml'
        });
        res.end(twiml.toString());
    });
}