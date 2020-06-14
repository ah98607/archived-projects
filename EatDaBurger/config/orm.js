// import connection
var connection = require("./connection.js");

// objects for all mysql queries
var orm = {
  selectAll: function(callback) {
    var queryString = "SELECT * FROM burgers;";
    console.log("Query string: " + queryString);
    connection.query(queryString, function(error, result) {
      if (error) {
        throw error;
      }
      else {
        callback(result);
      }
    });
  },
  insertOne: function(burgerName, callback) {
    var queryString = "INSERT INTO burgers (burger_name, devoured) VALUES (\"" + burgerName + "\", FALSE);";
    console.log("Query string: " + queryString);
    connection.query(queryString, function(error, result) {
      if (error) {
        throw error;
      }
      else {
        callback(result);
      }
    });
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  eatOne: function(burgerId, callback) {
    var queryString = "UPDATE burgers SET devoured=TRUE WHERE id=" + burgerId;
    console.log(queryString);
    connection.query(queryString, function(error, result) {
      if (error) {
        throw error;
      }
      else {
        callback(result);
      }
    });
  }
};

// export orm for model
module.exports = orm;
