"use strict";
(function() {
	var BasicCard = require("./BasicCard").BasicCard;
	var ClozeCard = require("./ClozeCard").ClozeCard;

	var firstPresident = new BasicCard("Who was the first president of the United States?", "George Washington");

	// "Who was the first president of the United States?"
	console.log(firstPresident.front);

	// "George Washington"
	console.log(firstPresident.back);

	var firstPresidentCloze = new ClozeCard("George Washington was the first president of the United States.", "George Washington");

	// "George Washington"
	console.log(firstPresidentCloze.cloze);

	// " ... was the first president of the United States.
	console.log(firstPresidentCloze.partial);

	// "George Washington was the first president of the United States.
	console.log(firstPresidentCloze.fullText);

	// Should throw or log an error because "oops" doesn't appear in "This doesn't work"
	var brokenCloze = new ClozeCard("This doesn't work", "oops");
})();