// Initialize Firebase
var config = {
    apiKey: "AIzaSyACsAt9G2iFKlrlxusbcLvvRk9YAnGt1ss",
    authDomain: "uw-bootcamp-train-scheduler.firebaseapp.com",
    databaseURL: "https://uw-bootcamp-train-scheduler.firebaseio.com",
    projectId: "uw-bootcamp-train-scheduler",
    storageBucket: "",
    messagingSenderId: "230188019861"
};

  firebase.initializeApp(config);


    // Create a variable to reference the database
    var database = firebase.database();

    // Initial Values
    var name = "";
    var destination = "";
    var starttime = 0;
    var frequency = 0;
    var counter = 0;
    var nextTrain = "";
    var tMinutesTillTrain = 0;


$("#add-train").on("click", function(event) {
  // Prevent form from submitting
  event.preventDefault();
      name = $("#name-input").val().trim();
      destination = $("#destination-input").val().trim();
      starttime = $("#starttime-input").val().trim();
      frequency = $("#frequency-input").val().trim();

      database.ref().push({
        trainName: name,
        trainDestination: destination,
        trainStarttime: starttime,
        trainFrequency: frequency

      });
});

function displayData(){

    database.ref().orderByChild("trainName").on("child_added", function(snapshot) {
 
        trnName = snapshot.val().trainName;
        trnDestination = snapshot.val().trainDestination;
        trnFrequency = snapshot.val().trainFrequency;
        trnStarttime = snapshot.val().trainStarttime;
        nextArrival(trnFrequency, trnStarttime);

       var newRow = "<tr>"  
        + "<td colspan='4'>" + trnName + "</td>"
        + "<td>" + trnDestination + "</td> "
        + "<td>" + trnFrequency + "</td>"
        + "<td>" + nextTrain + "</td>"
        + "<td>" + tMinutesTillTrain + "</td></tr>";
 
    $("#scheduleInfo").append(newRow);
});

function nextArrival(tFrequency, firstTime) {

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

    // Current Time
    var currentTime = moment();

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;

    // Minute Until Train
    tMinutesTillTrain = tFrequency - tRemainder;

    // Next Train
    var nextTrainRaw = moment().add(tMinutesTillTrain, "minutes");
    nextTrain = moment(nextTrainRaw).format("hh:mm A");
}}; 


displayData();
