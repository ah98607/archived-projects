"use strict";
(function() {
	module.exports = function(app, path) {
		var friendList = [];
		app.get("/api/friends", function(req, res) {
			//res.json(JSON.stringify(friendList));
			res.end(JSON.stringify(friendList));
		});
		app.post("/api/friends", function(req, res) {
			// object structure pased from front end js code
			/*var userData = {
				name: $("#name").val(),
				photo: $("#photo").val(),
				scores: [$("#q1").val(), $("#q2").val(), $("#q3").val(), $("#q4").val(), $("#q5").val(), $("#q6").val(), $("#q7").val(), $("#q8").val(), $("#q9").val(), $("#q10").val()];
			}*/

			// get new user from fronend js
			var newUser = req.body;
			console.log(newUser);

			// find the one with least difference
			var matchingFriend = {};
			console.log("current length of friend list: " + friendList.length);
			if (friendList.length == 0) {
				console.log("You are the only registered person in the list.");
				matchingFriend = newUser;
			}
			else {
				matchingFriend = friendList[0];
				var difference = calculateDifference(newUser, friendList[0]);
				for (var i = 1; i < friendList.length; i++) {
					if (calculateDifference(newUser, friendList[i]) < difference) {
						difference = calculateDifference(newUser, friendList[i]);
						matchingFriend = friendList[i];
					}
				}
			}

			// add current user
			friendList.push(newUser);

			// return matching friend to frontend NOT using "return"
			res.json(matchingFriend);

		});

		function calculateDifference(user1, user2) {
			var difference = 0;
			for (var i = 0; i < 10; i++) {
				difference += user1.scores[i] - user2.scores[i];
			}
			console.log(user1.name + " and " + user2.name + " has a difference of " + difference);
			return Math.abs(difference);
		}
	}
})();