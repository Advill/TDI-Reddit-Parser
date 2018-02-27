var request = require('request')
var http = require('http');

var url = "http://json.reddit.com/r/guitar/top"

request({
    url: url,
    json: true
}, function (error, response, body) {
    //body contains all data that i will need, posts are stored in
    // data.children[]
    if (!error && response.statusCode == 200) {
        console.log("creating server");
        http.createServer(function (req, res) {
            console.log("setting up formatting");
            res.writeHead(200, {'Content-Type': 'text/html'});
            for(var i = 0, len = body.data.children.length; i< len; i++) {
                if(body.data.children[i].data.hasOwnProperty("stickied")) {
                    console.log(body.data.children[i].title);
                    res.write(body.data.children[i].title);
                }
                else {
                    console.log("no title!");
                }
            }
            res.write("all done!");
        }).listen(8080);
    }
    else {
        console.log("Error when reading from reddit! Is your internet on?")
    }
});

