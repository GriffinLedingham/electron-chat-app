var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var User = require('./classes/user.js');
var UserModel = require('./models/user_model.js');
var url = 'mongodb://localhost:27017/local';
var bodyParser = require("body-parser");

app.use(express.static('client'));
app.use(bodyParser.urlencoded({
  extended: true
}));

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  setExpressRoutes(db);
  io.on('connection', function(socket){
    var user = new User(socket, io, db);
  });
});
http.listen(3000);

var setExpressRoutes = function(db){

  app.post('/create',function(req,res){
    var userModel = new UserModel(db);
    userModel.createUserDataObject(req.body.username,req.body.password, req.body.email,function(response){
      res.send(response);
      res.end();
    });
  });

  app.post('/session',function(req,res){
    var userModel = new UserModel(db);
    userModel.getUserDataObject(req.body.username,function(response){
      var result = false;
      if(response.length == 1 && req.body.token === response[0].token)
      {
        result = true;
      }
      res.send(result);
      res.end();
    });
  });

  app.post('/login',function(req,res){
    var userModel = new UserModel(db);
    userModel.loginUser(req.body.username,req.body.password,function(response,token){
      if(response === true)
      {
        res.send({result: true, uname: req.body.username, token: token});
        res.end();
      }
      else
      {
        res.send(response);
        res.end();
      }
    });
  });
};