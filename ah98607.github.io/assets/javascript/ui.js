$(document).ready(function() {
	// fade in
	$("#main-block").fadeOut(0).fadeIn(2000);
	$("#footer").fadeOut(0).fadeIn(2000);

	// carousel
	$('.carousel').carousel();

	// button
	$("#instagram-button").click(() => {
		window.open('https://www.instagram.com/dailyexplorerah/', '_blank');
	});
});