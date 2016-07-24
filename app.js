var mongoose = require('mongoose');
var express = require('express');
var assignmentsRouter = require('./routes/assignments');
var index = require('./routes/index');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/', index);
app.use('/assign', assignmentsRouter);


var mongoURI = "mongodb://localhost:27017/assignments";
var mongoDB = mongoose.connect(mongoURI).connection;

mongoDB.on('error', function(err) {
  console.log('mongodb connection open!');
});


var server = app.listen(3000, function(){
  var port = server.address().port;
  console.log('Address', server.address());
  console.log('Listening on port', port);
})
