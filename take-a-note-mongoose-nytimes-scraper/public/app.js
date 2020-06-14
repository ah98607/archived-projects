$("#body").fadeOut(0).fadeIn(1000);

// display all exisitng news
$.get("/get_all_articles", function(data) {
  console.log("Data returned from backend is " + data + " and its length is " + data.length);
  for (var i = 0; i < data.length; i++) {
    var newsEntry = $("<div>");
    newsEntry.html(
      "<div class=\"news-title\">" + data[i].title + "</div><br>" 
      + "<em>" + data[i].link + "</em>" 
      + "<button type=\"button\" class=\"btn btn-info note-btn\" id=\"note-for-article-" + data[i]._id + "\" data-toggle=\"modal\" data-target=\"#myModal\">Note</button>" 
      + "<button type=\"button\" class=\"btn btn-danger delete-article-btn\" id=\"delete-" + data[i]._id + "\">Delete</button>");
    $("#scraped-news").append(newsEntry);
    //console.log("Finishing adding news (id: " + data[i]._id);
  }
});

// click handler of "delete-article" button
$(document).on("click", ".delete-article-btn", function() {
  event.preventDefault();
  var articleId = $(this).attr("id").substring(7);

  console.log("Delete button for news " + articleId + " is clicked.");

  $.post("/delete", {articleId: articleId}).done(function() {
    // reload once user clicks delete
    window.location.reload();
  });
})

// click handler of "note" button
// note: modal triggering itself is taken care of by bootstrap
$(document).on("click", ".note-btn", function() {

  event.preventDefault();

  var articleId = $(this).attr("id").substring(17);

  console.log("Note button for news " + articleId + " is clicked.");

  // display header for the modal
  $("#article-id-modal").text("Note for article #" + articleId);

  // tell the button in modal what article it is using
  $("#add-update-note-btn").attr("article-of-this-button", articleId);

  $.get("/get_note_by_id/" + articleId, function(data) {
    console.log("After calling get_note_by_id, front-end got data ");
    console.log(data);
    if (data) {
      $("#article-note").html(
        data
        + "<br><button type=\"button\" class=\"btn btn-danger delete-note-btn\" id=\"delete-note-"
        + articleId
        + "\">"
        + "Delete This Node</button>");
    }
    else {
      $("#article-note").text("No note has been added yet!");
    }
  });
});

// click handler of "add/update" button inside modal
$(document).on("click", "#add-update-note-btn", function() {
  var articleId = $(this).attr("article-of-this-button");
  var articleNote = $("#new-article-note").val();

  console.log("Trying to update the note for article #" + articleId);
  console.log(articleNote);

  // add/update note
  $.post("/add_update_note_for_article", {articleId: articleId, articleNote: articleNote}).done(function() {
    window.location.reload();
  })
});

// click handler of "delete-note" button insde modal// click handler of "delete" button
$(document).on("click", ".delete-note-btn", function() {

  event.preventDefault();

  var articleId = $(this).attr("id").substring(12);

  console.log("Delete note button for news " + articleId + " is clicked.");

  $.post("/delete_note_for_article", {articleId: articleId}).done(function() {
    // reload once user clicks delete
    window.location.reload();
  });
})