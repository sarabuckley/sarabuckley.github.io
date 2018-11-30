//Initialize Variables

var results = "";
var routineLength = "";
var routineTime = "";
var cardioChosen = false;
var bodyweightChosen = false;
var toggleArrays = true;
var gifLink = "";
var gifTime = "";
var gifIndex = 0;
var playList=[];

var cardioArray = [

    {   name: "Invisible Jump Rope",
        gifURL: "assets/images/jumprope.gif",
        time: 60,
        instructions: "Jumping rope not only enhances your footwork, shoulder strength, and coordination, but also simulates sprinting"
    },

    {   name: "Spot Jogging",
        gifURL: "assets/images/invisibleJog.gif",
        time: 60,
        instructions: " Lift your knees as high as possible and try kicking your butt. Drive with your arms."
    },

    {   name: "Jumping Jacks",
        gifURL: "assets/images/jumpingJack.gif",
        time: 60,
        instructions: ""
    },

    {   name: "Mountain Climber Twist",
        gifURL: "assets/images/mtnClimberTwist.gif",
        time: 60,
        instructions: ""
    },

    {   name: "Skaters",
        gifURL: "assets/images/skaters.gif",
        time: 60,
        instructions: ""
    },

    {   name: "Squats",
        gifURL: "assets/images/squats.gif",
        time: 60,
        instructions: ""
    },

    {   name: "Leg Ups",
        gifURL: "assets/images/legUps.gif",
        time: 60,
        instructions: ""
    },

    {   name: "Jumping Lunges",
        gifURL: "assets/images/jumpLunge.gif",
        time: 60,
        instructions: ""
    }
]

var bodyweightArray = [

    {   name: "lateral squat",
        gifURL: "assets/images/sideLunge.gif",
        time: 60,
        instructions: "Start in a standing position, take your feet out sideways so that they are wider than shoulder width and toes turned out slightly. Reach your hands forwards at shoulder height."
    },

    {   name: "lateral squat",
        gifURL: "assets/images/sideLunge.gif",
        time: 60,
        instructions: "Start in a standing position, take your feet out sideways so that they are wider than shoulder width and toes turned out slightly. Reach your hands forwards at shoulder height."
    },

    {   name: "lateral squat",
        gifURL: "assets/images/sideLunge.gif",
        time: 60,
        instructions: "Start in a standing position, take your feet out sideways so that they are wider than shoulder width and toes turned out slightly. Reach your hands forwards at shoulder height."
    },

    {   name: "lateral squat",
        gifURL: "assets/images/sideLunge.gif",
        time: 60,
        instructions: "Start in a standing position, take your feet out sideways so that they are wider than shoulder width and toes turned out slightly. Reach your hands forwards at shoulder height."
    },

    {   name: "lateral squat",
        gifURL: "assets/images/sideLunge.gif",
        time: 60,
        instructions: "Start in a standing position, take your feet out sideways so that they are wider than shoulder width and toes turned out slightly. Reach your hands forwards at shoulder height."
    }
]

//Functions

function createExerciseList() {

        //Check type of exercise selected

        if ($("#checkBox1a").prop("checked")) {
            bodyweightChosen = true;
            console.log("bodyweight: " + bodyweightChosen);
        }

        if ($("#checkBox2a").prop("checked")){
            cardioChosen = true;
            console.log("cardio:" + cardioChosen);
        }

        // Check length of exercise routine selected

        routineTime = $("#times option:selected").text();
        console.log("routineTime: " + routineTime);
        routineLength = routineTime.replace(" minutes", "");
      
        //reset screen
        resetHTML();

        gifIndex = 0;

        for (var i=0; i < routineLength; i++) {
            if (cardioChosen) {
                gifTime = (cardioArray[i].time * i * 100); //TODO: Change to 1000
            } 

            else if (bodyweightChosen) {
                gifTime = (bodyweightArray[i].time * i * 100);
            }     

            time = setTimeout(displayExerciseGif, gifTime);  
        }    
  
    }     
        
function displayExerciseGif () {

        // Create a div to hold the exercise gif

        var exerciseDiv = $("<div class='exercise-view'>");

        // Dynamically create image 
       
        if (cardioChosen && bodyweightChosen) {
            if (toggleArrays) {
                var image = $("<img>").attr("src", cardioArray[gifIndex].gifURL);
                toggleArrays = false;
            }
            else { 
                var image = $("<img>").attr("src", bodyweightArray[gifIndex].gifURL);
                toggleArrays = true;
            }    
        }

        else if (cardioChosen) {
            var image = $("<img>").attr("src", cardioArray[gifIndex].gifURL);
        } 

        else if (bodyweightChosen) {
            var image = $("<img>").attr("src", bodyweightArray[gifIndex].gifURL);
        } 

        var image = $("<img>").attr("src", cardioArray[gifIndex].gifURL);
        image.addClass("animatedGif");
        image.attr("data-state", "animate")

        // Add image to div
        exerciseDiv.append(image);
        $("#exercise-view").html(exerciseDiv); 

        gifIndex++;

        // Check if time's up for routine
        console.log("gifIndex: " + gifIndex + "routineLength: " + routineLength);
        if (gifIndex === (routineLength - 1)) {
            clearTimeout(time);    
            routineComplete();  
        }    
}

function resetHTML () {

        $(".select-type").hide();
        $(".select-time").hide();
        $(".select-start").hide();
       
}

function routineComplete() {
    
    $(".exercise-view").empty;
    $("#routineCompleteMsg1").html("Well Done!");
}    

function accessSpotify() {    
    
    var clientCode = "ZGM2NmM3NGQyMGFmNDVlZGIxZTUwZmYyNzQ5ZmU0OGE6Y2IyMDY5ZGE3OGNiNDI0NGJhNGU3MWQ3YjU2NGZmOWY=";

    // Get access token
    $.ajax({
        url: "https://accounts.spotify.com/api/token",
        method: "POST",
        data: {
            "grant_type": "client_credentials"
        },
        headers: {
            "Authorization": "Basic ZGM2NmM3NGQyMGFmNDVlZGIxZTUwZmYyNzQ5ZmU0OGE6Y2IyMDY5ZGE3OGNiNDI0NGJhNGU3MWQ3YjU2NGZmOWY=",
        },
        contentType: "application/x-www-form-urlencoded;",
        success: function(res) {
            console.log(res);
            console.log(res.access_token)
            accessToken = res.access_token;
            
            getPlaylist();
        }    
    });        
}    

function getPlaylist() {
    
    var queryURL = "https://api.spotify.com/v1/playlists/37i9dQZF1DX70RN3TfWWJh";

    // Use token to access playlist
    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            "Authorization" : "Bearer " + accessToken,
        },
        success: function(data) {
        console.log(data);
  //      playList = data.
        }
    });
}


// Click Events

$("#startBtn").on("click", createExerciseList);