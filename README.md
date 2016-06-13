# github-issues-summary
Analyse various issues of particular github repository. This is a single-page application which uses html, css, Angular and Bootstrap for Frontend and Node with Express for backend interaction( used for deploying application). 

Live Application URL(Deployed in Heroku using node): https://ancient-chamber-7595.herokuapp.com/
NOTE: Only supported for google chrome web browser due to limited time span.

Working:
When user goes to specific url. Node server on getting request will send index.html file which uses angular JS to send http requests and interact with github api. On receiving successful response corresponding values are dynamically updated in table. For full working i have properly commented my source code.

What can be improved:
1) cross browser support. To run on internet explorer as well as firefox properly.
2) Some animations can be added while displaying table for better UI.
3) In case of incorrect URL we can display the error code instead of doing nothing. In short improve error checking.