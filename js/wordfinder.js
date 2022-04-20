let answer; // this is a global variable, the result of the pickWord() function. This is bad practice.
let usedWords = [];
let allData = {};
const submitButton = document.querySelector('.submit-btn');
const results = document.querySelector('#results');
const correct = document.createTextNode(`Correct!`);
const incorrect = document.createTextNode(`Incorrect!`);

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
    console.log(allData);
    return allData;
}

fetch('json/words.json')
    .then(extractWords)
    .then(processWords);

const playButton = document.querySelector('#start');

const handlePlayButtonClick = (event) => {
    event.preventDefault();
    playAgain.style.display ='none';
    answer = pickWord(allData);
    console.log(answer);
    return answer;
}

playButton.addEventListener('click', handlePlayButtonClick);

const playAgain = document.querySelector('#again');
playAgain.style.display ='none';

playAgain.addEventListener('click', handlePlayButtonClick);

function pickWord(allData) {
    let allKeys = (Object.keys(allData));
    let randomWord = allKeys[Math.floor(Math.random() * allKeys.length)];
    if (usedWords.length === allData.length) {
        console.log('You won! :)');
    }
    if (usedWords.includes(randomWord)) {
        console.log('duplicate word detected'); // this is untested
        pickWord(allData);
    }

    console.log(randomWord);
    let synonyms = allData[randomWord];
    let container = document.querySelector('#container');
    console.log(synonyms);
    console.log(typeof(synonyms));
    container.innerHTML = '';
    results.innerHTML = '';
    synonyms.forEach(item => {
        const listItem = document.createElement('li');
        const textNode = document.createTextNode(`${item}`);
        listItem.appendChild(textNode);
        container.appendChild(listItem);
        console.log(item);
    });
    return randomWord;
}

const submitFunction = (event) => {
    event.preventDefault();
    let userGuess = document.querySelector('#guess').value;
    console.log(userGuess);

    // Guess logic
    if (answer === userGuess) {
        console.log('Nice');
        results.innerHTML = '';
        results.appendChild(correct);
        usedWords.push(answer);
        console.log(usedWords);
        playAgain.style.display ='block';
        results.style.visibility ='visible';
        document.querySelector('#guess').value = '';
        document.querySelector('#guess').placeholder = userGuess;
    } else {
        console.log('You suck');
        results.innerHTML = '';
        results.appendChild(incorrect);
        document.querySelector('#guess').value = '';
        document.querySelector('#guess').placeholder = userGuess;
        results.style.visibility ='visible';
    }
}

submitButton.addEventListener('click', submitFunction);

