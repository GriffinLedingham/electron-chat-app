var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var User = require('./classes/user.js');

app.use(express.static('client'));

io.on('connection', function(socket){
  var user = new User(socket, io);
});

http.listen(3000);