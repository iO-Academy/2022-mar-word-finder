let answer;
let usedWords = [];
let allData = {};
let totalScore = 0;
let timerId;
let timeLeft;
const submitButton = document.querySelector('.submit-btn');
const results = document.querySelector('#results');

const startButton = document.querySelector('#start');

const handleButtonClick = (event) => {
    const instructions = document.querySelector('.instructions');
    const game = document.querySelector('.game');

    if (instructions.style.display === 'none') {
        instructions.style.display = 'block';
        game.style.display = 'none';
        startButton.innerText = 'hide';
    } else {
        instructions.style.display = 'none';
        game.style.display = 'block';
    }
}

startButton.addEventListener('click', handleButtonClick);

// Fetch data from json file and return the words object without the description.
const extractWords = (response) => {
    const wordList = response.json();
    return wordList;
}

const processWords = (wordList) => {
    allData = wordList.data;
    return allData;
}

fetch('json/words.json')
    .then(extractWords)
    .then(processWords);

const playButton = document.querySelector('#start');
const guess = document.querySelector('#guess');

function playNextRound () {
    timeLeft = 30;
    clearInterval(timerId);
    timerId = setInterval(countdown, 1000);
    document.querySelector('#clock').style.visibility = 'visible';
    submitButton.style.visibility = 'visible';
    results.style.visibility = 'hidden';
    guess.style.visibility = 'visible'
    playAgain.style.display ='none';
    guess.placeholder = 'Your Guess is...';
    if (usedWords.length === allData.length) {
        return '';
    }
    remainingGuesses = 5;
    answer = pickWord(allData);
    showSynonyms(answer);
    updateScoreDisplay();
    updateRemainingGuesses(remainingGuesses);
    countdown();
    return answer;
}

const handlePlayButtonClick = (event) => {
    event.preventDefault();
    playNextRound();
}

playButton.addEventListener('click', handlePlayButtonClick);

const playAgain = document.querySelector('#again');
playAgain.style.display = 'none';

playAgain.addEventListener('click', handlePlayButtonClick);

function showSynonyms (randomWord) {
    let synonyms = allData[randomWord];
    let container = document.querySelector('#container');
    container.innerHTML = '';
    synonyms.forEach(item => {
        const listItem = document.createElement('li');
        const textNode = document.createTextNode(`${item}`);
        listItem.appendChild(textNode);
        container.appendChild(listItem);
    });
}

function pickWord(allData) {
    let allKeys = (Object.keys(allData));
    let randomWord = allKeys[Math.floor(Math.random() * allKeys.length)];
    while (usedWords.includes(randomWord)) {
        randomWord = allKeys[Math.floor(Math.random() * allKeys.length)];
    }
    return randomWord;
}

function noRemainingGuesses() {
    if (remainingGuesses === 0) {
        submitButton.style.visibility = 'hidden';
        playAgain.style.display = 'block';
        document.querySelector('#guess').style.visibility = 'hidden';
        document.querySelector('#clock').style.visibility = 'hidden';
    }
}

function updateScoreDisplay() {
    const userScore = document.querySelector('.score');
    userScore.innerText = totalScore;
}

function updateRemainingGuesses(remainingGuesses) {
    const userScore = document.querySelector('.guesses-remaining');
    userScore.innerText = remainingGuesses;
}

function  pointCalculation(userGuess) {
    let roundScore = 0;
    if (answer === userGuess) {
        usedWords.push(answer);
        roundScore = remainingGuesses;
        totalScore += roundScore;
        updateScoreDisplay(roundScore);
    } else {
        remainingGuesses--;
        noRemainingGuesses();
        updateRemainingGuesses(remainingGuesses);
    }
}

const submitFunction = (event) => {
    const correct = document.createTextNode(`Correct! You scored: ${remainingGuesses} points`);
    const incorrect = document.createTextNode('Incorrect!');
    event.preventDefault();
    let userGuess = document.querySelector('#guess').value;

    results.innerHTML = '';
    results.style.visibility = 'visible';
    document.querySelector('#guess').value = '';
    document.querySelector('#guess').placeholder = userGuess;

    // Guess logic
    if (answer === userGuess) {
        results.appendChild(correct);
        submitButton.style.visibility = 'hidden';
        setTimeout(playNextRound, 1500);
    } else {
        results.appendChild(incorrect);
        submitButton.style.visibility = 'visible';
    }
    pointCalculation(userGuess);
}

submitButton.addEventListener('click', submitFunction);

const timeDiv = document.querySelector('#clock');


function countdown() {
    if (timeLeft === -1) {
        timeDiv.innerText = "Unlucky - Time's Up!";
        playAgain.style.display = 'block';
    } else if (remainingGuesses !== 0) {
        timeDiv.innerText = `Time Remaining ${timeLeft}s`
        timeLeft--;
    }
}
