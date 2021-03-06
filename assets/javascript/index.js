

// Adding click event listen listener to all buttons
//  $("button").on("click", function() {
$(document).on("click", "button", function () {
  // Grabbing and storing the data-name property value from the button
  var query = $(this).attr("data-name");

  // Constructing a queryURL using the query name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    query + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

  // Performing an AJAX request with the queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After data comes back from the request
    .then(function (response) {
      console.log(queryURL);
      console.log(response);
      // storing the data from the AJAX request in the results variable
      var results = response.data;
      // Looping through each result item
      for (var i = 0; i < results.length; i++) {
        // Creating and storing a div tag
        var queryDiv = $("<div>");
        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);
        // Creating and storing an image tag
        var queryImage = $("<img>");
        // Grab image and gif in a var
        // grabbed from response.data
        var picSource = results[i].images.fixed_width_still.url;
        var gifSource = results[i].images.fixed_width.url;
        // 200px wide picture
        // Setting the src attribute of the image to a property pulled off the result item
        queryImage.attr("src", results[i].images.fixed_width.url);
        queryImage.addClass("queryGiphy");
        // grab onto this when clicking gif
        // Set attributes
        // These values will be saved on the image
        // these values are based on our response
        queryImage.attr("data-toggle", "true");
        queryImage.attr("data-stillVersion", picSource);
        queryImage.attr("data-gifVersion", gifSource);
        // Appending the paragraph and image tag to the queryDiv
        queryDiv.append(p);
        queryDiv.append(queryImage);
        // Prependng the queryDiv to the HTML page in the "#gifs-appear-here" div
        $("#gifs-appear-here").prepend(queryDiv);
      }
    });
});
// Secret Sauce 

// Anonymous Function
// Immediately invoked
$(".container").on("click", ".queryGiphy", function () {
  console.log("clicked");
  console.log($(this));
  console.log($(this).attr("data-gifVersion"));
  console.log($(this).attr("data-stillVersion"));
  console.log($(this).attr("data-toggle"));

  if ($(this).attr("data-toggle") === "false") {
    $(this).attr("src", $(this).attr("data-gifVersion"));
    $(this).attr("data-toggle", true);
  } else {
    $(this).attr("src", $(this).attr("data-stillVersion"));
    $(this).attr("data-toggle", false);
  }
})
// var dataClickToggle = $(this).attr("data-toggle");
// function dataToggleFunction(){
// }
function clearArrayInputs() {
  $("#buttons-view").empty();
  queryTopic.length = 0;
  queryTopic = [];
}

$("#clearInputs").on("click", function () {
  $("#buttons-view").empty();
  queryTopic.length = 0;
  queryTopic = [];
  clearArrayInputs();
})

// Initial array of chosen topic
var queryTopic = [];

// Function for displaying queryElement data
function renderButtons() {

  // Delete the content inside the buttons-view div prior to adding new queryTopic
  // (this is necessary otherwise you will have repeat buttons)

  $("#buttons-view").empty();


  // Loop through the array of queryTopic, then generate buttons for each element in the array

  for (var i = 0; i < queryTopic.length; i++) {
    var btn = $("<button>");
    btn.attr("data-name", queryTopic[i]);
    btn.text(queryTopic[i]);
    $("#buttons-view").append(btn);
  }
}
// This function handles events where the add queryElement button is clicked
$("#add-queryElement").on("click", function (event) {
  // event.preventDefault() prevents submit button from trying to send a form.
  // Using a submit button instead of a regular button allows the user to hit
  // "Enter" instead of clicking the button if desired
  event.preventDefault();
  // Write code to grab the text the user types into the input field
  var queryElement = $("#queryElement-input").val().trim();
  // Write code to add the new queryElement into the queryElements array
  // queryElement.addClass("XYZ");
  queryTopic.push(queryElement);
  console.log(queryTopic);
  // The renderButtons function is called, rendering the list of queryElement buttons
  renderButtons();
  console.log(queryTopic);
  $("#queryElement-input").val("");


});
