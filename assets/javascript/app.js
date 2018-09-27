var tags = ["beer", "coffee", "memes", "doggo", "gifs"];
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&q=";
var numTags = tags.length;


//Toggle Between Still and Animated Gifs 
function toggleGIFState() {

  console.log("entering toggle gif state");

  var imagePath = $("img", this).attr("src");

  console.log(imagePath);

  if (imagePath.includes("_s")) {
    imagePath = imagePath.replace("_s.gif", ".gif");
  } else {
    imagePath = imagePath.replace(".gif", "_s.gif");
  }
  console.log($("img", this).attr("src", imagePath));
  $("img", this).attr("src", imagePath);

}

//Pull Gifs from GIPHY API and Render to the DOM
function getGIFs(query) {
  $.ajax({
      url: queryURL + query,
      method: "GET"
    })
    // After data comes back from the request
    .then(function (response) {

      console.log(response.data);
      $("#gifs-appear-here").html("");
      // storing the data from the AJAX request in the results variable
      var results = response.data;

      // Looping through each result item
      for (var i = 0; i < results.length; i++) {

        var gifDiv = $("<div>").addClass("gif").addClass("left").addClass("clearfix");
        var p = $("<p>").text("Rating: " + results[i].rating);
        var gifImage = $("<img>");
        gifImage.attr("src", results[i].images.fixed_height_still.url);
        gifDiv.append(gifImage);
        gifDiv.append(p);

        $("#gifs-appear-here").prepend(gifDiv);
      }
    });
}
//Generate gif tags based on array and perform search
function updateAppState(query) { 

 

  //Initial App State
  if (arguments.length === 0){
    for (var i = 0; i < numTags; i++) {
      var buttonDiv = $("<div>");
      var buttonEl = $("<button>").text(tags[i]);
      buttonDiv.append(buttonEl);
      $("#buttons-go-here").append(buttonDiv);
    }

  } else if (arguments.length === 1)
  {
    if (query === ""){
      return false;
    }
    //Add Tag Array if search Query  is not already in the array of tags and then display.
    if (tags.indexOf(query) === -1) {
      tags.push(query);
      numTags++;
      console.log(query);
      $("#buttons-go-here").append("<div><button>"+query+"</button></div>");
      getGIFs(query);

    } else {
      //It already exists in our array. Just show ME the Gifs!
      getGIFs(query);
    }
  }
    $("button").on("click", function() {
      getGIFs($(this).text());
  });

  }

$(document).ready(function () {
  updateAppState();

  $("button").on("click", function () {
    var searchTerm = $(this).text();
    getGIFs(searchTerm);


  });

  $("#get-gifs").on("click", function () {
    event.preventDefault(); 
    var searchTerm = $("#search-text").val().trim().toLowerCase();
    updateAppState(searchTerm);


  });

  $("body").on("click", ".gif", toggleGIFState);
});

