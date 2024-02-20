'use strict';

// console.log((document.querySelector('.message').innerHTML = ' 🎉 Hello'));

// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 0;

// document.querySelector('.guess').value = 23;

// console.log(document.querySelector('.guess').value);

// document.querySelector('.check').addEventListener('click', function () {
//   document.querySelector('.guess').value = 23;

//   console.log(document.querySelector('.guess').value);
// });
let random = Math.floor(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  // When element is not a number
  if (!guess) {
    document.querySelector('.message').textContent = '⛔ Not a number!';

    score = score - 1;
    document.querySelector('.score').textContent = score;

    //when guess is correct
  } else if (guess === random) {
    document.querySelector('.message').textContent = '🎉 Correct Number';
    document.querySelector('body').style.backgroundColor = 'green';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = random;

    if (score > highscore) {
      highscore = document.querySelector('.highscore').textContent = score;
    }
    //When guess is too high
  } else if (guess > random) {
    left();
    //When guess is too low
  } else if (guess < random) {
    left();
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  random = Math.floor(Math.random() * 20) + 1;

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';

  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('.score').textContent = score;
  document.querySelector('.message').textContent = 'Start guessing...';
});

function left() {
  const guess = Number(document.querySelector('.guess').value);
  if (score > 1) {
    document.querySelector('.message').textContent =
      guess > random ? ' 📈 Too high!' : ' 📈 Too low!';
    score = score - 1;
    document.querySelector('.score').textContent = score;
  } else {
    document.querySelector('.message').textContent = '💥 You lost the game!';
    document.querySelector('.score').textContent = 0;
  }
}
