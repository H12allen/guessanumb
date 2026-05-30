let maxNumber = 20;
let secretNumber = generateSecret();
let score = 20;

let highscore = Number(localStorage.getItem('highscore')) || 0;

let games = Number(localStorage.getItem('games')) || 0;

let streak = Number(localStorage.getItem('streak')) || 0;

const numberEl = document.querySelector('.number');
const messageEl = document.querySelector('.message');
const scoreEl = document.querySelector('.score');
const highscoreEl = document.querySelector('.highscore');
const gamesEl = document.querySelector('.games');
const streakEl = document.querySelector('.streak');
const guessEl = document.querySelector('.guess');

highscoreEl.textContent = highscore;
gamesEl.textContent = games;
streakEl.textContent = streak;

function generateSecret() {
  return Math.trunc(Math.random() * maxNumber) + 1;
}

function setMessage(msg) {
  messageEl.textContent = msg;
}

function updateStorage() {
  localStorage.setItem('highscore', highscore);

  localStorage.setItem('games', games);

  localStorage.setItem('streak', streak);
}

function resetGame() {
  score = 20;

  maxNumber = Number(document.getElementById('difficulty').value);

  secretNumber = generateSecret();

  scoreEl.textContent = score;

  numberEl.textContent = '?';

  setMessage('Start guessing...');

  guessEl.value = '';

  document.body.classList.remove('win');
}

function losePoint() {
  if (score > 1) {
    score--;

    scoreEl.textContent = score;
  } else {
    setMessage('💀 Game Over');

    numberEl.textContent = secretNumber;

    streak = 0;

    streakEl.textContent = streak;

    updateStorage();
  }
}

function checkGuess() {
  const guess = Number(guessEl.value);

  if (!guess) {
    setMessage('⚠ Enter a number');

    guessEl.classList.add('shake');

    setTimeout(() => {
      guessEl.classList.remove('shake');
    }, 350);

    return;
  }

  if (guess === secretNumber) {
    numberEl.textContent = secretNumber;

    numberEl.classList.add('pop');

    setTimeout(() => {
      numberEl.classList.remove('pop');
    }, 400);

    setMessage('🎉 Correct!');

    document.body.classList.add('win');

    games++;
    streak++;

    gamesEl.textContent = games;
    streakEl.textContent = streak;

    if (score > highscore) {
      highscore = score;

      highscoreEl.textContent = highscore;
    }

    updateStorage();
  } else {
    setMessage(
      guess > secretNumber
        ? '🔺 Too high! Try lower.'
        : '🔻 Too low! Try higher.',
    );

    losePoint();
  }
}

document.querySelector('.check').addEventListener('click', checkGuess);

document.querySelector('.again').addEventListener('click', resetGame);

guessEl.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    checkGuess();
  }
});

document.getElementById('difficulty').addEventListener('change', resetGame);
