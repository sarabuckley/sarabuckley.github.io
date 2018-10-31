
  // Variables

      let counter = 0;
      let targetNumber = 0;
      let images = ["assets/images/crystal1.jpg", "assets/images/crystal2.jpg","assets/images/crystal3.jpg", "assets/images/crystal4.jpg" ];
      let numWins = 0;
      let numLosses = 0;
      let gameFlag = "";


  // Initialize game

      numWins =0;
      numLosses = 0;
      $("#totalScore").html("<p>Total Score</p>" + counter);
      $("#numWins").html("Wins: " + numLosses)
      $("#numLosses").html("Losses: " + numLosses)
      genTargetNumber();
      resetCrystals();

  // Functions

        function genTargetNumber() {
            targetNumber = Math.floor(Math.random() * (120 - 19)) + 19; 
            $("#targetNumber").html("<p>Target Number</p>" + targetNumber);
        }

        function resetCrystals () {
            for (var i = 0; i < images.length; i++) {
                var imageCrystal = $("<img>");
                imageCrystal.addClass("crystal-image");
                imageCrystal.attr("src", images[i]);
                imageCrystal.attr("crystal-value", (Math.floor(Math.random() * 12) + 1));
                imageCrystal.attr("height", "100");
                $("#crystals").append(imageCrystal);
            }
        }   

        function resetGame() {
            counter = 0;
            $("#totalScore").html("<p>Total Score</p>" + counter);
            $("#statusMsg").text("");
            $("#crystals").empty();
            genTargetNumber();
            resetCrystals(); 
        }  

        function clickCrystals () {
            var crystalValue = parseInt($(this).attr("crystal-value"));

            if (counter < targetNumber) {   
                counter += crystalValue;
                $("#totalScore").html("<p>Total Score</p>" + counter);
                
                    if (counter > targetNumber) {
                        numLosses++;
                        $("#statusMsg").html("<p>You lost!!</p>");  
                        $("#numLosses").html("Losses: " + numLosses);
                        setTimeout(resetGame, 3000);       
                    }

                    else if (counter === targetNumber) {
                        numWins++;
                        $("#statusMsg").html("<p>You won!!</p>");
                        $("#numWins").html("Wins: " + numWins);
                        setTimeout(resetGame, 3000);         
                    }
            } 
        }

        function mouseoverCrystals() {
            this.className = "crystal-image-mouseOver";
        }

        function mouseoutCrystals() {
            this.className = "crystal-image";
        }

  // Click event  (must use document as dynamically creating image elements)
      $(document).on("click", ".crystal-image-mouseOver", clickCrystals);
      $(document).on("mouseover", ".crystal-image", mouseoverCrystals);
      $(document).on("mouseout", ".crystal-image-mouseOver", mouseoutCrystals);
        
     

    

  
  