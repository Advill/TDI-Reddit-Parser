var jf = require('./JsonFetcher.js');
var http = require ('http');
var request = require('request');

var url = "http://json.reddit.com/r/guitar/top?limit=50"

/* 
 * This function Gets the data from reddit, then passes it and the given res
 * object into write if the fetch worked, or simply fails if not.
 */
var getData = function (write, res) {
    var posts;
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        //if there was no error, and the status code returned was ok
        if(!error && response.statusCode == 200) {
            posts = body.data.children;
            write(posts,res);
        //if not, log the errors, and that the fetch failed.
        } else {
            console.log(error);
            console.log(response.statusCode);
            console.log("Fetch failed!");
        }
    });
};

// write data from the posts array to res 
var writeData = function(posts, res) { 
    var cnt = 0;
    for(var i = 0; i < posts.length; i++) {
        cnt++;
        res.write("<h4><a href=\"" + posts[i].data.url + "\">" +
            posts[i].data.title + "</a></h4>");
        res.write("<p>Score: " + posts[i].data.score +
            " <a href=\"" + posts[i].data.url + "\">Comments: " + 
            posts[i].data.num_comments + "</a></p>");
    }
    res.write("<p>" + cnt + " posts loaded</p>");
    res.end("</body></html>");
};

//This is where things begin being executed when the program starts
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("<html>");
    res.write("<body>");
    res.write("<h1>Current Top posts on Reddit/r/guitar</h1>");
    /* 
     * write data handles finishing the HTML formatting, because otherwise 
     * res would end right after getData was called.
     */
    getData(writeData, res);
}).listen(8080);

