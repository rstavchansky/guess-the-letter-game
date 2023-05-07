const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".guesses-left");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
let remainingGuesses = 8;

const getWord = async function () {
  const request = await fetch(`https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt`);
  const words = await request.text();
  const wordArray = words.split("\n");
  //console.log(wordArray);
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  placeholder(word);
}

let word = "magnolia";
let guessedLetters = [];

// Display our symbols as placeholders for the chosen word's letters
const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

getWord();

guessLetterButton.addEventListener("click", function (e) {
  e.preventDefault();
  // Empty message paragraph
  message.innerText = "";
  // Let's grab what was entered in the input
  const guess = letterInput.value;
  // Let's make sure that it is a single letter
  const goodGuess = validateInput(guess);

  if (goodGuess) {
    // We've got a letter! Let's guess!
    makeGuess(guess);
  }
  letterInput.value = "";
});

const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    // Is the input empty?
    message.innerText = "Please enter a letter.";
  } else if (input.length > 1) {
    // Did you type more than one letter?
    message.innerText = "Please enter a single letter.";
  } else if (!input.match(acceptedLetter)) {
    // Did you type a number, a special character or some other non letter thing?
    message.innerText = "Please enter a letter from A to Z.";
  } else {
    // We finally got a single letter, omg yay
    return input;
  }
};

const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText = "You already guessed that letter, silly. Try again.";
  } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
    showGuessedLetters();
    countRemainingGuesses(guess);
    updateWordInProgress(guessedLetters);
  }
};

const showGuessedLetters = function () {
  // Clear the list first
  guessedLettersElement.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
  }
};

const updateWordInProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("●");
    }
  }
  // console.log(revealWord);
  wordInProgress.innerText = revealWord.join("");
  checkIfWin();
};

const countRemainingGuesses = function (guess) {
  word = word.toUpperCase();
  if (!word.includes(guess)) {
    message.innerText = "Sorry, the word doesn't include this letter.";
    remainingGuesses -= 1;
  } else {
    message.innerText = `Nice job; The letter ${guess} is in the game.`
  }
  if (remainingGuesses === 0) {
    message.innerText = `Too bad. Game over. The word was ${word}`;
    startOver();
  } else if (remainingGuesses === 1) {
    remainingGuessesSpan.innerText = `1 guess`;
  } else if (remainingGuesses > 1) {
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  }
};

const checkIfWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    startOver();
  }
};

const startOver = function () {
  guessLetterButton.classList.add("hide");
  remainingGuessesElement.classList.add("hide");
  guessedLettersElement.classList.add("hide");
  playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
  message.classList.remove("win");
  message.innerText = "";
  guessedLettersElement.innerText = "";
  remainingGuesses = 8;
  guessedLetters = [];
  remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  guessLetterButton.classList.remove("hide");
  remainingGuessesElement.classList.remove("hide");
  guessedLettersElement.classList.remove("hide");
  playAgainButton.classList.add("hide");
  getWord();
});