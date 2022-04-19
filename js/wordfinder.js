// Fetch data from json file and return the words object without the description.

const extractWords = (response) => {
    const wordList = response.json();
    return wordList;
}

const processWords = (wordList) => {
    const allData = wordList.data;
    pickWord(allData);
}

console.log(fetch('json/words.json')
    .then(extractWords)
    .then(processWords));

function pickWord(allData) {
    let allWords = (Object.keys(allData));
    console.log(typeof (allWords));
    console.log(allWords);
    let targetWord = allWords[Math.floor(Math.random() * allWords.length)];
    console.log(targetWord);
    let targetSyns = allData[targetWord];
    console.log(targetSyns);
    targetSyns.forEach(item => {
        console.log(item)
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
};