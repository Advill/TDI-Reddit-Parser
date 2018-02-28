var jf = require('./JsonFetcher.js');
var http = require ('http');
var request = require('request');

var url = "http://json.reddit.com/r/guitar/top"
var posts = [];

request({
    url: url,
    json: true
}, function (error, response, body) {
    if(!error && response.statusCode == 200) {
        posts = body.data.children;
    } else {
        console.log(error);
        console.log(response.statusCode);
        console.log("Fetch failed!");
        posts = null;
    }
});

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("<html>");
    res.write("<body>");
    res.write("<h1>hello!</h1>");
    console.log(posts.length);
    for(var i = 0; i < posts.length; i++) {
        res.write("<p>" + posts[i].data.title + "</p>");
    }
    res.end();
}).listen(8080);
