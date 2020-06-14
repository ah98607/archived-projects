// import orm
var orm = require("../config/orm.js");

var burgers = {
  all: function(callback) {
    orm.selectAll(function(result) {
      callback(result)
    })
  },
  // The variables cols and vals are arrays.
  insert: function(burgerName, callback) {
    orm.insertOne(burgerName, function(result) {
      callback(result);
    });
  },
  eat: function(burgerId, callback) {
    orm.eatOne(burgerId, function(result) {
      callback(result);
    });
  }
};

// export model to controller
module.exports = burgers;
