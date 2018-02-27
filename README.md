# TDI-Reddit-Parser
A Node.js project to parse through reddit based on a search for matching  
titles.

## Goal
The goal of this project is an excersize in api design as well as an intro to
node.js. The program wont be doing anything fancy or laying data out in a nice
way, it will simply be showing that data can be pulled from reddit and hosted 
locally.

## Current State
In its current form, this program has 2 parts, the first being `jsontest.js` 
which serves as a sort of proof-of-concept and practice at grabbing posts from 
reddit in a reasonable way. The second is `RedditScraper.js` and 
`JsonFetcher.js`, which will be the main finished product.

Right now JsonFetcher.js should be grabbing all the data from /r/guitar/top and
passing RedditScraper.js only the posts, but I'm having trouble getting them
from one method to the other.
