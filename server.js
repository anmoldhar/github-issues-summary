// modules required to load installed using npm
var express = require('express');
var app = express();
var path = require('path');

// set our port
app.set('port', (process.env.PORT || 5000));

//make current directory static so as to load css/js files from current directory
app.use(express.static(__dirname ));

// viewed at http://localhost:5000		
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// log to print on which port our app is running
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});