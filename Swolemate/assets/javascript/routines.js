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
var image = "";
var audio;

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
        instructions: "Stand up straight with your shoulders back and your pelvis relaxed. Hold your arms at your side with your feet shoulder-width apart, then jump, spreading your legs slightly and extending your arms over your head. As you land, bring your arms back down to your sides. Tuck in your tummy while doing these for toning your lower abs as well."
    },

    {   name: "Mountain Climber Twist",
        gifURL: "assets/images/mtnClimberTwist.gif",
        time: 60,
        instructions: "From a high plank position with core tight, run left knee in toward right elbow, then right knee in toward left elbow. Continue to alternate as quickly as possible without hiking hips. For an easier version: Run knees straight in toward chest rather than twisting."
    },

    {   name: "Skaters",
        gifURL: "assets/images/skaters.gif",
        time: 60,
        instructions: "Stand with feet hip width and a slight bend in knees. Jump to the right with right foot, landing lightly on the ball of your right foot and sweeping left foot behind right leg. Do not put weight on left foot if you can help it! Immediately jump to the left with left foot, allowing right foot to sweep behind left leg. Continue to alternate sides."
    },

    {   name: "Squats",
        gifURL: "assets/images/squats.gif",
        time: 60,
        instructions: ""
    },

    {   name: "Leg Ups",
        gifURL: "assets/images/legUps.gif",
        time: 60,
        instructions: "While standing, alternate kicking each leg in front of you as high as possible."
    },

    {   name: "Jumping Lunges",
        gifURL: "assets/images/jumpLunge.gif",
        time: 60,
        instructions: ""
    }
]

