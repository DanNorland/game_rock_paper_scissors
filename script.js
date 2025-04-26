// UI

const scoreInfo = document.getElementById('scoreInfo');
const scoreMessage = document.getElementById('scoreMessage');
const playerScorePara = document.getElementById('playerScore');
const computerScorePara = document.getElementById('computerScore');
const playerSign = document.getElementById('playerSign');
const computerSign = document.getElementById('computerSign');
const selectionButtons = document.querySelectorAll('[data-selection]');
const endgameModal = document.getElementById('endgameModal');
const endgameMsg = document.getElementById('endgameMsg');
const overlay = document.getElementById('overlay');
const restartBtn = document.getElementById('restartBtn');

selectionButtons.forEach((selectionButton) => {
  selectionButton.addEventListener('click', (e) => {
    const selectionName = selectionButton.dataset.selection;
    const selection = SELECTIONS.find(
      (selection) => selection.name === selectionName
    );
    handleClick(selection);
  });
});
restartBtn.addEventListener('click', restartGame);
overlay.addEventListener('click', closeEndgameModal);

// GAME

let playerScore = 0;
let computerScore = 0;
let roundWinner = '';
const WINNINGSCORE = 5;
const SELECTIONS = [
  {
    name: 'ROCK',
    emoji: '🪨',
    beats: 'SCISSORS',
  },
  {
    name: 'PAPER',
    emoji: '📄',
    beats: 'ROCK',
  },
  {
    name: 'SCISSORS',
    emoji: '✂️',
    beats: 'PAPER',
  },
];

function playRound(playerSelection, computerSelection) {
  computerSign.classList.remove('loser');
  playerSign.classList.remove('loser');
  if (playerSelection.name === computerSelection.name) {
    roundWinner = 'tie';
  }
  if (playerSelection.beats === computerSelection.name) {
    playerScore++;
    roundWinner = 'player';
  }
  if (computerSelection.beats === playerSelection.name) {
    computerScore++;
    roundWinner = 'computer';
  }
  updateScoreMessage(roundWinner, playerSelection.name, computerSelection.name);
}

function getRandomChoice() {
  let randomNumber = Math.floor(Math.random() * SELECTIONS.length);
  return SELECTIONS[randomNumber];
}

function isGameOver() {
  return playerScore === WINNINGSCORE || computerScore === WINNINGSCORE;
}

function handleClick(playerSelection) {
  if (isGameOver()) {
    openEndgameModal();
    return;
  }

  const computerSelection = getRandomChoice();
  playRound(playerSelection, computerSelection);
  updateChoices(playerSelection, computerSelection);
  updateScore();

  if (isGameOver()) {
    openEndgameModal();
    setFinalMessage();
  }
}

function updateChoices(playerSelection, computerSelection) {
  playerSign.textContent = playerSelection.emoji;
  computerSign.textContent = computerSelection.emoji;
}

function updateScore() {
  if (roundWinner === 'tie') {
    scoreInfo.textContent = "It's a tie! 🧐";
  } else if (roundWinner === 'player') {
    scoreInfo.textContent = 'You won! 🏆';
  } else if (roundWinner === 'computer') {
    scoreInfo.textContent = 'You lost! 💥';
  }

  playerScorePara.textContent = `Player: ${playerScore}`;
  computerScorePara.textContent = `Computer: ${computerScore}`;
}

function updateScoreMessage(winner, playerSelection, computerSelection) {
  if (winner === 'player') {
    scoreMessage.textContent = `${capitalizeFirstLetter(
      playerSelection
    )} beats ${computerSelection.toLowerCase()}...`;
    computerSign.classList.add('loser');
    return;
  }
  if (winner === 'computer') {
    scoreMessage.textContent = `${capitalizeFirstLetter(
      playerSelection
    )} is beaten by ${computerSelection.toLowerCase()}...`;
    computerSign.classList.add('winner');
    playerSign.classList.add('loser');
    return;
  }

  scoreMessage.textContent = `${capitalizeFirstLetter(
    playerSelection
  )} ties with ${computerSelection.toLowerCase()}...`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function openEndgameModal() {
  endgameModal.classList.add('active');
  overlay.classList.add('active');
}

function closeEndgameModal() {
  endgameModal.classList.remove('active');
  overlay.classList.remove('active');
}

function setFinalMessage() {
  return playerScore > computerScore
    ? (endgameMsg.textContent = 'You won! 🏆')
    : (endgameMsg.textContent = 'You lost! 💥');
}

function restartGame() {
  playerScore = 0;
  computerScore = 0;
  computerSign.classList.remove('loser');
  playerSign.classList.remove('loser');
  scoreInfo.textContent = 'Choose your weapon';
  scoreMessage.textContent = 'First to score 5 points wins the game';
  playerScorePara.textContent = 'Player: 0';
  computerScorePara.textContent = 'Computer: 0';
  playerSign.textContent = '❔';
  computerSign.textContent = '❔';
  endgameModal.classList.remove('active');
  overlay.classList.remove('active');
}
