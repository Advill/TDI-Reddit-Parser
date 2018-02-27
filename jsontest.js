var request = require("request")

var url = "http://json.reddit.com/r/guitar/top"

request({
    url: url,
    json: true
}, function (error, response, body) {
    //body contains all data that i will need, posts are stored in
    // data.children[]
    if (!error && response.statusCode == 200) {
        for(var i = 0, len = body.data.children.length; i< len; i++){
            console.log(body.data.children[i]);
        }
    }
    else {
        console.log("Error when reading from reddit! Is your internet on?")
    }
})
