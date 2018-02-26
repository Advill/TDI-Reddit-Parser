var request = require("request")

var url = "http://json.reddit.com/r/guitar/top"

request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode == 200) {
        console.log(body) // Print the response
    }
})
// taken from stackoverflow
