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
// array for guessed letters
const guessedLetters = [];

//function to update words in progress with circles
const swapCircles = function (word) {
    const mysteryLetters = [];
    for (const letter of word) {
        //console.log(letter);
        mysteryLetters.push("●");
    }
    letter.innerText = mysteryLetters.join("");
};

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const input = letter.value;
    console.log(input);
    letter.value = "";
    message.innerText = "";
    const validatedInput = validateInput(input);
    //console.log(validatedInput);
    if (validatedInput) {
    // It's valid.
    makeGuess(validatedInput);
    };
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a letter";
    } else if (input.length > 1) {
       message.innerText = "Did you enter more than one letter? Just enter one."
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter only"
    } else {
        return input;
    }
};

const makeGuess = function (validatedInput) {
    validatedInput = validatedInput.toUpperCase();
    if (guessedLetters.includes(validatedInput)) {
        message.innerText = "You already guessed that, sorry"
    } else {
        guessedLetters.push(validatedInput);
        console.log(guessedLetters);
    }
};