var http = require ('http');
var request = require('request');

var url = "http://json.reddit.com/r/guitar/top?limit=50"

/* 
 * This function Gets the data from reddit, then passes it and the given res
 * object into write if the fetch worked, or simply fails if not.
 */
var getData = function (write, res, search) {
    var posts;
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        //if there was no error, and the status code returned was ok
        if(!error && response.statusCode == 200) {
            posts = body.data.children;
            write(posts,res, search);
        //if not, log the errors, and that the fetch failed.
        } else {
            console.log(error);
            console.log(response.statusCode);
            console.log("Fetch failed!");
        }
    });
};

// write data from the posts array to res 
var writeData = function(posts, res, searchterm) { 
    var cnt = 0;
    //if loading of posts failed somehow
    if(posts == null || posts.length == 0) {
        res.write("<h2>No posts were loaded!</h2>");
        console.log("Invalid posts size!");
    }
    // show data for each post, keeping track of how many are actually shown
    for(var i = 0; i < posts.length; i++) {
        //print and increment the counter only if the title includes the search
        if(searchterm == "" || posts[i].data.title.toUpperCase().includes(
            searchterm.toUpperCase())) {
            cnt++;
            res.write("<h2><a href=\"" + posts[i].data.url + "\">" +
                posts[i].data.title + "</a></h2>");
            res.write("<p>Score: " + posts[i].data.score +
                " <a href=\"" + posts[i].data.url + "\">Comments: " + 
                posts[i].data.num_comments + "</a> Submitted by: " + 
                posts[i].data.author + "</p><hr>");
        }
    }
    res.write("<p>" + cnt + " posts loaded</p>");
    res.end("</body></html>");
};

//This is where things begin being executed when the program starts
http.createServer(function (req, res) {
    //ignoring favicon calls
    if(req.url != '/favicon.ico') {
        //if redditer is not incuded in path, 404
        if(req.url.indexOf('/redditer') != 0) {
            console.log('redditer not found!');
            res.statuscode = 404;
            res.send("Incorrect site path!");
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write("<html>");
            res.write("<body>");
            res.write("<h1>Current Top posts on Reddit/r/guitar</h1>");

            var search = req.url.substring(10);
            console.log(search);
            /* 
             * write data handles finishing the HTML formatting, because 
             * otherwise res would end right after getData was called.
             */
            getData(writeData, res, search);
        }
    }
}).listen(8080);

