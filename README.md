# TDI-Reddit-Parser
A Node.js project to parse through reddit based on a search for matching  
titles.

## Goal
The goal of this project is an excersize in api design as well as an intro to
node.js.

The final program will parse the data from a subreddit and show only relavent
data where the title contains a string passed into the URL.
 
## Current State
The program runs through nodejs, and contains all requirements in 
`node_modules`. `server.js` is the only file in use currently, as before
I was attempting to split reading into a separate module, but it ended up being
more work than it was useful.

### Running
Simply run `server.js` with node.js, and connect to 
`localhost:8080/redditer` and the current top posts from 
`json.reddit.com/r/guitar/top` will be loaded into the web page. 

running `localhost:8080/redditer/xyz` where `xyz` is a search term of your
choice and the only thing that is displayed will be posts that contain the term
in the title of the post.

This version of the program will actually give a formatted JSON response,
so a browser-based JSON vewier will be useful in decoding it.
