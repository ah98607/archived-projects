var express = require("express");
var router = express.Router();
var ArticleModel = require("../models/ArticleModel.js");
var request = require("request");
var cheerio = require("cheerio");
var path = require("path");

router.post("/search_nyt", function(req, res) {

	let topic = req.body.topic;
	let startYear = req.body.startYear;
	let endYear = req.body.endYear;

	console.log("Backend received the post request of searching NYT for articles.");
	console.log("Post request content is " + req.body.topic + "/" + req.body.startYear + "/" + req.body.endYear);

	request.get({
		url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
		qs: {
			"api-key": "e14383c2bd5b4e75ab13d803ca73d9c5",
			"q": topic,
			"begin_date": startYear + "0101",
			"end_date": endYear + "0101"
		},
	}, function(err, response, body) {

		if (err) {
			console.log(err);
		}
		else {
			body = JSON.parse(body);
			console.log(body.response);
			let rawSearchArray = body.response.docs;
			console.log(rawSearchArray);
	
			let result = [];
			for (let i = 0; i < rawSearchArray.length && i < 5; i++) {
				result.push({
					title: rawSearchArray[i].snippet,
					link: rawSearchArray[i].web_url
				});
			}
			res.json(result);
		}
	});

	// below code was used in new york times scrapper 1 (scrapping the home page)
	/*request("https://www.nytimes.com/", function(error, response, html) {
		var $ = cheerio.load(html);
		var tempNewsArray = [];

		// parse heading of new york times
		$(".story-heading").each(function(i, element) {
			var result = {};
			result.title = $(this).children("a").text();
			result.link = $(this).children("a").attr("href");
			result.id = i;
			result.note = "";

			if (result.title && result.title != "") {
				tempNewsArray.push(result);
			}
		});
		//console.log(tempNewsArray);
		res.json(tempNewsArray);
	});*/
});

router.post("/remove_article", function(req, res) {
	ArticleModel.removedByTitle(req.body.title, function(data) {
		console.log("Backend received the post request of removing an article with title " + req.body.title);
		console.log("Backend response " + data);
		res.json({articleSaved: true});
	})
});

router.post("/save_article", function(req, res) {
	ArticleModel.add(req.body.title, req.body.link, function(data) {
		console.log("Backend received the post request of saving an article with title " + req.body.title);
		console.log("Backend response " + data);
		res.json({articleSaved: true});
	})
});

router.get("/get_saved_articles", function(req, res) {
	ArticleModel.all(function(data) {
		res.json(data);
	});
});

router.get("*", function(req, res) {
	res.sendFile(path.join(__dirname + "/../client/build/index.html"));	
})

module.exports = router;
