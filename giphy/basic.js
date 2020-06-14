var stars = ["Tim Duncan", "Kobe Bryant", "Michael Jordan"];

$(document).ready(function() {

  var updateButton = function() {
    $("#button-group").empty();
    for (var i = 0; i < stars.length; i++) {
      console.log("Add " + i + "button");
      var newButton = $("<button>");
      newButton.attr("id", "button-" + stars[i]);
      newButton.attr("type", "button");
      newButton.addClass("btn btn-primary");
      newButton.text(stars[i]);
      $("#button-group").append(newButton);
    }
  }
  

  $("#addPlayer").click(function() {
    event.preventDefault();
    stars.push($("#name-input").val());
    updateButton();
  });

  // this event handler only applies to buttons under "button group" div
  $(document.body).on("click", "#button-group button", function() {

    $("#gifs-appear-here").empty();

    var starSearched = $(this).attr("id").substring(7);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + starSearched + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({url: queryURL, method: "GET"}).done(function(response) {
      var results = response.data;
      //console.log(results);
      for (var i = 0; i < results.length; i++) {
        var gifSpan = $("<span>");

        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        gifSpan.prepend(p);

        var personImage = $("<img>");
        personImage.attr("src", results[i].images.fixed_height.url);
        personImage.attr("is-still", "0");
        gifSpan.prepend(personImage);

        $("#gifs-appear-here").prepend(gifSpan);
      }
    });
  });

  //$(document.body).on("click", "img", function() {
  $("#gifs-appear-here").on("click", "img", function() {
    console.log("image clicked");
    var urlWithoutFileType = $(this).attr("src");
    
    if ($(this).attr("is-still") == "0") {
      console.log("From move to still");
      urlWithoutFileType = urlWithoutFileType.substring(0, $(this).attr("src").length - 4); // remove ".gif"
      $(this).attr("src", urlWithoutFileType + "_s.gif")
      $(this).attr("is-still", "1");
    }
    else {
      console.log("From still to move");
      urlWithoutFileType = urlWithoutFileType.substring(0, $(this).attr("src").length - 6); // remove "-s.gif"
      $(this).attr("src", urlWithoutFileType + ".gif")
      $(this).attr("is-still", "0");
    }
  });

  updateButton();
});