
//define your variables 
var gotChoices = ["Daenerys Targaryen", "Jon Snow", "Gregor Clegane", "Cersei Lannister", "Tyrion Lannister", "Arya Stark", "Sansa Stark", "Khal Drogo", "Joffrey Baratheon","Petyr Baelish", "Eddard Stark", "Sandor Clegane", "Robb Stark", "Jaime Lannister", "Bronn", "Ramsey Bolton", "Ygritte", "Theon Greyjoy" ];
var gotLetterGuesses = [];
var gotUnderscores = [];
var maxIncorrectGuesses=6;
var numIncorrectGuesses=0;
var letterMatch=false;
var numberWins=0;
var gameState="";
var gotName = "";


//FUNCTION: initGame
function initGame() {
    
    gameState="In-Play";
    numIncorrectGuesses = 0;
    letterMatch = false;
    gotName = "";
    gotLetter = [];
    gotUnderscores = [];
    gotLetterGuesses = [];
    numIncorrectGuesses = 0;
    document.getElementById("gameOutcome").textContent = "";
    document.getElementById("playAgainQuestion").textContent = "";  
    document.getElementById("instruction1").textContent = "";
    document.getElementById("instruction2").textContent = "";  

    //randomly select inital value for word
    gotName = gotChoices[Math.floor(Math.random() * gotChoices.length)];

    //document.getElementById("answer").textContent = gotName;       

    //initialize selected word with underscores
    for (var j= 0; j < gotName.length; j++){
        if (gotName.charAt(j) !== " ") {
            gotUnderscores.push("_");
        } else {
            gotUnderscores.push(" ");
        }     
    }   
    //display on screen                
    document.getElementById("currentWord").textContent = "Character Name:  " + gotUnderscores.join(" ");
    document.getElementById("lettersGuessed").textContent = "Letters Already Guessed: " + gotLetterGuesses.join(" ");
    document.getElementById("incorrectGuesses").textContent = "Numbers of Guesses Remaining: " + (maxIncorrectGuesses - numIncorrectGuesses);
    document.getElementById("numWins").textContent = "Wins: " + numberWins;
}

//FUNCTION: onKeyUp 
    document.onkeyup = function (event) {    

    if (gameState == "Win" || gameState == "Fail" || gameState == "") {
        initGame();
    } 
    else if (event.keyCode >= 65 && event.keyCode <= 90) {   
        checkGuess(event.key);
    }    
}    
   

//FUNCTION: checkGuess
function checkGuess (letter){   

    //Store letter guess in array
    gotLetterGuesses.push(letter);  
    
    //Check if user guess matches letter 
    for (var k = 0; k < gotName.length; k++){
        if (gotName.charAt(k).toUpperCase() === letter.toUpperCase()){
           letterMatch=true;
            //then need to store letter and return it, but in correct location
           gotUnderscores[k] = gotName.charAt(k);           
        } 
    }
    
    //Check if have completed word        
    if (compareWords(gotName, gotUnderscores)) {   
        gameState = "Win";
        numberWins++;
    } else if (letterMatch) {
        letterMatch=false;
    } else if (numIncorrectGuesses < maxIncorrectGuesses) {
        numIncorrectGuesses++;
        if (numIncorrectGuesses == maxIncorrectGuesses) {
            gameState ="Fail";
        }         
    }
    
    if (gameState=="In-Play") {
        document.getElementById("currentWord").textContent  = "Character Name:  " + gotUnderscores.join(" ");
        document.getElementById("lettersGuessed").textContent = "Letters Already Guessed: " + gotLetterGuesses.join(" ");
        document.getElementById("incorrectGuesses").textContent = "Numbers of Guesses Remaining: " + (maxIncorrectGuesses - numIncorrectGuesses);
        document.getElementById("numWins").textContent = "Wins: " + numberWins;
    } else if (gameState=="Win") {
        document.getElementById("currentWord").textContent  = "Character Name:  " + gotUnderscores.join(" ");
        document.getElementById("lettersGuessed").textContent = "Letters Already Guessed: " + gotLetterGuesses.join(" ");
        document.getElementById("numWins").textContent = "Wins: " + numberWins;
        document.getElementById("instruction1").textContent = "Congratulations! You guessed correctly!";  
        document.getElementById("instruction2").textContent = "Hit any key to play again.";  
    } else if (gameState=="Fail") {
        document.getElementById("currentWord").textContent  = "Character Name:  " + gotUnderscores.join(" ");
        document.getElementById("lettersGuessed").textContent = "Letters Already Guessed: " + gotLetterGuesses.join(" ");
        document.getElementById("incorrectGuesses").textContent = "Numbers of Guesses Remaining: " + (maxIncorrectGuesses - numIncorrectGuesses);
        document.getElementById("numWins").textContent = "Wins: " + numberWins;
        document.getElementById("instruction1").textContent = "Stop! You have used up all of your chances. " + gotName + " will not forget your disloyalty.";
        document.getElementById("instruction2").textContent = "Hit any key to play again.";  
    }    


}        

//FUNCTION: compareWords
function compareWords(value1, value2){
   
    if (value1.length !== value2.length) {
        return false;
    }   
    for (var i=0; i < value2.length; i++ ){
        console.log("value1" + value1.charAt(i));
        console.log("value2" + value2[i]);
        if (value1.charAt(i) !== value2[i]) {
            return false;
        }
    }        
    //if nothing failed, return true
    return true;
}   

