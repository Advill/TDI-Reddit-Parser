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

var postToObject = function(post) {
    var obj = {
        title: post.data.title,
        score: post.data.score,
        author: post.data.author,
        comments: post.data.num_commments,
        url: post.data.url
    };
    return obj
};

// write data from the posts array to res 
var writeData = function(posts, res, searchterm) { 
    //if loading of posts failed somehow
    if(posts == null || posts.length == 0) {
        console.log("Invalid posts size!");
    }
    var list = [];
    // show data for each post, keeping track of how many are actually shown
    for(var i = 0; i < posts.length; i++) {
        //print and increment the counter only if the title includes the search
        if(searchterm == "" || posts[i].data.title.toUpperCase().includes(
            searchterm.toUpperCase())) {
            list.push(postToObject(posts[i]));
        }
    }
    res.write(JSON.stringify(list));
};

//This is where things begin being executed when the program starts
http.createServer(function (req, res) {
    //ignoring favicon calls
    if(req.url != '/favicon.ico') {
        //if redditer is not incuded in path, 404
        if(req.url.indexOf('/redditer') != 0) {
            console.log('redditer not found!');
            res.statuscode = 404;
        } else {

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

