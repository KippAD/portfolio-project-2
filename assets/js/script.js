/*jshint esversion: 6 */

// Assigning buttons on the home page
const buttons = document.getElementsByTagName('button');
const playBtn = buttons[0];
const rulesBtn = buttons[1];
const scoresBtn = buttons[2];

const gameArea = document.getElementById('game-area');
const homeIcon = document.getElementById('home-button');
homeIcon.addEventListener('click', refreshPage);

// Event listeners for buttons on main menu
playBtn.addEventListener('click', enterUsername);
rulesBtn.addEventListener('click', loadRules);
scoresBtn.addEventListener('click', loadScores);

// High scores 
let easyHighScore = localStorage.getItem('easyHighScore');
let normalHighScore = localStorage.getItem('normalHighScore');
let hardHighScore = localStorage.getItem('hardHighScore');
convertHighScore();

// General variables
let username = localStorage.getItem('username');
let difficultySelection;
let question;
let correctAnswer;
let scoreCounter;
let questionCounter;
let highScoreCounter;
let randomIndex = [];
let loadPage;
let questionDifficulty;
let answerButtons;
let answerButton;
let displayDifficulty;
let i;

/** Takes user to input where username is stored in local storage */
function enterUsername() {
  clickAudio();
  closeModal();
  if (!username) {
    gameArea.innerHTML = `
      <form action="javascript:void(0);" id="username-form" method="post">  
          <label for="username">Please enter a Username:</label><br>
          <input id="username" type="text" pattern="[a-zA-Z0-9]+" placeholder="Enter your username here..." required>
          <button type="submit" id="submit" class="btn">Submit <i class="fas fa-arrow-right"></i></button>
          <a id="back-btn" href="index.html"><i class="fas fa-arrow-alt-circle-left"></i></a>
      </form>
    `;
    document.getElementById('submit').addEventListener('click', storeUsername);
  } else {
    selectDifficulty();
  } 
}

/** Shows html area where user selects a difficulty */
function selectDifficulty() {
  clickAudio();
  gameArea.innerHTML = `
    <div class="username-container">
      <h2>Welcome ${username}! Please select a game difficulty:</h2>
      <span id="clear-username">Not You?<i class="fas fa-times"></i></span>
    </div>

    <div class="diff-container">
      <input type="radio" id="easyDifficulty" name="difficulty" value="easy" checked>
      <label class="btn" for="easyDifficulty">Easy</label>
        
      <input type="radio" id="normalDifficulty" name="difficulty" value="normal">  
      <label id="normalLabel" class="btn" for="normalDifficulty">Normal <span class="lockIcon"><i class="fas fa-lock"></i></span></label>
      
      <input type="radio" id="hardDifficulty" name="difficulty" value="hard">
      <label id="hardLabel" class="btn" for="hardDifficulty">Hard <span class="lockIcon"><i class="fas fa-lock"></i></span></label>

    </div>
    <button type="submit" id="play-btn" class="btn">Play <i class="fas fa-arrow-right"></i></button>
  `;
  // Checks if difficulty is unlocked
  difficultyUnlocked();

  // 'Not you?' text that clears local storage and reloads enter username page
  modalType = "wipeModal";
  loadPage = "username";
  document.getElementById('clear-username').addEventListener('click', showModal);
  // Submit button to load game area with selected difficulty
  document.getElementById('play-btn').addEventListener('click', logDifficultyInput);
}

// Sets the difficulty selection as the value of the radio input before game is loaded
function logDifficultyInput() {
  difficultySelection = document.querySelector('input[name="difficulty"]:checked').value;
  setQuestionDifficulty();
}

/** Selects which array to draw questions from depending on selected difficulty */
function setQuestionDifficulty() {
  closeModal();
  clickAudio();

  if (difficultySelection === "easy") {
    questionDifficulty = [...easyQuestions];
  } else if (difficultySelection === "normal") {
    questionDifficulty = [...normalQuestions];
  } else if (difficultySelection === "hard") {
    questionDifficulty = [...hardQuestions];
  }

  answerButtons = document.getElementsByClassName('answer-btn');
  displayCurrentQuiz();
  shuffle(questionDifficulty);
  runGame();
}

