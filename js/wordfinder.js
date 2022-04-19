// Fetch data from json file and return the words object without the description.

const extractWords = (response) => {
    const wordList = response.json();
    return wordList;
}

const processWords = (wordList) => {
    return wordList.data;
}

fetch('json/words.json')
    .then(extractWords)
    .then(processWords);

