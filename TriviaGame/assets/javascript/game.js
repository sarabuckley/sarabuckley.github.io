
//Initialize Variables
  var tempAnswers = []; 
  var seconds = 0;
  var time = "";
  var pause = 0;
  var timesUp = false;
  var currentQuestion = 0;
  var correctAnswer = 0;
  var incorrectAnswer = 0;
  var unAnswered = 0;
  var triviaObj = {};
  var messages = {
    correct: "Correct!",
    incorrect: "Nope!",
    endTime: "Out of Time!",
    finished: "All done. Here's how you did!"
  }
         
//Functions

    function newGame(){

        tempAnswers = []; 
        seconds = 0;
        time = "";
        pause = 0;
        timesUp = false;
        currentQuestion = 0;
        correctAnswer = 0;
        incorrectAnswer = 0;
        unAnswered = 0;
        $("#message").empty();
        $("#correctAnswers").empty();
        $("#incorrectAnswers").empty();
        $("#unanswered").empty();
        $("#startOverBtn").empty();
        $(".triviaAnswerBtns").empty();
        $("#answer").empty();
        $("#startBtn").hide();
        $('#startOverBtn').hide();

        triviaQuery();         
    }

    function triviaQuery() {
         
         var queryURL = "https://opentdb.com/api.php?amount=5&category=22&type=multiple";
            
         $.ajax({
                url: queryURL,
                method: 'GET'
                }).then(function(response) {
                  console.log(response);
                  triviaObj = response;
                  triviaQuestions();
              });
    }              

    function triviaQuestions() {

            //reset screen 
            $(".triviaAnswerBtns").empty();
            $("#message").empty ();
            $("#answer").empty();
            
            if (currentQuestion < triviaObj.results.length)
            {
                $("#triviaQuestion").html("<br>" + triviaObj.results[currentQuestion].question + "<br>");
                $("#triviaQuestion").show();
                tempAnswers = [];

                for (var j = 0; j < triviaObj.results[currentQuestion].incorrect_answers.length; j++ ){ 
                    tempAnswers[j] = triviaObj.results[currentQuestion].incorrect_answers[j];
                }
                
                insertCorrectAnswer(triviaObj.results[currentQuestion].correct_answer);

                // Dynamically generate buttons for multiple choice answers
                for (var k = 0; k < tempAnswers.length; k++){
                    var b = $("<br>");
                    $(".triviaAnswerBtns").append(b);
                    var a = $("<button>");
                    a.addClass("triviaBtn");
                    a.attr("data-answer", tempAnswers[k]);
                    a.html(tempAnswers[k]);
                    $(".triviaAnswerBtns").append(a);
                }
                // Wait 30 seconds for answer
                startCountdown();
              }                    
            
    }

    function insertCorrectAnswer(value) {
    
        //first generate a random number between 0 and 3
        var random = Math.random() * (4 - 0) + 0;

        //then insert correct answer in a random position in the array
        tempAnswers.splice(random, 0, value);
    }      

    function startCountdown(){
          
          seconds = 20;
          $("#timer").show();
          $("#timer").html("Seconds Remaining: " + seconds);
          time = setInterval(showCountdown, 1000);
    }

    function showCountdown() {

          timesUp = false;
          seconds--;          
          $("#timer").html("Seconds Remaining: " + seconds);
          if (seconds === 0 || seconds < 0) {
              timesUp = true;            
              answerCheck();          
          }
    }
    
    function answerCheck() {

          clearInterval(time);
          clearTimeout(pause);
          $("#timer").hide();
          $(".triviaAnswerBtns").empty();
          $("#triviaQuestion").hide();

          if ($(this).attr("data-answer") === triviaObj.results[currentQuestion].correct_answer) {
              clearInterval(time);
              correctAnswer ++;
              $("#message").html(messages.correct);
          } else if (timesUp){
              unAnswered++;
              $("#message").html(messages.endTime);
              $("#answer").html("The correct answer is: " + triviaObj.results[currentQuestion].correct_answer);
          } else {
              incorrectAnswer++;
              $("#message").html(messages.incorrect);
              $("#answer").html("The correct answer is: " + triviaObj.results[currentQuestion].correct_answer);    
          }

          currentQuestion++;

          // check if end of game
          if (currentQuestion > (triviaObj.results.length - 1)) {
                setTimeout(scoreGame, 3000);
          } else {
                setTimeout(triviaQuestions, 3000);
          }
      }

    function scoreGame(){
        $("#timer").empty();
        $("#triviaQuestion").empty();
        $(".triviaAnswerBtns").empty();
        $("#answer").empty();
        $("#message").html("<br>" + messages.finished + "<br>");
        $("#correctAnswers").html("<br> Correct Answers: " + correctAnswer + "<br>");
        $("#incorrectAnswers").html("Incorrect Answers: " + incorrectAnswer);
        $("#unanswered").html("Unanswered: " + unAnswered);
	    $('#startOverBtn').show();
	    $('#startOverBtn').html('Play Again?');
    }


//Click Events

  $("#startBtn").on("click", newGame);
  $("#startOverBtn").on("click", newGame);
  $(document).on("click", ".triviaBtn", answerCheck);
  $('#startOverBtn').hide();


