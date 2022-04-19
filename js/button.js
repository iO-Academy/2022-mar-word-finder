const startButton = document.querySelector('#start');

const handleButtonClick = (event) => {

  const instructions = document.querySelector('.instructions');
  const game = document.querySelector('.game');

  if(instructions.style.display === 'none') {
    instructions.style.display = 'block';
    game.style.display = 'none';
    startButton.innerText = 'hide';
  }
  else{
    instructions.style.display = 'none';
    game.style.display = 'block';
  }
}

startButton.addEventListener('click', handleButtonClick);