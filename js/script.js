// selects the ul element where the guessed letters will go
const guesses = document.querySelector(".guessed-letters");
// selects the Guess button
const guessButton = document.querySelector(".guess");
// selects text input for the letter
const letter = document.querySelector(".letter");
// selects empty paragraph for word in progress
const progress = document.querySelector(".word-in-progress");
// selects paragraph for remaining guesses
const remaining = document.querySelector(".remaining")
// selects span inside remaining
const guessesLeft = document.querySelector(".guesses-left");
// selects message 
const message = document.querySelector(".message");
// button to play again
const replayButton = document.querySelector(".play-again");
// test word
const word = "magnolia";

//function to update words in progress with circles
const swapCircles = function (word) {
    const mysteryLetters = [];
    for (const letter of word) {
        console.log(letter);
        mysteryLetters.push("●");
    }
    letter.innerText = mysteryLetters.join("");
};

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const input = letter.value;
    console.log(input);
    letter.value = "";
});