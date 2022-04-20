// Fetch data from json file and return the words object without the description.

const extractWords = (response) => {
    const wordList = response.json();
    return wordList;
}

const processWords = (wordList) => {
    const allData = wordList.data;
    answer = pickWord(allData);
}

fetch('json/words.json')
    .then(extractWords)
    .then(processWords);

let answer; // this is a global variable, the result of the pickWord() function. This is bad practice.

function pickWord(allData) {

    let allWords = (Object.keys(allData));
    let targetWord = allWords[Math.floor(Math.random() * allWords.length)];
    console.log(targetWord);
    let targetSyns = allData[targetWord];
    targetSyns.forEach(item => {
    })
    let html = '';
    targetSyns.forEach(item => {
        let htmlSegment = `<div class="datum">
                          <h2>${item}</h2>
                         </div>`;
        html += htmlSegment;
    });
    let container = document.querySelector('.container');
    container.innerHTML = html;
    return targetWord;
}

const submitButton = document.querySelector('.submit-btn');

const submitFunction = (event) => {
    event.preventDefault();
    const userGuess = document.querySelector('#guess').value;
    console.log(userGuess);

    // Guess logic

    if (answer === userGuess) {
        console.log('Nice');
    } else {
        console.log('You suck');
    }
}

submitButton.addEventListener('click', submitFunction);





