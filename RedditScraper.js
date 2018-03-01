var jf = require('./JsonFetcher.js');
var http = require ('http');
var request = require('request');

var url = "http://json.reddit.com/r/guitar/top?limit=50"
var posts = [];

request({
    url: url,
    json: true
}, function (error, response, body) {
    if(!error && response.statusCode == 200) {
        posts = body.data.children;
        console.log("fetch finished!");
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
    res.write("<h1>Current Top posts on Reddit/r/guitar</h1>");
    var cnt = 0;
    for(var i = 0; i < posts.length; i++) {
        cnt++;
        res.write("<h4><a href=\"" + posts[i].data.url + "\">" + posts[i].data.title + "</a></h4>");
        res.write("<p>Score: " + posts[i].data.score +
            " <a href=\"" + posts[i].data.url + "\">Comments: " + 
            posts[i].data.num_comments + "</a></p>");
    }
    res.write("<p>" + cnt + " posts loaded</p>");
    res.end("</body></html>");
}).listen(8080);
