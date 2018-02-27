var request = require("request")

exports.fetch = function (url) {
    var ret = [];
    request({
        url: url,
        json: true
    }, function(error, response, body) {
        // body contains posts in body.data.children[]
        if(!error && response.statusCode == 200) {
            ret = body.data.children;
        }
        else {
            console.log("Fetch failed!");
            ret = null;
        }
    });
    return ret;
}