/** Loads the game area where questions and answers are displayed */
function runGame() {
  gameArea.innerHTML = `
    <h2>Good luck ${username}! - ${displayDifficulty} Quiz Question: <span id="questionCounter"></span> of 12</h2>
    <p class="bold">Which of the following cities is the capital of <span id="question-sub"></span>?</p>
    <div class="answer-container">  
      <button class="answer-btn btn">Answer1</button>
      <button class="answer-btn btn">Answer2</button>
      <button class="answer-btn btn">Answer3</button>
      <button class="answer-btn btn">Answer4</button>
    </div> 
    <p class="bold">Current Score: <span id="scoreCounter"></span></p>
    <p class="bold">High Score: <span id="highScoreCounter">0</span></p>
  `;
  // Replaces home icon event listener whilst on game page
  homeIcon.removeEventListener('click', refreshPage);
  modalType ="homeModal";
  homeIcon.addEventListener('click', showModal);
  // Sets counters for start of quiz
  i = 0;
  scoreCounter = 0;
  questionCounter = 1;
  setHighScoreCounter();
  populateQuestion();
  assignAnswerBtns();
}

/** Loads the rules page */
function loadRules() {
  clickAudio();
  gameArea.innerHTML = `
    <div class="rules-div">
      <p>Welcome to the Capitals of the World Quiz, here's how it all works:</p>
      <p>Simply click play, enter a username and choose a difficulty.</p>
      <p>To unlock harder quiz difficulties answer 9 or more correctly on the preceeding difficulty.</p>
      <button id="rules-play" class="menu-btn btn">Play</button>
      <a id="back-btn" href="index.html"><i class="fas fa-arrow-alt-circle-left"></i></a>
    </div>
  `;
  document.getElementById('rules-play').addEventListener('click', enterUsername);
}

/** Loads the rules page */
function loadScores() {
  clickAudio();
  if (!localStorage.getItem('username')) {
    modalType = "createUsername";
    showModal();
  } else {
  gameArea.innerHTML = `
    <div class="rules-div">
      <p>Hello ${localStorage.getItem('username')}! Here are your high scores!</p>
      <p>Easy Quiz: ${localStorage.getItem('easyHighScore')}</p>
      <p>Normal Quiz: ${localStorage.getItem('normalHighScore')}</p>
      <p>Hard Quiz: ${localStorage.getItem('hardHighScore')}</p>
      <button id="clearRecord" class="menu-btn btn">Clear Record</button>
      <a id="back-btn" href="index.html"><i class="fas fa-arrow-alt-circle-left"></i></a>
    </div>
  `;
  }
  modalType = "wipeModal";
  loadPage = "home";
  document.getElementById('clearRecord').addEventListener('click', showModal);
}

/** Sets all counters and ensures game area populated with question */
function nextQuestion() {
  if (i <= 11) {
    assignAnswerBtns();
    // Ensures that the high score counter matches the current score value
    if (scoreCounter > parseInt(highScoreCounter.innerHTML) ) {
      highScoreCounter.innerHTML = scoreCounter;
    }
    populateQuestion();
  } else {
    disableAnswerBtns();
    document.getElementById('scoreCounter').innerHTML = scoreCounter;
    checkHighScore();
    modalType = "endQuiz";
    showModal();
  }
}

/** Sets the html substitution values in game area */
function populateQuestion() {
  question = questionDifficulty[i].question;
  correctAnswer = questionDifficulty[i].answer;

  // Populates answer buttons with random answer from array
  generateIndex();
  generateAnswers();

  document.getElementById('scoreCounter').innerHTML = scoreCounter;
  document.getElementById('question-sub').innerHTML = question;
  document.getElementById('questionCounter').innerHTML = questionCounter;
}

/** Assigns answer button event listeners */
function assignAnswerBtns() {
  answerButtons.forEach(answerButton => {
    answerButton.addEventListener('click', checkAnswer);
   });
}

/** Disables answer buttons event listeners */
function disableAnswerBtns() {
  answerButtons.forEach(answerButton => {
    answerButton.removeEventListener('click', checkAnswer);
   });
}
    
/** Checks if answer is correct or incorrect and loads next question */
function checkAnswer(evt) {
  if (evt.target.innerHTML === correctAnswer) {
    correctAudio();
    scoreCounter += 1;
    showAnswer();
  } else {
    incorrectAudio();
    evt.target.classList.add("flash-red");
    showAnswer();
  }
  questionCounter += 1;
  i++;
}

/** Highlights correct answer green */
function showAnswer() {
  disableAnswerBtns();
  for (answerButton of answerButtons)
    if (answerButton.innerHTML === correctAnswer) {
      answerButton.classList.add("flash-green");
      resetColors();
  }
}

/** Ensures that the answer btn colors reset as each question is loaded */
function resetColors() {
  setTimeout(() => {  
    answerButtons.forEach(answerButton => {
      answerButton.classList.remove("flash-green");
      answerButton.classList.remove("flash-red");
    });
    nextQuestion(); 
  }, 2000);
}


