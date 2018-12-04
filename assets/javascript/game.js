
var nationalParks = ["arches", "big bend", "denali", "glacier", "grand canyon", "grand teton", "great smoky mountain", "yellowstone", "yosemite"];
var wins = 0;

//Start the game after pressing any key.
document.onkeypress = function startGame() {
var letterGuessed = [];
var guessesRemain = 10;

    // Randomly chooses a choice from the nationalParks array. This is the selected park.
    var parkSelection = nationalParks[Math.floor(Math.random() * nationalParks.length)];
    console.log("parkSelection: " + parkSelection);
    //changeImage(nationalParks, parkSelection);

    
    //break the park name into an array with "_" or " " for each character.
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

    //writes the 3 variables to the html, resets all of them when a new game is started.
    document.getElementById("name-of-park").innerHTML = parkPuzzleArray.join("");
    document.getElementById("guess-remain").innerHTML = guessesRemain;
    document.getElementById("letters-guessed").innerHTML = letterGuessed;

    //new code to change image
    function changeImage (npArray, parkSelected) {
      console.log("npArray: " + npArray);
      console.log("parkSelected: " + parkSelected);
      var parkIndex = npArray.findIndex(park => park === parkSelected);
      console.log(parkIndex);
      if (parkIndex === 0) {
          document.getElementById("park-image").src="assets/images/Arches-National-Park.jpg";
      }
      else if (parkIndex === 1) {
          document.getElementById("park-image").src="assets/images/Big-Bend-National-Park.jpg";
      }
      else if (parkIndex === 2) {
          document.getElementById("park-image").src="assets/images/Denali-National-Park.jpg";
      }
      else if (parkIndex === 3) {
          document.getElementById("park-image").src="assets/images/Glacier-National-Park.jpg";
      }
      else if (parkIndex === 4) {
          document.getElementById("park-image").src="assets/images/Grand-Canyon-National-Park.jpg";
      }
      else if (parkIndex === 5) {
          document.getElementById("park-image").src="assets/images/Grand-Teton-National-Park.jpg";
      }
      else if (parkIndex === 6) {
          document.getElementById("park-image").src="assets/images/Great-Smoky-Mountains.jpg";
      }
      else if (parkIndex === 7) {
          document.getElementById("park-image").src="assets/images/Yellowstone-National-Park.jpg";
      }
      else if (parkIndex === 8) {
          document.getElementById("park-image").src="assets/images/Yosemite-National-Park.jpg";
      }
  }

  changeImage(nationalParks, parkSelection);

    //Capture the letter pressed by the user.
        document.onkeypress = function(event) {
            var letter = event.key.toLowerCase();

            // Determines which key was pressed.
            var userGuess = event.key.toLowerCase();
            console.log("userGuess: " + userGuess);

            //function to determine if key was already pressed by user and if not then
            //Adds letter pressed to letterGuessed array.
            function letterAlreadyGuessed (letterGuessed, userGuess) {
                if (letterGuessed.indexOf(userGuess) === -1) {
                    letterGuessed.push(userGuess);
                    return "letter once";
                } else if (letterGuessed.indexOf(userGuess) > -1) {
                    return "letter dupe";
                }
            }
    
        //function to determine if letter chosen matches any letters in the park name
            function letterInParkName (userGuessPassed) {
                var parkNameArrayIndices = [];
                var idx = parkNameArray.indexOf(userGuessPassed);
                while (idx != -1) {
                    parkNameArrayIndices.push(idx);
                    idx = parkNameArray.indexOf(userGuessPassed, idx + 1);
                }
                return parkNameArrayIndices;
            }

            //function to change image after win
            function displayName (npArray, parkSelected) {
                console.log("npArray: " + npArray);
                console.log("parkSelected: " + parkSelected);
                var parkIndex = npArray.findIndex(park => park === parkSelected);
                console.log(parkIndex);
                if (parkIndex === 0) {
                    document.getElementById("park-name").innerHTML="Arches National Park";
                }
                else if (parkIndex === 1) {
                    document.getElementById("park-name").innerHTML="Big Bend National Park";
                }
                else if (parkIndex === 2) {
                    document.getElementById("park-name").innerHTML="Denali National Park";
                }
                else if (parkIndex === 3) {
                    document.getElementById("park-name").innerHTML="Glacier National Park";
                }
                else if (parkIndex === 4) {
                    document.getElementById("park-name").innerHTML="Grand Canyon National Park";
                }
                else if (parkIndex === 5) {
                    document.getElementById("park-name").innerHTML="Grand Teton National Park";
                }
                else if (parkIndex === 6) {
                    document.getElementById("park-name").innerHTML="Great Smoky Mountain National Park";
                }
                else if (parkIndex === 7) {
                    document.getElementById("park-name").innerHTML="Yellowstone National Park";
                }
                else if (parkIndex === 8) {
                    document.getElementById("park-name").innerHTML="Yosemite National Park";
                }
            }

        
            //checking to see if the letter has already been guessed before.  If not write out the letter to the 
            //letters guessed
            var letterFunction = letterAlreadyGuessed (letterGuessed, userGuess);
            document.getElementById("letters-guessed").innerHTML = letterGuessed;
            console.log(letterGuessed);
            


            //checking to see if the letter guessed matches any letters in the puzzle.  If so return their 
            //index, then replace the _ with the letters and write that to the html.
            var letterMatchResult = 0;
            if (letterFunction === "letter once") {
                letterMatchResult = letterInParkName(userGuess);
                console.log("letterMatchResult: " + letterMatchResult);
                for (var z=0; z<letterMatchResult.length; z++) {
                    parkPuzzleArray.splice(letterMatchResult[z], 1, userGuess);
                }
                document.getElementById("name-of-park").innerHTML = parkPuzzleArray.join("");            
            }

            //decrement the guesses remaining if letter does not match and write that to the html.
            if (letterMatchResult.length <= 0) {
                guessesRemain--;
                document.getElementById("guess-remain").innerHTML = guessesRemain;
            }

            //logic to see if there are no remaining guesses and if so start a new game
            if (guessesRemain <= 0) {
                document.getElementById("press-key").innerHTML = "Press any key to play again!";
                document.getElementById("win-loss").innerHTML = "LOSER!!";
                displayName(nationalParks, parkSelection);
                document.onkeypress = function reset() {
                  document.getElementById("park-name").innerHTML="";
                  document.getElementById("press-key").innerHTML = "";
                  document.getElementById("win-loss").innerHTML = "";
                  startGame();
                };
            }

            //logic to see if the puzzle is solved and if so add to wins, chnage image & start new game
            var parkPuzzleStrg = parkPuzzleArray.toString();
            var parkNameStrg = parkNameArray.toString();
            if (parkNameStrg === parkPuzzleStrg){
                wins++;
                document.getElementById("nbr-wins").innerHTML = wins;
                document.getElementById("press-key").innerHTML = "Press any key to play again!";
                document.getElementById("win-loss").innerHTML = "WINNER!!";
                displayName(nationalParks, parkSelection);
                document.onkeypress = function restart() {
                  document.getElementById("park-name").innerHTML="";
                  document.getElementById("press-key").innerHTML = "";
                  document.getElementById("win-loss").innerHTML = "";
                  startGame();
                };
            };

        }

}




    