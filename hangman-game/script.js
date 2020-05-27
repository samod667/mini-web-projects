const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');


const figureParts = document.querySelectorAll('.figure-part')


const getRandomWord = require("random-words");
//let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;

const correctLetters = [];
const wrongLetters = [];
let word;

//GENERATE A NEW WORD ON GAME END
function generateNewWord() {
    
    // selectedWord = arr[Math.floor(Math.random() * words.length)]
    word = getRandomWord()
    console.log(word)

    displayWord(word)
}


//SHOW HIDDEN WORD
function displayWord(word) {
    
    wordEl.innerHTML = `
        ${word.split('')
        .map(letter => `
            <span class ="letter">${correctLetters.includes(letter) ? letter : ''}
            </span>
        `
        )
        .join('')
    }
    `;

    const innerWord = wordEl.innerText.replace(/\n/g, '')

    if (innerWord === word) {
        finalMessage.innerText = 'Congratulations! You Won! :)'
        popup.style.display = 'flex';

        playable = false;
    }
}

//UPDATE THE WRONG LETTERS
function updateWrongLettersEl() {
    //DISPLAY WRONG LETTERS
    wrongLettersEl.innerHTML = `
      ${wrongLetters.length > 0 ? '<p>Wrong:</p>' : ''}  
      ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    //ADD FIGURE PARTS
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    })

    //CHECK IF LOST
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = `You Lost :( The answer was: ${word} `
        popup.style.display = 'flex';

        playable = false;
    }

}

//SHOW NOTIFICATION
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show')
    }, 2000)
}


//KEYDOWN LETTER PRESS

window.addEventListener('keydown', e => {
    // console.log(e.keyCode)
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (word.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                 displayWord(word)
            } else {
                showNotification()
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLettersEl()
            } else {
                showNotification()
            }
        }
    }
})

//RESTART GAME AND PLAY AGAIN
playAgainBtn.addEventListener('click', e => {
    //EMPTY ARRAYS
    correctLetters.splice(0);
    wrongLetters.splice(0);
    //GENERATE NEW WORD

    generateNewWord()


    updateWrongLettersEl()

    popup.style.display = 'none';
})

generateNewWord()