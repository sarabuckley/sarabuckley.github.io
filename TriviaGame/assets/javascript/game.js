
//Initialize Variables
  var tempAnswers = []; 
  var seconds = 0;
  var time = "";
  var pause = 0;
  var timesUp = false;
  var currentQuestion = 0;
  var triviaObj = {};
  var messages = {
    correct: "Correct!",
    incorrect: "Nope!",
    endTime: "Out of Time!",
    finished: "All done. Here's how you did!"
  }
         
//Functions

    function triviaQuery() {
         
         var queryURL = "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple";
            
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
                $("#triviaQuestion").html(triviaObj.results[currentQuestion].question);
                tempAnswers = [];

                for (var j = 0; j < triviaObj.results[currentQuestion].incorrect_answers.length; j++ ){ 
                    tempAnswers[j] = triviaObj.results[currentQuestion].incorrect_answers[j];
                }
                
                insertCorrectAnswer(triviaObj.results[currentQuestion].correct_answer);

                // Dynamically generate buttons for multiple choice answers
                for (var k = 0; k < tempAnswers.length; k++){
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
          seconds = 30;
          $("#timer").html("Time Remaining: " + seconds + " seconds");
          //sets timer to go down
          time = setInterval(showCountdown, 1000);
    }

    function showCountdown() {
          
          timesUp = false;
          seconds--;
          $("#timer").html("Time Remaining: " + seconds + " seconds");
//          $("#timer").css("font-size", seconds + 8 + "px");

          if (seconds === 0 || seconds < 0) {
              timesUp = true;            
              answerCheck();          
          }
    }
    
    function answerCheck() {

          clearInterval(time);
          clearTimeout(pause);

          if ($(this).attr("data-answer") === triviaObj.results[currentQuestion].correct_answer) {
              clearInterval(time);
              $("#message").html(messages.correct);
          } else if (timesUp){
              $("#message").html(messages.endTime);
              $("#answer").html("The correct answer is: " + triviaObj.results[currentQuestion].correct_answer);
          } else {
              $("#message").html(messages.incorrect);
              $("#answer").html("The correct answer is: " + triviaObj.results[currentQuestion].correct_answer);    
          }

          currentQuestion++;
          pause = setTimeout(triviaQuestions, 3000);
      }

//Click Events

  $("#startGame").on("click", triviaQuery);
  $(document).on("click", ".triviaBtn", answerCheck);


//  $(document).on("mouseover", ".crystal-image", mouseoverCrystals);
//  $(document).on("mouseout", ".crystal-image-mouseOver", mouseoutCrystals);