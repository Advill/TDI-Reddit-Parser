var jf = require('./JsonFetcher.js');
var http = require ('http');

var url = "http://json.reddit.com/r/guitar/top"
var posts = jf.fetch(url);

if(posts == null) {
    console.log("null!");
    process.exit(1);
}

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("hello!");
    console.log(posts.length);
    for(var i = 0; i < posts.length; i++) {
        console.log(posts[i].title + "\n");
        res.write(posts[i].title + "\n");
    }
    res.end();
}).listen(8080);
