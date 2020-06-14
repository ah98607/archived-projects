$(document).ready(function() {

	var questions =
	[{index: 0, question: "Which of the following companies is located in Portland?", answer: "Airbnb", options: ["Airbnb", "Microsoft", "Amazon", "LinkedIn"]},
	{index: 1, question: "Which of the following operation systems is most different from the others?", answer: "Windows", options: ["Ubuntu", "Unix", "OS X", "Windows"]},
	{index: 2, question: "Which of the following languages is a database language?", answer: "SQL", options: ["Perl", "XML", "HTML", "SQL"]},
	{index: 3, question: "Which of the following syntax is part of original JavaScript", answer: "getElementById", options: ["animate()", "$\(\".button\"\)", "getElementById", "css\(\)"]}];

	var indexOfQuestion;
	var correctAnswers;
	var wrongAnswers;
	var unanswerd;
	var timerValue;
	var timerIntervalId;

	var start = function() {
		console.log("start clicked")

		// change page layout
		$("#start-button").hide(500);
		$("#game-area").show(500);
		//$("#winlose-image").hide(500);
		$("#result-area").hide(500);

		// reset variables
		indexOfQuestion = 0;
		correctAnswers = 0;
		wrongAnswers = 0;
		unanswerd = 0;

		// prepare a question using "indexOfQuestion"
		prepareQuestion(0);
	}

	var prepareQuestion = function(i) {
		// show a question
		$("#question").show(0);
		$("#options").show(0);
		$("#question").text(questions[i].question);
		$("#opt0").text(questions[i].options[0]);
		$("#opt1").text(questions[i].options[1]);
		$("#opt2").text(questions[i].options[2]);
		$("#opt3").text(questions[i].options[3]);
		timerValue = 10;
		timerIntervalId = setInterval(countDown, 1000);
		countDown();
	}

	var countDown = function() {
		timerValue--;
		if (timerValue == 0) {
			console.log("Unanswerd (time out)!")
			clearInterval(timerIntervalId);
			// display iamge
			$("#question").hide(0);
			$("#options").hide(0);
			$("#winlose-image").empty();
			$("#winlose-image").append(generateImage("timeout"));
			$("#winlose-image").show(0);
			setTimeout(function() {
				$("#winlose-image").hide(0);
				unanswerd++;
				moveToNextQuestion();
			}, 2000);
		}
		$("#timer").text(timerValue);
	}

	var judge = function() {
		var userAnswer = $(this).text();
		var image;
		if (userAnswer ==  questions[indexOfQuestion].answer) {
			console.log("Correct!");
			correctAnswers++;
			image = generateImage("win");
		}
		else {
			console.log("Wrong!");
			wrongAnswers++;
			$("#winlose-image").empty();
			image = generateImage("lose");
			setTimeout(function() {
				$("#winlose-image").hide(0);
			}, 2000);
		}
		
		clearInterval(timerIntervalId);

		// display iamge
		$("#question").hide(0);
		$("#options").hide(0);
		$("#winlose-image").empty();
		$("#winlose-image").append(image);
		$("#winlose-image").show(0);
		setTimeout(function() {
			$("#winlose-image").hide(0);
			indexOfQuestion++;
			moveToNextQuestion();
		}, 2000);
	}

	var generateImage = function(winLose) {
		var imgSrc;
		if (winLose == "win") {
			imgSrc = "assets/images/win.jpg";
		}
		else if (winLose == "lose") {
			imgSrc = "assets/images/lose.png";
		}
		else {
			imgSrc = "assets/images/timeout.jpg";
		}
		var imgBox = $("<img>");
		imgBox.attr("src", imgSrc);
		imgBox.attr("width", "300px");
		return imgBox;
	}

	var moveToNextQuestion = function() {
		if (indexOfQuestion == questions.length) {
			$("#game-area").hide(500);
			showResult();
		}
		else {
			prepareQuestion(indexOfQuestion);
			$("#game-area").slideUp(200).slideDown(200);
		}
	}

	var showResult = function() {
		$("#game-area").hide(500);
		$("#result-area").show(500);
		$("#correct-answers").text(correctAnswers);
		$("#wrong-answers").text(wrongAnswers);
		$("#unanswerd").text(unanswerd);
		setTimeout(start, 5000);
	}

	$("#start-button").click(start);
	$("#opt0").click(judge);
	$("#opt1").click(judge);
	$("#opt2").click(judge);
	$("#opt3").click(judge);

	$("#game-area").hide();
	$("#result-area").hide();
});