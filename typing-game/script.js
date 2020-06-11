const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('endgame-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');
const starGameBtn = document.getElementById('start-btn');
const startGameEl = document.getElementById('startgame-container')


//Init game - start button pressed
starGameBtn.addEventListener('click', e => {
    startGameEl.style.display = 'none';

const generateRandomWord = require("random-words");
let randomWord;

//Init score;
let score = 0;

//Init time
let time = 10;

//Set difficulty to local storage or medium
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

//Set difficulty select value
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

//Focus on text on start
text.focus();

//Start counting down
const timeInterval = setInterval(updateTime, 1000);

//Update score function

function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

//Update Time

function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);

    //end game
    gameOver();
  }
}

//Get a random word
function getRandomWord() {
  randomWord = generateRandomWord();
  console.log(randomWord);
}

//Add word to DOM

function addWordToDOM() {
  getRandomWord();

  word.innerHTML = randomWord;
}

//Game over show end screen
function gameOver() {
  endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button id="reset">Play again</button>
    `;

  endgameEl.style.display = "flex";
  const resetBtn = document.getElementById("reset");
  resetBtn.addEventListener('click', e => {
      resetGame()
  })
}

//Reset game function
function resetGame() {
    //Remove end game container
    endgameEl.innerHTML = '';
    endgameEl.style.display = 'none'
   //Show start container
   startGameEl.style.display = 'flex';

   //reset time and score
   scoreEl.innerHTML = '0'
    time = 11
   updateTime()

}

addWordToDOM();

//Event listener

//typing listener
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  // console.log(insertedText)
  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();
    //Clear
    e.target.value = "";

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }
    updateTime();
  }
});

//settings btn clicked

settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

//settings select
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});

});




