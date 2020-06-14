var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var routes = require("./routes/routes.js");

var app = express();

var PORT = process.env.PORT || 3001;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "client/build")));

// mongoose configuration
if (process.env.MONGODB_URI) {
  console.log("Using Heroku MongoDB service.")
  mongoose.connect("mongodb://heroku_dq2cs0rq:ieamk660ru03kv0jat1ddqron2@ds123084.mlab.com:23084/heroku_dq2cs0rq", {
    useMongoClient: true
  });
}
else {
  console.log("Using local MongoDB service.");
  var mongoose_db_name = "ArticleDB"
  mongoose.connect("mongodb://localhost/" + mongoose_db_name, {
    useMongoClient: true
  });
}

app.use("/", routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(PORT, function() {
	console.log("Listening to " + PORT);
});

module.exports = app;
