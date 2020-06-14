"use strict";
(function() {
	// import NPM packages
	var express = require("express");
	var bodyParser = require("body-parser");
	var path = require("path");

	// express configuration
	var app = express();
	var PORT = process.env.PORT || 3000;
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.text());
	app.use(bodyParser.json({ type: "application/vnd.api+json" }));

	// import user defined packages
	var apiRoutes = require("./app/routing/htmlRoutes.js")(app, path);
	var htmlRoutes = require("./app/routing/apiRoutes")(app, path);

	// listening to PORT
	app.listen(PORT, function() {
	    console.log("App listening on PORT " + PORT);
	});
})();
