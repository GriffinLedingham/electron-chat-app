module.exports = function(db) {

  this.constructor.prototype.getUserDataObject = function(uuid) {
    var collection = db.collection('users');
    collection.find({uuid : uuid}).toArray(function(err, docs) {
      console.log(docs);
    });
  };

  this.constructor.prototype.insertUserDataObject = function(user) {
    var collection = db.collection('users');
    collection.insert([user], function(err, res) {
      console.log(res);
    });
  };
};