// Initialize variables
var animals = ["Cat", "Dog", "Sloth", "Lemurs", "Seals", "Monkeys"];
var results = [];
var limit = 10;
var offset = 0;
var storedOffset = {
    Cat: 0,
    Dog: 0,
    Sloth: 0,
    Lemurs: 0,
    Seals: 0,
    Monkeys: 0
};

//Functions

   function displayAnimalGifs() {

        var animal = $(this).attr("data-name");

        //retrieve offset if it exists
        offset = storedOffset[animal];
//        $.each(storedOffset, function(key, value) {
//            console.log(key);
//            if (key === animal) {
//                offset = value;
//            } else
//                offset = 0;
//        });

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=" + limit +"&offset=" + offset;
        
       
        // Creating an AJAX call for the specific animal button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          console.log(response);

            // Store the offset in local storage
            offset = parseFloat(offset) + parseFloat(limit);
            storedOffset[animal] = offset;

            results = response.data;
            for (var i = 0; i < results.length; i++) {     
              
              // Store info from object returned
              var rating = results[i].rating;
              var imgURL_Still = results[i].images.fixed_height_still.url;
              var imgURL_Animate = results[i].images.fixed_height.url;
             

               // Create a div to hold the animal gifs
               var animalDiv = $("<div class='animalgif'>");

              // Dynamically create image 
              var image = $("<img>").attr("src", imgURL_Still);
              image.addClass("gif");
              image.attr("data-state", "still") 
              image.attr("data-still", imgURL_Still)
              image.attr("data-animate", imgURL_Animate) 
            
              // Add image to div
              animalDiv.append(image);
              $("#animals-view").prepend(animalDiv);

             // Add title and rating
              var pOne = $("<p>").html(results[i].title + "  rating: " + rating);         
              animalDiv.append(pOne)
              
            };  
        });

      }     
      
    function renderButtons() {

        // Deleting the animals prior to adding new animals
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        for (var i = 0; i < animals.length; i++) {

            // Dynamically generate buttons for each animal in the array
            var a = $("<button>");
            a.addClass("animal-btn");
            a.attr("data-name", animals[i]);
            a.text(animals[i].toUpperCase());
            $("#buttons-view").append(a);
        }
    }

    function changeGifState() {

        var state = $(this).attr("data-state");
       console.log(state);
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    }

// Click Events

    $(document).on("click", ".animal-btn", displayAnimalGifs);
    $(document).on("click", ".gif", changeGifState); 

    $("#add-animal").on("click", function(event) {
            event.preventDefault();
            var animal = $("#animal-input").val().trim();
            animals.push(animal);
            renderButtons();
    });
        

 // Calling the renderButtons function to display the intial buttons
    renderButtons();
  
      