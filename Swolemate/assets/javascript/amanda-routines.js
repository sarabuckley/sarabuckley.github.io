//Initialize Variables



var results = "";

var routineLength = "";

var routineTime = "";

var cardioChosen = false;

var bodyweightChosen = false;



var cardioArray = [

    {

        name: "Invisible Jump Rope",

        gifID: "images/jumprope.gif",

        time: 60,

        instructions: "Jumping rope not only enhances your footwork, shoulder strength, and coordination, but also simulates sprinting"

    },

    {

        name: "Spot Jogging",

        gifID: "images/invisibleJog.gif",

        time: 60,

        instructions: " Lift your knees as high as possible and try kicking your butt. Drive with your arms."

    },



    {

        name: "Jumping Jacks",

        gifID: "images/jumpingJack.gif",

        time: 60,

        instructions: ""

    },



    {

        name: "Mountain Climber Twist",

        gifID: "images/mtnClimberTwist.gif",

        time: 60,

        instructions: ""

    },



    {

        name: "Skaters",

        gifID: "images/skaters.gif",

        time: 60,

        instructions: ""

    },

    

    {

        name: "Squats",

        gifID: "images/squats.gif",

        time: 60,

        instructions: ""

    },



    {

        name: "Leg Ups",

        gifID: "images/legUps.gif",

        time: 60,

        instructions: ""

    },



    {

        name: "Jumping Lunges",

        gifID: "images/jumpLunge.gif",

        time: 60,

        instructions: ""

    }

]



var bodyweightArray = [

    {

        name: "lateral squat",

        gifID: "images/sideLunge.gif",

        time: 60,

        instructions: "Start in a standing position, take your feet out sideways so that they are wider than shoulder width and toes turned out slightly. Reach your hands forwards at shoulder height."

    }

]



//Functions



function displayExerciseGifs() {



    //Check type of exercise selected

    if ($("#customCheck1").prop("checked")) {

        bodyweightChosen = true;

        console.log("bodyweight: " + bodyweightChosen);

    }



    if ($("#customCheck2").prop("checked")) {

        cardioChosen = true;

        console.log("cardio:" + cardioChosen);

    }



    // Check length of exercise routine selected

    routineTime = $("#times option:selected").text();

    var routineLength = routineTime.replace(" minutes", "");





    var queryURL = "http://api.giphy.com/v1/gifs/" + cardioArray[0].gifID + "?api_key=dc6zaTOxFJmzC";



    // Creating an AJAX call for gif selected from array

    $.ajax({

        url: queryURL,

        method: "GET"

    }).then(function (response) {

        console.log(response);



        results = response.data;



        // Store info from object returned

        var imgURL_Still = results.images.fixed_height_still.url;

        var imgURL_Animate = results.images.fixed_height.url;



        // Create a div to hold the animal gifs

        var exerciseDiv = $("<div class='exercise-view'>");



        // Dynamically create image 

        var image = $("<img>").attr("src", imgURL_Animate);

        image.addClass("gif");

        image.attr("data-state", "animate")

        image.attr("data-still", imgURL_Still)

        image.attr("data-animate", imgURL_Animate)



        // Add image to div

        exerciseDiv.append(image);

        $("#exercise-view").prepend(exerciseDiv);

    });

}





// Click Events



$("#startBtn").on("click", displayExerciseGifs);

