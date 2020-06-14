// import model
var burgers = require("../models/burgers.js");

// import npm module
var express = require("express");
var bodyParser = require("body-parser");

// create router instance
var router = express.Router();

// configure router
router.get("/", function(req, res) {
  burgers.all(function(data) {
    console.log(data);
    var objRendered = {
      burgers: data
    };
    res.render("index", objRendered);
  });
});

router.put("/eat/:id", function(req, res) {
  console.log("Remove " + req.params.id);
  burgers.eat(req.params.id);
  res.redirect("/");
});

router.post("/remove", function(req, res) {
  var removeId = req.body.removeId;
  burgers.drop(removeId, function(result) {
    res.end();
  })
})

router.post("/add", function(req, res) {
  console.log(req.body);
  var newBurgerName = req.body.name;
  console.log("Adding " + newBurgerName);
  burgers.insert(newBurgerName, function(result) {
    res.end();
  });
});

// export route for server.js
module.exports = router;
