let answer; // this is a global variable, the result of the pickWord() function. This is bad practice.
let usedWords = [];
let allData = {};
const submitButton = document.querySelector('.submit-btn');
const results = document.querySelector('#results');
const correct = document.createTextNode(`Correct!`);
const incorrect = document.createTextNode(`Incorrect!`);

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
const startButton = document.querySelector('#start');

const handleButtonClick = (event) => {
    event.preventDefault();
    answer = pickWord(allData);
    console.log(answer);
    return answer;
}

startButton.addEventListener('click', handleButtonClick);

const playAgain = document.querySelector('#again');
playAgain.style.display ='none';

playAgain.addEventListener('click', handleButtonClick);

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
    const userGuess = document.querySelector('#guess').value;
    console.log(userGuess);

    // Guess logic
    if (answer === userGuess) {
        console.log('Nice');
        results.appendChild(correct);
        usedWords.push(answer);
        console.log(usedWords);
        playAgain.style.display ='block';
    } else {
        console.log('You suck');
        results.innerHTML = '';
        results.appendChild(incorrect);
    }
}

submitButton.addEventListener('click', submitFunction);

