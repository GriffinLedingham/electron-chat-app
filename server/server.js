var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){

});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000);