$(document).ready(function() {

	// get a reference to the database service
	var database = firebase.database();

	// validate user input
	var isValidInput = function(name, destination, firstTime, frequency) {
		if (name == "" || destination == "" || firstTime == "" || firstTime == "") {
			alert("Data is not complete. Make sure you provide all information.");
			return false;
		}
		else if (firstTime.length != 5 || // length must be 5
			parseInt(firstTime.substring(0, 1)) == NaN || // char #0 must be an integer
			parseInt(firstTime.substring(1, 2)) == NaN || // char #1 must be an integer
			firstTime.substring(2, 3) != ":" || // char #2 must be ":"
			parseInt(firstTime.substring(3, 4)) == NaN || // char #3 must be an integer
			parseInt(firstTime.substring(4)) == NaN    || // char #4 must be an integer
			parseInt(firstTime.substring(0, 2)) > 23 || // char #0#1 cannot be larger than 23
			parseInt(firstTime.substring(3)) > 59 // char #3#4 cannot be larger than 60
			) {
			alert("Time of first train is not valid.")
			return false;
		}
		else if (!parseInt(frequency) || parseInt(frequency) <= 0) {
			alert("Frequency is not valid.")
			return false;
		}
		else {
			return true;
		}
	}

	// use newly get information to render HTML
	var updateHTML = function(trId, trainName, trainDest, trainFirstTime, trainFrequency, operation) {
		// calculate time with moments.js
		// create a time object with today's date and time of today's first train
		var timeOfTodayFirstTrain = moment(moment().format("YYYY-MM-DD") + " " + trainFirstTime);
		console.log(timeOfTodayFirstTrain);

		// calculate the time of the next train arrival
		var nextArrivalTime = timeOfTodayFirstTrain;
		var count = 0;
		while (nextArrivalTime.fromNow().indexOf("ago") != -1  && count < 50) {
			nextArrivalTime.add(parseInt(trainFrequency), "minutes");
			count++;
		}
		console.log("updated next trian time " + nextArrivalTime);

		// calculate how many minutes between the next arrival and current time
		var now = moment();
		var timeToWait = moment.duration(nextArrivalTime.diff(now));
		console.log("updated wait time " + nextArrivalTime);

		// add a new "tr"
		if (operation == "add") {
			$("#train-table > tbody").append(
				"<tr id=\"" + (trainName + trainDest).replace(/\s/g, '') + "\">" // remove space! ("San Diego")
				+ "<td>" + trainName + "</td>"
				+ "<td>" + trainDest + "</td>"
				+ "<td><input value=\"" + trainFirstTime + "\"></input></td>"
				+ "<td><input value=\"" + trainFrequency + "\"></input></td>"
				+ "<td>" + nextArrivalTime.format("HH:mm") + "</td>"
				+ "<td>" + timeToWait.hours() + " h " + timeToWait.minutes() + "</td>"
				+ "<td><button class=\"update-button btn btn-warning\" type=\"button\">Update</button>"
				+ "<button class=\"remove-button btn btn-danger\" type=\"button\">Remove</button></td>"
				+ "</tr>"
			);
		}

		// replace an existing "tr"
		else if (operation == "update") {

			console.log("trainfirst time is " + trainFirstTime);
			console.log("trid " + trId);

			$("#" + trId).replaceWith(
				"<tr id=\"" + trId + "\">"
				+ "<td>" + trainName + "</td>"
				+ "<td>" + trainDest + "</td>"
				+ "<td><input value=\"" + trainFirstTime + "\"></input></td>"
				+ "<td><input value=\"" + trainFrequency + "\"></input></td>"
				+ "<td>" + nextArrivalTime.format("HH:mm") + "</td>"
				+ "<td>" + timeToWait.hours() + " h " + timeToWait.minutes() + "</td>"
				+ "<td><button class=\"update-button btn btn-warning\" type=\"button\">Update</button>"
				+ "<button class=\"remove-button btn btn-danger\" type=\"button\">Remove</button></td>"
				+ "</tr>"
			);
		}
	};

	// database response function
	database.ref().on("child_added", function(snapshot, prevChildKey) {

		var newTrain = snapshot.val();

		var newName      = newTrain.name;
		var newDest      = newTrain.destination;
		var newFirstTime = newTrain.firstTime;
		var newFreq      = newTrain.frequency;

		updateHTML((newName + newDest).replace(/\s/g, ''), newName, newDest, newFirstTime, newFreq, "add");
	});
	
	// click event delegation for "update"
	$("#add-train-btn").click(function() {
		
		// disable the defaul behavior of element "form"
		event.preventDefault();

		// what to do after clicking the button
		var tName = $("#name-input").val().trim();
		var tDest = $("#dest-input").val().trim();
		var tFirstTime = $("#first-time-input").val().trim();
		var tFreq = $("#freq-input").val().trim();

		// valide input
		if (!isValidInput(tName, tDest, tFirstTime, tFreq)) {
			return;
		}
		else {
			var newTrain = {
	    		name: tName,
				destination: tDest,
				firstTime: tFirstTime,
	    		frequency: tFreq,
	    		id: (tName + tDest).replace(/\s/g, '')
			 };

			 //database.ref("trains").push(newTrain);
			 database.ref((tName + tDest).replace(/\s/g, '')).set(newTrain);

			 // empty input area
			 $("#name-input").val("");
			 $("#dest-input").val("");
			 $("#first-time-input").val("");
			 $("#freq-input").val("");
		}
	});
	
	// click event delegation for "add"
	$(document.body).on("click", ".update-button", function() {

		// get constant trId / database ID
		var buttonGradparentId = $(this).parent().parent().attr("id");

		// get updated info
		var updatedName      = ($(this).parent().parent().children().eq(0).text());
		var updatedDest      = ($(this).parent().parent().children().eq(1).text());
		var updatedFirstTime = ($(this).parent().parent().children().eq(2).children().first().val());
		var updatedFreq      = ($(this).parent().parent().children().eq(3).children().first().val());

		// valide input
		if (!isValidInput(updatedName, updatedDest, updatedFirstTime, updatedFreq)) {
			return;
		}
		else {
			var updatedTrain = {
	    		name: updatedName,
				destination: updatedDest,
				firstTime: updatedFirstTime,
	    		frequency: updatedFreq,
	    		id: buttonGradparentId
	    	};

			// get reference to the data in the database and update it
			var updateRef = database.ref(buttonGradparentId);

			// update the data in the database
			updateRef.update(updatedTrain);

			// update HTML
			updateHTML(buttonGradparentId, updatedName, updatedDest, updatedFirstTime, updatedFreq, "update");
			$(document.body).fadeOut(0).fadeIn(1000);
		}
	});

	// click event delegation for "remove"
	$(document.body).on("click", ".remove-button", function() {

		// get constant trId / database ID
		var buttonGradparentId = $(this).parent().parent().attr("id");

		// remove from database
		var removeRef = database.ref(buttonGradparentId);
		removeRef.remove();


		// remove from HTML
		$(this).parent().parent().remove();
		$(document.body).fadeOut(0).fadeIn(1000);
	});
});