// import controller
var routes = require("./controllers/burger_controller.js");

// import npm modules
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");

// need updating when deploying server on Heroku
var PORT = process.env.PORT || 3000;

// create instances if express and handlebars
var app = express();

// serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
// configure body parser
app.use(bodyParser.urlencoded({extended: false}));
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
// set Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// top leel routing
app.use("/", routes);

// start listening
app.listen(PORT, function() {
	console.log("Listening to " + PORT);
});
