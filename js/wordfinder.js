let answer;
let usedWords = [];
let allData = {};
let remainingGuesses = 5;
let totalScore = 0;
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
    }
    else {
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

function playNextRound () {
    submitButton.style.visibility = 'visible';
    playAgain.style.display ='none';
    document.querySelector('#guess').placeholder = 'Your Guess is...'
    if (usedWords.length === allData.length) {
        return '';
    }
    remainingGuesses = 5;
    answer = pickWord(allData);
    showSynonyms(answer);
    updateScoreDisplay();
    updateRemainingGuesses(remainingGuesses);
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
    results.innerHTML = '';
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
    if(remainingGuesses === 0){
        submitButton.style.visibility = 'hidden'
        playAgain.style.display = 'block';
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

const submitFunction = (event) => {
    let roundScore;
    const correct = document.createTextNode(`Correct! You scored: ${remainingGuesses} points`);
    event.preventDefault();
    let userGuess = document.querySelector('#guess').value;

    // Guess logic
    if (answer === userGuess) {
        results.innerHTML = '';
        results.appendChild(correct);
        usedWords.push(answer);
        results.style.visibility = 'visible';
        document.querySelector('#guess').value = '';
        document.querySelector('#guess').placeholder = userGuess;
        roundScore = remainingGuesses
        totalScore += roundScore
        console.log(`total score ${totalScore}`)
        submitButton.style.visibility = 'hidden'
        updateScoreDisplay();
        setTimeout(playNextRound, 1500);
    } else {
        results.innerHTML = '';
        document.querySelector('#guess').value = '';
        document.querySelector('#guess').placeholder = userGuess;
        results.style.visibility = 'visible';
        remainingGuesses --;
        roundScore = remainingGuesses
        console.log(roundScore);
        const incorrect = document.createTextNode(`Incorrect! Guesses remaining ${roundScore}`);
        submitButton.style.visibility = 'visible'
        noRemainingGuesses();
        results.appendChild(incorrect);
        console.log(remainingGuesses);
        updateRemainingGuesses(remainingGuesses);
    }
}

submitButton.addEventListener('click', submitFunction);