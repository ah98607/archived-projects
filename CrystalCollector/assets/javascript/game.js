$(document).ready(function() {

	var sum = 0;
	var nums = [];
	var wins = 0;
	var loses = 0;

	var reset = function() {
		sum = 0;
		targetNumber = Math.floor(Math.random() * 100 + 20);
		$("#wins").text(wins);
		$("#loses").text(loses);
		$("#target-number").text(targetNumber).fadeOut(200).fadeIn(200);
		$("#current-number").text(sum).fadeOut(200).fadeIn(200);
		$(".crystal-image").fadeOut(200).fadeIn(200);
		for (var i = 0; i < 4; i++) {
			nums[i] = Math.floor(Math.random() * 13);
			console.log("number " + i + " is " + nums[i]);
		}

		$("body").slideUp(400).slideDown(400);
	}

	var crystalSelected = function() {

		$(this).animate({width: "250px"}, 100).animate({width: "200px"}, 100);

		sum += nums[parseInt($(this).attr("value"))];
		$("#current-number").text(sum).fadeOut(200).fadeIn(200);
		
		if (sum == targetNumber) {
			wins++;
			$("#result").text("You won");
			$("#result").show(0).delay(2000).hide(0);
			reset();
		}
		else if (sum > targetNumber) {
			loses++;
			$("#result").text("You lost!");
			$("#result").show(0).delay(2000).hide(0);
			reset();
		}
	}

	var crystalHoveredIn = function() {
		//$(this).css("width", "210px");
		$(this).addClass("crystal-selected");
	}
	var crystalHoveredOut = function() {
		$(this).removeClass("crystal-selected");
	}

	$("#reset").on("click", function() {
		wins = 0;
		loses = 0;
		reset();
	});
	$(".crystal-image").click(crystalSelected);
	$(".crystal-image").hover(crystalHoveredIn, crystalHoveredOut);

	reset();
	$("#music").get(0).play(); // IMPORTANT: http://stackoverflow.com/questions/4646998/play-pause-html-5-video-using-jquery
})