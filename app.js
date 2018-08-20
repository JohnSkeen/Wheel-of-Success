const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;

const overlay = document.getElementById('overlay');
const startGame = document.querySelector('a.btn__reset');
let letterFound = '';

startGame.addEventListener('click', () => {
    resetTheGame();
    overlay.classList.add('hidden');
    overlay.classList.remove('start');
    overlay.classList.remove('lose');
    overlay.classList.remove('win');
  });

function resetTheGame() {
  startGame.addEventListener('click', () => {
    overlay.classList.add('start');
    window.location.reload();
  });
}

let phrases = [
  'Close Encounters of the Third Kind',
  'Elvis Has Left The Building',
  'Lions and Tigers and Bears oh my',
  'Along came a spider and sat down beside her',
  'A Song of Ice and Fire',
];

function getRandomPhraseAsArray(arr) {
  // do stuff to any arr that is passed in
  var item = arr[Math.floor(Math.random() * arr.length)];
  var string = item.split('');
  return string;
}

const phraseArray = getRandomPhraseAsArray(phrases);
console.log(phraseArray);

var unorderedList = document.getElementById('phrase');
var indexNum = 0;

function addPhraseToDisplay(arr) {
  var frag = document.createDocumentFragment();
  for (let i = arr.length; i--;) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(arr[indexNum++]));
    frag.appendChild(li);
    if (li.textContent !== ' ') {
      li.classList.add('letter');
    } else {
      li.classList.add('space');
    }
  }

  unorderedList.appendChild(frag);
}

addPhraseToDisplay(phraseArray);

function checkLetter(target) {
  let letterFound = null;
  let letter = document.getElementsByClassName('letter');
  let btn = target.textContent;
  for (i = 0; i < letter.length; i++) {
    if (letter[i].textContent.toLowerCase() == btn) {
      letter[i].classList.add('show');
      letterFound = letter[i].textContent;
    }
  }

  if (letterFound === null) {
    let health = document.getElementsByTagName('img');
    missed++;
    if (health[missed]) {
      health[5 - missed].src = 'images/lostHeart.png';
    }
  }

  checkWin();
}

qwerty.onclick = function (e) {
  if (e.target.tagName === 'BUTTON') {
    let button = e.target;
    button.classList.add('chosen');
    button.disabled = true;
    checkLetter(button);
  }
};

function missedLetter() {
  if (letterFound === null) {
    missed++;
  }
}

function checkWin() {
  let show = document.getElementsByClassName('show');
  let letter = document.getElementsByClassName('letter');
  let title = document.querySelector('.title');
  let buttonText = document.querySelector('.btn__reset');
  if (show.length === letter.length) {
    overlay.classList.add('win');
    overlay.classList.remove('hidden');
    overlay.classList.remove('start');
    overlay.classList.remove('lose');
    title.textContent = 'You Win!';
    buttonText.textContent = 'Try again?';
  } else if (missed === 5) {
    overlay.classList.add('lose');
    overlay.classList.remove('hidden');
    overlay.classList.remove('start');
    overlay.classList.remove('win');
    title.textContent = 'Uh Oh, You Lost!';
    buttonText.textContent = 'Try again?';
  }
}