var bodyweightArray = [
    {   name: "Lateral Squat",
        gifURL: "assets/images/sideLunge.gif",
        time: 60,
        instructions: "Start in a standing position, take your feet out sideways so that they are wider than shoulder width and toes turned out slightly. Reach your hands forwards at shoulder height."
    },

    {   name: "Plank",
        gifURL: "assets/images/plank.gif",
        time: 60,
        instructions: "Lie face down with forearms on the floor and hands clasped. Extend the legs behind the body and rise up on the toes. Keeping the back straight, tighten the core and hold the position for 30-60 seconds (or as long as you can)."
    },

    {   name: "Reverse Lunge",
        gifURL: "assets/images/reverseLunge.gif",
        time: 60,
        instructions: "Start in a standing position, take your feet out sideways so that they are wider than shoulder width and toes turned out slightly. Reach your hands forwards at shoulder height."
    },

    {   name: "Curtsy Lunge",
        gifURL: "assets/images/curtsyLunge.gif",
        time: 60,
        instructions: "Start in a standing position, take your feet out sideways so that they are wider than shoulder width and toes turned out slightly. Reach your hands forwards at shoulder height."
    },

    {   name: "Push Up",
        gifURL: "assets/images/pushUp.gif",
        time: 60,
        instructions: "Start in a standing position, take your feet out sideways so that they are wider than shoulder width and toes turned out slightly. Reach your hands forwards at shoulder height."
    },

    {   name: "Tricep Dips",
        gifURL: "assets/images/tricepDips.gif",
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
        routineLength = parseInt(routineTime.replace(" minutes", ""));
    
        //reset screen
        resetHTML();

        //Start Dan's timer
        dansTimerFunc();

        //Start music
        accessSpotify();


        gifIndex = 0;     
        
        for (var i=0; i < routineLength+1; i++) {
            
            console.log("i: " + i);

            if (cardioChosen) {
                gifTime = (cardioArray[i].time * i * 1000); //TODO: Change to 50 to speed up
            } 

            else if (bodyweightChosen) {
                gifTime = (bodyweightArray[i].time * i * 1000);
            }     

            console.log("routineLength: " + routineLength);
            if (i < routineLength) {
                // not the last step, so schedule a gif
                time = setTimeout(displayExerciseGif, gifTime);  
                console.log("in gif schedule, i: " + i);
            }
            else {
                // the last step, so schedule the end message
                time = setTimeout(routineComplete, gifTime);  
                //clearTimeout(time);
                console.log("in final msg schedule, i: " + i);
                console.log("routineLength: " + routineLength);
            }
        }    
  
    }     
        
function displayExerciseGif () {

        // Create a div to hold the exercise gif

        var exerciseDiv = $("<div class='exercise-view'>");

        // Dynamically create image 
        if (cardioChosen && bodyweightChosen) {
            if (toggleArrays) {
                image = $("<img>").attr("src", cardioArray[gifIndex].gifURL);
                var title = cardioArray[gifIndex].name;
            //    iconImage = $("<img>").attr("src", "assets/images/carioIcon.png");
                toggleArrays = false;
            }
            else { 
                image = $("<img>").attr("src", bodyweightArray[gifIndex].gifURL);
                var title = bodyweightArray[gifIndex].name;
            //    iconImage = $("<img>").attr("src", "assets/images/bodyWeightIcon.png");
                toggleArrays = true;
            }    
        }

        else if (cardioChosen) {
            image = $("<img>").attr("src", cardioArray[gifIndex].gifURL);
            var title = cardioArray[gifIndex].name;
        //    iconImage = $("<img>").attr("src", "assets/images/carioIcon.png");
        } 

        else if (bodyweightChosen) {
            image = $("<img>").attr("src", bodyweightArray[gifIndex].gifURL);
            var title = bodyweightArray[gifIndex].name;
        //    iconImage = $("<img>").attr("src", "assets/images/bodyWeightIcon.png");
        } 

        //var image = $("<img>").attr("src", cardioArray[gifIndex].gifURL);
        image.addClass("animatedGif");
        image.attr("data-state", "animate")
        iconImage = "assets/images/bodyWeightIcon.png";
        var caption = $("<figcaption id='caption'>" + title + "</figcaption>");
        //iconImage.addClass("animatedGif");

        // Add image to div
        exerciseDiv.append(caption);
        //exerciseDiv.append(iconImage);
        console.log("image src" + image.attr("src"));
        exerciseDiv.append(image);
       
        $("#exercise-routines").html(exerciseDiv); 

        gifIndex++;

}

function resetHTML () {

        $(".select-type").hide();
        $(".select-time").hide();
        $(".select-start").hide();
       
}

function routineComplete() {
    
    // Hide existing display
    $("#caption").hide();
    $(".animatedGif").hide();
    $(".timerwheels").hide();

    // Render Final Page
    $("#routineCompleteMsg1").html("Great Job Finishing Your Workout!");
    $("#routineCompleteMsg2").html("You're on your way to swole, mate ; )");

    // Gif
    //var swoleGif = "https://media.giphy.com/media/3ohhwgf8em8fLaqM6s/giphy.gif";
    //var image = $("<img>").attr("src", swoleGif);
    //    image.addClass("img-thumbnail");
    //    image.attr("alt", "Care Bears")

    var image = $("<img src='https://media.giphy.com/media/3ohhwgf8em8fLaqM6s/giphy.gif' class='img-thumbnail' alt='Care Bears'><img>");
    $("#routineCompleteGif").append(image);

    // Button
    var something = $('<input/>').attr({ type: 'button', id: 'facebookShareLink', name:'facebookLink', value:'Go Ahead and Brag to your Friends' });
    //now append this to your div (in this example, it has the id "item")
    
    $("#facebookShare").append(something);
    
}    

function shareSite() {
        //document.getElementById("facebookShareLink").addEventListener("click", function () {
        var cap = "The SWOLEMATES site helped me work out (some of) my poor choices from the weekend.  Try it out and be my SWOLEMATE <3"
        var fbpopup = window.open(`https://www.facebook.com/sharer/sharer.php?u=http://sarabuckley.github.io/Swolemate/&quote="${cap}"`, "pop", "width=600, height=400, scrollbars=no");
    //    return false;
    //})
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
        //audio = $(playList[0].tracks.external_urls.spotify);
        audio = data.tracks.items[0].track.external_urls.spotify;
        console.log("audio: " + audio);
        $("musicIframe").src = audio;
        }
    });
}

function dansTimerFunc() {

    var maxTimes = sel;
    var again;
    console.log("maxTimes:" + maxTimes);
    
    $("#full-timer").Circlebar({
        startTime: sel*60,
        maxValue: sel*60,
        fontSize: "15px",
        triggerPercentage: true,
        fontColor: "#777"

    });
    function cycleTimer() {

        if (times < maxTimes) {
            $("#minute-timer").Circlebar({
                startTime: 60,
                maxValue: 60,
                fontSize: "15px",
                triggerPercentage: true,
                fontColor: "#333"

            });
            times++;
            console.log(times);
            again = setTimeout(cycleTimer, 60000);

        } else {
            clearTimeout(again);
            times = 0;
        }
    };

    cycleTimer();
   
}

// Click Events

$("#startBtn").on("click", createExerciseList);

$("#facebookShare").on("click", shareSite);