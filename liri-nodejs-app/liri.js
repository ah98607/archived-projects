if (process.argv.length == 2) {
	console.log("No command entered.");
}
else {
	console.log("");
	var op = process.argv[2];
	switch(op) {
		case "my-tweets": {
			if (process.argv[3]) {
				console.log("**** Searching tweets of the user you specified (" + process.argv[3] + ").");
				findTweets(process.argv[3]);
			}
			else {
				console.log("**** Searching tweets of Andy.");
				findTweets();
			}
			break;
		}
		case "spotify-this-song": {
			if (process.argv[3]) {
				findSong(process.argv[3]);
			}
			else {
				console.log("Title is missing!");
			}
			break;
		}
		case "movie-this": {
			if (process.argv[3]) {
				findMovie(process.argv[3]);
			}
			else {
				findMovie("Mr. Nobody");
			}
			break;
		}
		case "do-what-it-says": {
			executeCommandInFile();
			break;
		}
		default: {
			console.log("Unsupported command entered.");
		}
	}
}
function findTweets(name) {
	var Twitter = require("twitter");

	var client = new Twitter({
		consumer_key: "HI6cs2Dl3Ok5R5v3yh8taKE7k",
		consumer_secret: "DAozAtLT0EcYvNpugn6j2OgpyhWzqQPDVFk9meqnQlAejcMy4l",
		access_token_key: "876534396374794240-6OMvclT13GGt19ZKY5hOW3DAFkJwbAm",
		access_token_secret: "raSbNSFi45QMWEIKyFwwXq9mTFYyOKGDLOIuaChMPgW8H"
	});

	var params = {
		screen_name: name ? name : "adhsdca",
		count: 5
	};
	client.get("statuses/user_timeline", params, function(error, tweets, response) {
		if (!error) {
			console.log("=========================================================");
			console.log("Displaying latest 20 tweets for user " + params.screen_name);
			console.log("=========================================================");
			for (var i = 0; i < tweets.length; i++) {
				console.log(">>>>>>>>>>>>>>>>>>>>> Tweet #" + i);
				console.log("Time: " + tweets[i].created_at);
				console.log("Content: " + tweets[i].text);
			}
			console.log("");
		}
	});
}

function findMovie(title) {
	var request = require("request");
	var url = "http://www.omdbapi.com/?y=&plot=short&apikey=40e9cece&t=" + encodeURIComponent(title);
	request(url, function(error, response, body) {
		if (!error) {
			console.log("=========================================================");
			console.log("Displaying movie results");
			console.log("=========================================================");
			var returnedObj = JSON.parse(body);
			//console.log(returnedObj);
			console.log("Title: " + returnedObj.Title);
			console.log("Year: " + returnedObj.Year);
			console.log("Rating: " + returnedObj.Rated);
			console.log("Country: " + returnedObj.Country);
			console.log("Language: " + returnedObj.Language);
			console.log("Plot: " + returnedObj.Plot);
			console.log("Website: " + returnedObj.Website);
			console.log("");
		}
	});
}

function findSong(title) {
	var Spotify = require('node-spotify-api');
	var spotify = new Spotify({
		id: "a029aa7d48454e08bbd1c6d75b9a103d",
		secret: "a8b2ae27c56840eea393723450607f4e"
	});
	const params = {
		query: title,
		type: 'track',
		limit: 2
	}
	spotify.search(params, function(error, data) {
		if (!error) {
			console.log("=========================================================");
			console.log("Displaying Spotify results");
			console.log("=========================================================");
			for (var i = 0; i < data.tracks.items.length; i++) {
				console.log(">>>>>>>>>>>>>>>>>>>>> Song #" + i);
				console.log("Name: " + data.tracks.items[i].name);
				var artists = "";
				for (var j = 0; j < data.tracks.items[i].artists.length; j++) {
					artists += data.tracks.items[i].artists[j].name;
				}
				console.log("Artist: " + artists);
				console.log("Album: " + data.tracks.items[i].album.name);
				console.log("URL: " + data.tracks.items[i].href);
			}
			console.log("");
		}
	});
}

function executeCommandInFile() {
	console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
	console.log("Executing the command in the file.");
	console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
	var fs = require("fs");
	fs.readFile("./random.txt", "utf8", function(err, data) {
		if (!err) {
			var instructions = data.split("\n");
			for (var i = 0; i < instructions.length - 1;i++) {
				console.log("******** Instruction #" + i + ": " + instructions[i] + "********");
				var params = instructions[i].split(",");
				var op = params[0];
				switch(op) {
					case "my-tweets": {
						if (params[1]) {
							console.log("**** Searching tweets of the user you specified (" + process.argv[3] + ").");
							findTweets(params[1]);
						}
						else {
							console.log("**** Searching tweets of Andy.");
							findTweets();
						}
						break;
					}
					case "spotify-this-song": {
						if (params[1]) {
							findSong(params[1]);
						}
						else {
							console.log("Title is missing!");
						}
						break;
					}
					case "movie-this": {
						if (params[1]) {
							findMovie(params[1]);
						}
						else {
							console.log("Title is missing!");
						}
						break;
					}
					default: {
						console.log("Unsupported command entered.");
					}
				}
			}
		}
	});
}