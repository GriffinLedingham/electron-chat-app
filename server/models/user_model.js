var bcrypt = require('bcrypt');

module.exports = function(db) {
  var that = this;

  this.constructor.prototype.getUserDataObject = function(username, callback) {
    var collection = db.collection('users');
    collection.find({uname : username}).toArray(function(err, docs) {
      callback(docs);
    });
  };

  this.constructor.prototype.createUserDataObject = function(username, password, email, callback) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        var payload = {
          uname: username,
          email: email,
          pass: hash
        };
        var collection = db.collection('users');
        collection.insert([payload], function(err, res) {
          callback(res);
        });
      });
    });
  };

  this.constructor.prototype.updateUser = function(user, callback){
    var collection = db.collection('users');
    collection.update({uname: user.uname}, { $set: user }, function(err, result){
      callback();
    });
  };

  this.constructor.prototype.loginUser = function(username, password, callback){
    that.getUserDataObject(username, function(docs){
      if(docs.length === 1)
      {
        bcrypt.compare(password, docs[0].pass, function(err, res) {
          if(res) {
            var token = generateUUID().replace(/-/g, '');
            docs[0].token = token;
            that.updateUser(docs[0], function(){
              callback(true, token);
            });
          }
          else {
            callback(false);
          }
        });
      }
    });
  };
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