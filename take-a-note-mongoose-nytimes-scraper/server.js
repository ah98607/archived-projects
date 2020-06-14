// homework to do
// 1. summarize mongoose orm method
// 2. summarize how to configure/init/gui mongoose and compare with sequelized

// NPM modules
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");

// requiring our note and article models
var Article = require("./models/Article.js");
var Note = require("./models/Note.js");

// set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// initialize Express
var app = express();

// use morgan and body parser with our app
app.use(bodyParser.urlencoded({extended: false}));

// make public a static dir
app.use(express.static("public"));

// mongoose configuration
var mongoose_db_name = "18-homework"
//mongoose.connect("mongodb://localhost/" + mongoose_db_name);
mongoose.connect("mongodb://heroku_hsxfz411:uotfgbljphjm0odfeticjo3rkb@ds157723.mlab.com:57723/heroku_hsxfz411");

// get db object and add error/open handler
var db = mongoose.connection;
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// URL: scrape
app.get("/scrape", function(req, res) {

  request("https://www.nytimes.com/", function(error, response, html) {

    var $ = cheerio.load(html);
    var tempNewsArray = [];

    // parse heading of new york times
    $(".story-heading").each(function(i, element) {

      var result = {};

      result.title = $(this).children("a").text();
      result.link = $(this).children("a").attr("href");
      result.note = "";

      if (result.title && result.title != "") {
        tempNewsArray.push(result);
        
      }
    });
    res.json(tempNewsArray);
  });
});

// API: save
app.post("/save", function(req, res) {

  var entry = new Article({title: req.body.title, link: req.body.link, note: ""});

  // Now, save that entry to the db
  entry.save(function(err, data) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(data);
      res.end();
    }
  });
});

// API: find before save
app.post("/find_before_save", function(req, res) {
  Article.findOne({title: req.body.title}, function(err, data) {
    console.log("return data of find_before_save is " + data);
    res.json(data);
  })
})

// API: show all articles
app.get("/get_all_articles", function(req, res) {

  Article.find({}, function(err, data) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(data);
    }
  });
});

// API: delete an article
app.post("/delete", function(req, res) {
  var articleId = req.body.articleId;
  // remove from db
  Article.findByIdAndRemove(articleId, function(err, data) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("Remvove news #" + articleId + " from DB.");
    }
    res.end();
  });
});

// API: find a note for an article by ID
app.get("/get_note_by_id/:id?", function(req, res) {
  var articleId = req.params.id;
  console.log("Getting note for article #" + articleId);

  // find Article by ID
  //User.find({}).populate("notes").exec(function(error, doc) {
  //}
  Article.findById(articleId, function(err, data) {
    res.json(data.note);
  });
});

// API: add/update a note ofr an article by ID
app.post("/add_update_note_for_article", function(req, res) {
  var articleId = req.body.articleId;
  var articleNote = req.body.articleNote;

  console.log("At backend, trying to add/update note for article #" + articleId);
  console.log(articleNote);

  Article.findByIdAndUpdate(articleId, {$set: {note: articleNote}}, function(err, data) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(data);
    }
  });
  res.end();
});

// API: delete note for an article by ID
app.post("/delete_note_for_article", function(req, res) {
  var articleId = req.body.articleId;

  Article.findByIdAndUpdate(articleId, {$set: {note: ""}}, function(err, data) {
    if (err) {
      console.log(err);
    }
    else {
      console.log(data);
    }
  });
  res.end();
});

// Listen on port 3000
var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("App running on port 3000!");
});