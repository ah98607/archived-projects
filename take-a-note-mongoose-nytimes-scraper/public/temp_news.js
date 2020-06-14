console.log("1");
// load tmep list of news articles
$.get("/scrape", function(data) {
	for (var i = 0; i < data.length; i++) {
		var newsEntry = $("<div>");
		newsEntry.html(
			"<div class=\"news-title\" id=\"news-title-" 
			+ i
			+ "\">" 
		    + data[i].title 
		    + "</div><br><em id=\"news-link-" 
		    + i
		    + "\">" 
		    + data[i].link 
		    + "</em>" 
		    + "<button type=\"button\" class=\"btn btn-info save-article-btn\" id=\"save-article-" 
		    + i
		    + "\">Save It</button>");
		$("#temp-news").append(newsEntry);
	}
});

// click handler of "save-article" button
$(document).on("click", ".save-article-btn", function() {
	event.preventDefault();
	var i = $(this).attr("id").substring(13);
	console.log("Save button for news " + i + " (<- this is not mongodb id, just index in for loop) is clicked.");
	var newsEntry = {};
	newsEntry.title = $("#news-title-" + i).text();
	newsEntry.link = $("#news-link-" + i).text();
	console.log("save title: " + newsEntry.title);
	console.log("save link: " + newsEntry.link);

	$.post("/find_before_save", {title: newsEntry.title}).done(function(data) {
		console.log("return data of find_before_save is " + data);
		if (!data) {
			console.log("This news has not been added yet.");
			$.post("/save", newsEntry).done(function(data) {
				alert("Added this news");
		  	});
		}
		else {
			alert("This news has already been added.");
			//console.log("This news has already been added.");
		}
	});

	
})