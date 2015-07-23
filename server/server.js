var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var User = require('./classes/user.js');
var UserModel = require('./models/user.js');
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

app.use(express.static('client'));

var url = 'mongodb://localhost:27017/local';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  io.on('connection', function(socket){
    var user = new User(socket, io, db);
  });
});

http.listen(3000);