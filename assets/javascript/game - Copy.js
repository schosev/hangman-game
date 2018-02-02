
var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var nationalParks = ["arches", "big bend", "denali", "glacier", "grand canyon", "grand teton", "great smoky mountain", "yellowstone", "yosemite"];
var letterGuessed = [];
var wins = 0;

// Randomly chooses a choice from the nationalParks array. This is the selected park.
var parkSelection = nationalParks[Math.floor(Math.random() * nationalParks.length)];
console.log(parkSelection);
//loop to write the "_" for each letter in the park name.
for (i=0; i<parkSelection.length; i++) {
    if (parkSelection[i] === " ") {
        console.log("space: " + parkSelection[i]);
        document.getElementById("parkName").insertAdjacentHTML("beforeend", "&nbsp;");
    }
    else {
        console.log("letter: " + parkSelection[i]);
        var theDiv = document.getElementById("parkName");
        var content = document.createTextNode("_ ");
        theDiv.appendChild(content);
    }
}
  

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
        function updateLetterGuessed (letterGuessed, userGuess) {
            if (letterGuessed.indexOf(userGuess) === -1) {
                letterGuessed.push(userGuess);
                console.log('New letter collection is : ' + letterGuessed);
            } else if (letterGuessed.indexOf(userGuess) > -1) {
                console.log(userGuess + ' already exists in the letterGuessed collection.');
            }
        }

        updateLetterGuessed (letterGuessed, userGuess);

        //break the park name into an array with element for each character.
        var parkNameArray = parkSelection.split("");
        console.log("parkNameArray: " + parkNameArray);
    
    //logic to determine if letter chosen matches any letters in the park name

        var parkNameArrayIndices = [];
        var idx = parkNameArray.indexOf(userGuess);
        while (idx != -1) {
            parkNameArrayIndices.push(idx);
            idx = parkNameArray.indexOf(userGuess, idx + 1);
        }


        console.log("Example my indices: " + parkNameArrayIndices);

    //!!if letter matches, populate the html to display & determine if puzzle solved, 
      //!!if not solved wait for next letter, if no match then decrement the number of guesses by 1!!
    //!!if solved add 1 to wins and display html and start new puzzle!!
    //!!if out of guesses, start new puzzle!!
    

    }

    console.log('New letter collection outside is : ' + letterGuessed);
//}




    