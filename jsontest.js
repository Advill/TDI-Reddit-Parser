var request = require("request")

var url = "http://json.reddit.com/r/guitar/top"

request({
    url: url,
    json: true
}, function (error, response, body) {
    //body contains all data that i will need, posts are stored in
    // data.children[]
    if (!error && response.statusCode == 200) {
        console.log("all good on the takedown") // Print the response
        console.log(body.data.children[0]);
        /*for(var i = 0, len = body.children.length; i< len; i++){
            console.log(body.children[i]);
        }*/
    }
    else {
        console.log("something broke")
        console.log(body);
    }
})
// taken from stackoverflow
