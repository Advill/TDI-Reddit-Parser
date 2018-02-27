var request = require('request');
var events = require('events');

exports.fetch = function (url, eventEmitter) {
    request({
        url: url,
        json: true
    }, function(error, response, body) {
        // body contains posts in body.data.children[]
        if(!error && response.statusCode == 200) {
            eventEmitter.emit('loaded');
            return body.data.children;
        }
        else {
            console.log(error);
            console.log(response.statusCode);
            console.log("Fetch failed!");
            return null;
        }
    });
}
