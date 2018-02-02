
var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var nationalParks = ["arches", "big bend", "denali", "glacier", "yellowstone", "yosemite"];
var letterGuessed = [];
var wins = 0;
var guessesRemain = 10;

// Randomly chooses a choice from the nationalParks array. This is the selected park.
var parkSelection = nationalParks[Math.floor(Math.random() * nationalParks.length)];
console.log(parkSelection);

  
//break the park name into an array with element for each character.
var parkNameArray = parkSelection.split("");
console.log("parkNameArray: " + parkNameArray);
var parkPuzzleArray = [];
for (x=0; x<parkNameArray.length; x++) {
    if (parkNameArray[x] === " ") {
        parkPuzzleArray.push(" ");
    }
    else {
        parkPuzzleArray.push("_");
    }
}

document.getElementById("parkName").innerHTML = parkPuzzleArray.join("");
document.getElementById("guess-remain").innerHTML = guessesRemain;

//Start the game after pressing any key.
//document.onkeypress = startGame(); 

//function startGame() {

//Capture the letter pressed by the user.
    document.onkeypress = function(event) {
        var letter = event.key.toLowerCase();

        // Determines which key was pressed.
        var userGuess = event.key;
        console.log("userGuess: " + userGuess);

        //logic to determine if key was already pressed by user and if not then
        //Adds letter pressed to letterGuessed array.
        function letterAlreadyGuessed (letterGuessed, userGuess) {
            if (letterGuessed.indexOf(userGuess) === -1) {
                letterGuessed.push(userGuess);
                console.log('New letter collection is : ' + letterGuessed);
                return "letter once";
            } else if (letterGuessed.indexOf(userGuess) > -1) {
                console.log(userGuess + ' already exists in the letterGuessed collection.');
                return "letter dupe";
            }
        }
  
    //logic to determine if letter chosen matches any letters in the park name
        function letterInParkName (userGuessPassed) {
            var parkNameArrayIndices = [];
            var idx = parkNameArray.indexOf(userGuessPassed);
            var invalidGuess = "";
            console.log("idx: " + idx)
            //if (idx = -1) {
                //return invalidGuess = "invalid";
            //}
            while (idx != -1) {
                parkNameArrayIndices.push(idx);
                idx = parkNameArray.indexOf(userGuessPassed, idx + 1);
            }
            return parkNameArrayIndices;
            console.log("Example my indices: " + parkNameArrayIndices);
        }


        

    //!!if letter matches, populate the html to display & determine if puzzle solved, 
      //!!if not solved wait for next letter, if no match then decrement the number of guesses by 1!!
    //!!if solved add 1 to wins and display html and start new puzzle!!
    //!!if out of guesses, start new puzzle!!
    
        //checking to see if the letter has already been guessed before.  If not write out the letter to the 
        //letters guessed
        var letterFunction = letterAlreadyGuessed (letterGuessed, userGuess);
        console.log("letterFunction: " + letterFunction);
        document.getElementById("letters-guessed").innerHTML = letterGuessed;
        


        //checking to see if the letter guessed matches any letters in the puzzle.  If so return their index.
        var letterMatchResult = 0;
        if (letterFunction === "letter once") {
            letterMatchResult = letterInParkName(userGuess);
            console.log("letterMatchResult: " + letterMatchResult);
            for (var z=0; z<letterMatchResult.length; z++) {
                parkPuzzleArray.splice(letterMatchResult[z], 1, userGuess);
            }
            document.getElementById("parkName").innerHTML = parkPuzzleArray.join("");            
        }

        if (letterMatchResult.length <= 0) {
            guessesRemain--;
            document.getElementById("guess-remain").innerHTML = guessesRemain;
        }
        console.log(guessesRemain);


    }

    console.log('New letter collection outside is : ' + letterGuessed);
//}




    