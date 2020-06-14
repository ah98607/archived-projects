// get the reference of div blocks
var tips = document.getElementById("tips");
var remaningAttemps = document.getElementById("remaning-attempts");
var playGround = document.getElementById("play-ground");
var gameResult = document.getElementById("game-result");
var healthBar = document.getElementById("health-bar");
var gallowImage = document.getElementById("gallow-image");

// words to be chosen
var randomIndex = Math.floor(Math.random() * 10);
var words = ["facebook", "linkedin", "amazon", "google", "snapchat", "tumblr", "quora", "yahoo", "zillow", "instgram"];
var testWord = words[randomIndex];

// character array used by renderHTML
var charArray = [];

// counter of remmaining attemps
var remaningAttempsCounter = 5;
var isPlaying = 1;

// play music
document.getElementById("music").play();

// function to generate HTML code with character array
var renderHTML = function(charArray) {
	playGround.innerHTML = ""; // reset it first
	for (var i = 0; i < charArray.length; i++) {
		playGround.innerHTML += charArray[i] + " "; // put a space after each "_"
	}
}

var resetGame = function() {
	// randomly pick one word
	randomIndex = Math.floor(Math.random() * 10);
	testWord = words[randomIndex];

	// initialize the number remaning attemps based on the length of the test word
	remaningAttempsCounter = 5;
	remaningAttemps.innerHTML = "Remaining attemps: " + remaningAttempsCounter;

	// show tips
	tips.innerHTML = "<em>TIPS</em>: An website whose first character of its name is <span class=\"large-letter\">" + testWord.charAt(0).toUpperCase() + "</div>.<br>";
	gameResult.innerHTML = "Please type.";

	// reset health bar
	healthBar.setAttribute("class", "progress-bar progress-bar-success");
	healthBar.setAttribute("style", "width:100%");

	// reset image
	gallowImage.setAttribute("src", "assets/images/hangman-before.jpg");

	// prepare the initial text to display (should be something like "_ _ _ _")
	charArray = [];
	for (var i = 0; i < testWord.length; i++) {
		charArray[i] = "_";
	}
	renderHTML(charArray);
}

// function of updating progress bar
var updateProgressBar = function (health) {
	switch (health) {
		case 5:
		healthBar.setAttribute("style", "width:100%");
		break;
		case 4:
		healthBar.setAttribute("style", "width:80%");
		healthBar.setAttribute("class", "progress-bar progress-bar-warning");
		break;
		case 3:
		healthBar.setAttribute("style", "width:60%");
		break;
		case 2:
		healthBar.setAttribute("style", "width:40%");
		healthBar.setAttribute("class", "progress-bar progress-bar-danger");
		break;
		case 1:
		healthBar.setAttribute("style", "width:20%");
		break;
		case 0:
		healthBar.setAttribute("style", "width:0%");
		break;
	}
}

// function of onkeypress event
var keyResp = function (event) {

	// get key code of user input
	var keyCode = event.keyCode;

	// convert user input to a character and make it lowercase
	var inputChar = String.fromCharCode(keyCode).toLowerCase();

	// test if the word has this character
	var locationOfCharacter = testWord.indexOf(inputChar);

	// test correct, replace "_" with the correct character
	if (locationOfCharacter != -1) {
		//charArray[locationOfCharacter] = character; This is not correct when the word has duplicate character ("o" in facebook")
		for (var i = 0; i < testWord.length; i++) {
			if (testWord[i] == inputChar) {
				charArray[i] = inputChar;
			}
		}
		renderHTML(charArray);
	}
	else {
		if (remaningAttempsCounter > 0) {
			remaningAttempsCounter--;
		}
		updateProgressBar(remaningAttempsCounter);
		remaningAttemps.innerHTML = "Remaining attemps: " + remaningAttempsCounter;
		if(remaningAttempsCounter == 0) {
			gallowImage.setAttribute("src", "assets/images/hangman-lost.png");
			gameResult.innerHTML = "LOST!! Restting the game...";
			setTimeout(function() {
				resetGame();
			}, 3000);
		}
	}

	// test if user has already found all characters
	if (charArray.indexOf("_") == -1) {
		gallowImage.setAttribute("src", "assets/images/hangman-won.jpg");
		gameResult.innerHTML = "WON!! Restting the game...";
		setTimeout(function() {
				resetGame();
			}, 3000);
	}
}

resetGame();

// bind events to the event functions
//document.onkeypress = keyResp();
document.onkeypress = keyResp;
document.getElementById("reset").onclick = resetGame;
document.getElementById("mute").onclick = function() {
	if (isPlaying == 1) {
		document.getElementById("music").pause();
		isPlaying = 0;
	}
	else {
		document.getElementById("music").play();
		isPlaying = 1;
	}

};