/** Sets high score counter to local storage value */ 
function setHighScoreCounter() {
  highScoreCounter = document.getElementById('highScoreCounter');

  if (difficultySelection === 'easy') {
    highScoreCounter.innerHTML = localStorage.getItem('easyHighScore');
  } else if (difficultySelection === 'normal') {
    highScoreCounter.innerHTML = localStorage.getItem('normalHighScore');
  } else if (difficultySelection === 'hard') {
    highScoreCounter.innerHTML = localStorage.getItem('hardHighScore');
  }
}

/** Logs new high score if score counter exceeds it */ 
function checkHighScore() {
  if (difficultySelection === "easy" && scoreCounter > easyHighScore) {
    easyHighScore = scoreCounter;
    localStorage.setItem("easyHighScore", easyHighScore);
    highScoreCounter.innerHTML = localStorage.getItem("easyHighScore");

  } else if (difficultySelection === "normal" && scoreCounter > normalHighScore) {
    normalHighScore = scoreCounter;
    localStorage.setItem("normalHighScore", normalHighScore);
    highScoreCounter.innerHTML = localStorage.getItem("normalHighScore");

  } else if (difficultySelection === "hard" && scoreCounter > hardHighScore) {
    hardHighScore = scoreCounter;
    localStorage.setItem("hardHighScore", hardHighScore);
    highScoreCounter.innerHTML = localStorage.getItem("hardHighScore");
  }
  return highScoreCounter;
}

/** Ensures high score is always a number */ 
function convertHighScore() {
 if (!easyHighScore) {
    easyHighScore = 0;
    localStorage.setItem("easyHighScore", easyHighScore);
  }
  if (!normalHighScore) {
    normalHighScore = 0;
    localStorage.setItem("normalHighScore", normalHighScore);
  } 
  if (!hardHighScore) {
    hardHighScore = 0;
    localStorage.setItem("hardHighScore", hardHighScore);
  }
}

/*
* Disables normal and hard difficulty if high scores aren't above 9
* and displays padlock icon
*/
function difficultyUnlocked() {
  let normalInput = document.getElementById('normalDifficulty');
  let hardInput = document.getElementById('hardDifficulty');
  let padlockIcon = document.getElementsByClassName('lockIcon');

  if (localStorage.getItem('easyHighScore') < 9) {
    normalInput.type = "button";
    padlockIcon[0].style.display = "inline-block";
  }

  if (localStorage.getItem('normalHighScore') < 9) {
    hardInput.type = "button";
    padlockIcon[1].style.display = "inline-block";
  }
}

/** Checks form validity and stores username in local storage upon submission */
function storeUsername() {
  clickAudio();
  let form = document.getElementById('username-form');
  if (form.checkValidity()) {
    username = document.getElementById('username').value;
    localStorage.setItem('username', username);
    selectDifficulty();
  }
  return username;
}

function generateAnswers() {
  // Populates answer buttons with random answer from array
  answerButtons = Array.from(answerButtons);
  let n = 0;
  let currentAnswers = [];
  for (answerButton of answerButtons) {
      let j = randomIndex[n];
      answerButton.innerText = questionDifficulty[j].answer;
      currentAnswers.push(answerButton.innerText);
      n++;
  }
  // Inserts correct answer if it does not exist already
  if (!currentAnswers.includes(correctAnswer)) {
    answerButtons[Math.floor(Math.random() * 4)].innerHTML = correctAnswer;
  }
}

/** Randomly generates an array of four numbers that generateAnswers
* function will use to assign values to answer buttons.
*/
function generateIndex() {
  let j = 0;
  randomIndex = [];
  for (j = 0; j <= 3; j++) {
    let num = Math.floor(Math.random()* questionDifficulty.length);
    if (randomIndex.includes(num)) {
      num = Math.floor(Math.random()* questionDifficulty.length);
    }
    randomIndex.push(num);
  }  
  return randomIndex;
}

/** Shows user current quiz difficulty */
function displayCurrentQuiz() {
  displayDifficulty = difficultySelection;
  displayDifficulty = displayDifficulty.charAt(0).toUpperCase() + displayDifficulty.slice(1);
  return displayDifficulty;
}

/** Shuffle array before game begins to randomise question order 
 * Learnt from: https://www.youtube.com/watch?v=myL4xmtAVtw */
function shuffle(array) {
  let newPosition;
  let tempPosition;
  // Loop starts at end of array and iterates down
  for (let i = array.length - 1; i > 0; i--) {
    newPosition = Math.floor(Math.random() * (i + 1));
    // Exchanging the old index number with the newly generated one
    tempPosition = array[i];
    array[i] = array[newPosition];
    array[newPosition] = tempPosition;
  }
  return array;
}

function refreshPage() {
  clickAudio();
  document.location.reload(true);
}