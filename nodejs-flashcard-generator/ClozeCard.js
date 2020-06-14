"use strict";
(function() {
	function ClozeCard(fullText, cloze) {
		if (this instanceof ClozeCard) {
			this.cloze = cloze; // text to be removed
			this.fullText = fullText;
			if (fullText.indexOf(cloze) < 0) {
				console.log("*****************************************************************************");
				console.log("Error: Cloze text cannot be found in the original text. Card was not created.");
				console.log("*****************************************************************************");
			}
			else {
				this.partial = this.fullText.replace(cloze, "...");
			}
		}
		else {
			return new ClozeCard(fullText, cloze);
		}
	}
	module.exports = {
		ClozeCard: ClozeCard
	};
})();