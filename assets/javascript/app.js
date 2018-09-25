var tags = ["beer", "coffee"];
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
      console.log(queryURL);

      console.log(response);
      // storing the data from the AJAX request in the results variable
      var results = response.data;

      // Looping through each result item
      for (var i = 0; i < results.length; i++) {

        // Creating and storing a div tag
        var gifDiv = $("<div>").addClass("gif");

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var gifImage = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        gifImage.attr("src", results[i].images.fixed_height_still.url);

        // Appending the paragraph and image tag to the animalDiv
        gifDiv.append(p);
        gifDiv.append(gifImage);

        // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
        $("#gifs-appear-here").prepend(gifDiv);
      }
    });
}
//Generate gif tags based on array and perform search
function updateAppState(query) {  
  
  //Initial App State
  if (arguments.length == 0){
    for (var i = 0; i < numTags; i++) {
      var buttonDiv = $("<div>");
      var buttonEl = $("<button>").text(tags[i]);
      buttonDiv.append(buttonEl);
      $("#buttons-go-here").append(buttonDiv);
    }
  }
  else if (arguments.length == 1)
  {

    //Add Tag Array if search Query  is not already in the array of tags and then display.
    if (tags.indexOf(query) === -1) {
      tags.push(query);
      numTags++;
      console.log(query);
      $("#buttons-go-here").append("<div><button>"+query+"</button></div>");
      getGIFs(query);
    } else {
      //It already exists in our array. Just show the Gifs!
  
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
    event.preventDefault(); 

    var searchTerm = $(this).text();
    getGIFs(searchTerm);
    updateAppState(searchTerm);


  });

  $("#get-gifs").on("click", function () {
    event.preventDefault(); 

    var searchTerm = $("#search-text").val();
    updateAppState(searchTerm);

  });


  $("body").on("click", ".gif", toggleGIFState);




});

