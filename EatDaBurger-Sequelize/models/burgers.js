// REPLACE WITH SEQUELIZE import orm
//var orm = require("../config/orm.js");

/*var cat = {
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
  eat: function(burgerId) {
    orm.eatOne(burgerId);
  }
};*/

// import npm module
var Sequelize = require("sequelize");

// configure sequelize instance
// be sure to run mysql command to create database instance
var sequelize;
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize("ip0twidsiybea8m5", "dwmd3cbs8k7dzzpw", "kkgb29zf489keii1", {
    host: "lg7j30weuqckmw07.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    dialect: "mysql",
    pool: {
      max: 1,
      min: 0,
      idle: 10000
    }
  });
}
else {
  sequelize = new Sequelize("burger_db", "root", "mysql123", {
    host: "localhost",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });
}

// define table structure
var burger_tb = sequelize.define("burger_tb", {
  burger_name: {
    type: Sequelize.STRING
  },
  devoured: {
    type: Sequelize.BOOLEAN
  }
});

burger_tb.sync();

var burgers = {
  all: function(callback) {
    burger_tb.findAll({// empty constraint
    }).then(function(result) {
      callback(result);
    });
  },
  // The variables cols and vals are arrays.
  insert: function(burgerName, callback) {
    burger_tb.create({
      burger_name: burgerName
    }).then(function(result) {
      callback(result);
    });
  },
  eat: function(burgerId, callback) {
    burger_tb.update(
    {
      devoured: true
    }
    , {
      where: 
      {
        id: burgerId
      }
    }).then(function(result) {
      callback(result);
    });
  },
  drop: function(burgerId, callback) {
    burger_tb.destroy({
      where: {
        id: burgerId
      }
    }).then(function(result) {
      callback(result);
    })
  }
};

// export model to controller
module.exports = burgers;
