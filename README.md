# TDI-Reddit-Parser
A Node.js project to parse through reddit based on a search for matching  
titles.

## Goal
The goal of this project is an excersize in api design as well as an intro to
node.js.

The final program will parse the data from a subreddit and show only relavent
data where the title contains a string passed into the URL.

the final connection will look like  
`localhost:8080/redditer/[search term here]`
 
## Current State
The program runs through nodejs, and contains all requirements in 
`node_modules`. `RedditScraper.js` is the only file in use currently, as before
I was attempting to split reading into a separate module, but it ended up being
more work than it was useful.

`jsontest.js` is used for some quick testing of how to use `request` and `http`
and will not be in the finished files.

### Running
Simply run `RedditScraper.js` with node.js, and connect to 
`localhost:8080/redditer` and the current top posts from 
`json.reddit.com/r/guitar/top` will be loaded into the web page. 
