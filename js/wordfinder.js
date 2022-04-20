let answer;
let usedWords = [];
let allData = {};
const submitButton = document.querySelector('.submit-btn');
const results = document.querySelector('#results');
const correct = document.createTextNode('Correct!');
const incorrect = document.createTextNode('Incorrect!');

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

const handlePlayButtonClick = (event) => {
    event.preventDefault();
    playAgain.style.display ='none';
    document.querySelector('#guess').placeholder = 'Your Guess is...'
    if (usedWords.length === allData.length) {
        return '';
    }
    answer = pickWord(allData);
    showSynonyms(answer);
    return answer;
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

const submitFunction = (event) => {
    event.preventDefault();
    let userGuess = document.querySelector('#guess').value;

    // Guess logic
    if (answer === userGuess) {
        results.innerHTML = '';
        results.appendChild(correct);
        usedWords.push(answer);
        playAgain.style.display = 'block';
        results.style.visibility = 'visible';
        document.querySelector('#guess').value = '';
        document.querySelector('#guess').placeholder = userGuess;
    } else {
        results.innerHTML = '';
        results.appendChild(incorrect);
        document.querySelector('#guess').value = '';
        document.querySelector('#guess').placeholder = userGuess;
        results.style.visibility = 'visible';
    }
}

submitButton.addEventListener('click', submitFunction);

