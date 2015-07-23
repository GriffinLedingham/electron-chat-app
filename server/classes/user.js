var UserModel = require('../models/user_model.js');

module.exports = function(socket, io, db) {
  var that = this;
  this.socket = socket;
  this.uuid = generateUUID();
  this.alias = null;
  this.token = null;

  this.constructor.prototype.setUUID = function(uuid){
    this.uuid = uuid;
  };

  this.constructor.prototype.setName = function(alias){
    this.alias = alias;
  };

  this.constructor.prototype.getUUID = function(){
    return this.uuid;
  };

  this.constructor.prototype.getName = function(){
    return this.alias;
  };

  this.constructor.prototype.getData = function(){
    return {
      uuid: this.uuid
    };
  };

  this.constructor.prototype.initSockBindings = function(){
    this.socket.on('send',function(msg){
      if(that.alias != null)
      {
        var payload = {
          msg: msg,
          uuid: that.uuid,
          uname: that.alias
        };
        io.sockets.emit('rcv', payload);
      }
    });

    this.socket.on('auth',function(data){
      var uname = data.uname;
      var token = data.token;

      var userModel = new UserModel(db);
      userModel.getUserDataObject(uname, function(docs){
        if(docs.length == 1)
        {
          var user = docs[0];
          if(token === user.token)
          {
            that.alias = user.uname;
            that.token = user.token;
          }
        }
      });
    });
  };

  this.initSockBindings();
};

var generateUUID = function(){
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
};