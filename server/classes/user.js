module.exports = function(socket, io) {
  var that = this;
  this.socket = socket;
  this.uuid = generateUUID();

  this.constructor.prototype.setUUID = function(){
    this.uuid = this.uuid;
  }

  this.constructor.prototype.setName = function(){
    this.alias = this.alias;
  }

  this.constructor.prototype.getUUID = function(){
    return this.uuid;
  }

  this.constructor.prototype.getName = function(){
    return this.alias;
  }

  this.constructor.prototype.initSockBindings = function(){
    this.socket.on('send',function(msg){
      var payload = {
        msg: msg,
        uuid: that.uuid
      };
      console.log(io);
      io.sockets.emit('rcv', payload);
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