// Assigning buttons on the home page
const buttons = document.getElementsByTagName('button');
const playBtn = buttons[0];
const rulesBtn = buttons[1];
const scoresBtn = buttons[2];

const homeIcon = document.getElementById('home-button')
homeIcon.addEventListener('click', refreshPage);

// Event listeners for buttons on main menu
playBtn.addEventListener('click', enterUsername);
rulesBtn.addEventListener('click', loadRules);
scoresBtn.addEventListener('click', loadScores)

// High scores 
let easyHighScore = localStorage.getItem('easyHighScore');
let normalHighScore = localStorage.getItem('normalHighScore');
let hardHighScore = localStorage.getItem('hardHighScore');
convertHighScore();

// General variables
let username = localStorage.getItem('username');
let difficulty;
let questionDifficulty;
let question;
let correctAnswer;
let scoreCounter;
let questionCounter;
let displayAnswer;
let randomIndex = [];
const gameArea = document.getElementById('game-area');
let answerButtons = document.getElementsByClassName('answer-btn');

/** Takes user to input where username is stored in local storage */
function enterUsername() {
  clickAudio();
  if (!username) {
    gameArea.innerHTML = `
      <form action="" id="username-form" method="post">  
          <label for="username">Please enter a Username:</label><br>
          <input id="username" type="text" placeholder="Enter your username here..." required>
          <button type="submit" id="submit" class="btn">Submit <i class="fas fa-arrow-right"></i></button>
      </form>
    `;
    document.getElementById('submit').addEventListener('click', storeUsername);
  } else {
    selectDifficulty();
  }; 
};

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
  document.getElementById('play-btn').addEventListener('click', setQuestionDifficulty);
};

/** Selects which array to draw questions from depending on selected difficulty */
function setQuestionDifficulty() {
  clickAudio();
  difficultySelection = document.querySelector('input[name="difficulty"]:checked').value;

  if (difficultySelection === "easy") {
    questionDifficulty = [...easyQuestions];
  } else if (difficultySelection === "normal") {
    questionDifficulty = [...normalQuestions];
  } else if (difficultySelection === "hard") {
    questionDifficulty = [...hardQuestions];
  };
  let i;
  shuffle(questionDifficulty);
  runGame();
};

/** Loads the game area where questions and answers are displayed */
function runGame() {
  gameArea.innerHTML = `
    <h2>Good luck ${username}, this is question <span id="questionCounter"></span> of 12 of the ${difficultySelection} Quiz</h2>
    <p>Which of the following cities is the capital of <span id="question-sub"></span>?</p>
    <div class="answer-container">  
      <button class="answer-btn btn">Answer1</button>
      <button class="answer-btn btn">Answer2</button>
      <button class="answer-btn btn">Answer3</button>
      <button class="answer-btn btn">Answer4</button>
    </div> 
    <p>Current Score: <span id="scoreCounter"></span></p>
    <p>High Score: <span id="highScoreCounter">0</span></p>
  `;
  // Replaces home icon event listener whilst on game page
  homeIcon.removeEventListener('click', refreshPage)
  modalType ="homeModal";
  homeIcon.addEventListener('click', showModal);
  i = 0;
  scoreCounter = 0;
  questionCounter = 1;
  setHighScoreCounter();

  populateQuestion();
  checkAnswer();
};

/** Loads the rules page */
function loadRules() {
  gameArea.innerHTML = `
    <div class="rules-div">
      <p>Welcome to the Capitals of the World Quiz, here's how it all works:</p>
      <p>Simply click play, enter a username and choose a difficulty.</p>
      <p>To unlock harder quiz difficulties answer 9 or more correctly on the preceeding difficulty.</p>
      <button id="rules-play" class="menu-btn btn">Play</button>
    </div
  `;
  document.getElementById('rules-play').addEventListener('click', enterUsername);
}

/** Loads the rules page */
function loadScores() {
  if (!localStorage.getItem('username')) {
    alert('Sorry, you need to log a username before checking your scores!')
  } else {
  gameArea.innerHTML = `
    <div class="rules-div">
      <p>Hello ${localStorage.getItem('username')}! Here are your high scores!</p>
      <p>Easy Quiz: ${localStorage.getItem('easyHighScore')}</p>
      <p>Normal Quiz: ${localStorage.getItem('normalHighScore')}</p>
      <p>Hard Quiz: ${localStorage.getItem('hardHighScore')}</p>
      <button id="clearRecord" class="menu-btn btn">Clear Record</button>
    </div>
  `;
  };
  modalType = "wipeModal";
  loadPage = "home";
  document.getElementById('clearRecord').addEventListener('click', showModal);
}

/** Sets all counters and ensures game area populated with question */
function nextQuestion() {
  if (i <= 11) {
    // Ensures that the high score counter matches the current score value
    if (scoreCounter > parseInt(highScoreCounter.innerHTML) ) {
      highScoreCounter.innerHTML = scoreCounter;
    };
    populateQuestion();
  } else {
    document.getElementById('scoreCounter').innerHTML = scoreCounter;
    checkHighScore();
    modalType = "endQuiz";
    showModal();
  }
};

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
};

/** Checks if answer is correct or incorrect and loads next question */
function checkAnswer() {
  answerButtons.forEach(answerButton => {
    answerButton.addEventListener('click', function () {
      if (answerButton.innerHTML === correctAnswer) {
        correctAudio();
        scoreCounter += 1;
        showAnswer();
      } else {
        incorrectAudio();
        answerButton.style.backgroundColor = "#C32F27";
        showAnswer();
      };
      questionCounter += 1;
      i++;
    });
  });
};

/** Highlights correct answer green */
function showAnswer() {
  for (answerButton of answerButtons)
    if (answerButton.innerHTML === correctAnswer) {
      answerButton.style.backgroundColor = "#4CB963";
      setTimeout(() => {
	      answerButton.style.backgroundColor = "#4B5842";
        resetColors();
        nextQuestion();
   }, 2000);
  };
};

/** Sets high score counter to local storage value */ 
function setHighScoreCounter() {
  let highScoreCounter = document.getElementById('highScoreCounter');

  if (difficultySelection === 'easy') {
    highScoreCounter.innerHTML = localStorage.getItem('easyHighScore')
  } else if (difficultySelection === 'normal') {
    highScoreCounter.innerHTML = localStorage.getItem('normalHighScore')
  } else if (difficultySelection === 'hard') {
    highScoreCounter.innerHTML = localStorage.getItem('hardHighScore')
  };
};

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
  };
  return highScoreCounter;
};

/** Ensures high score is always a number */ 
function convertHighScore() {
 if (!easyHighScore) {
    easyHighScore = 0;
    localStorage.setItem("easyHighScore", easyHighScore);
  };
  if (!normalHighScore) {
    normalHighScore = 0;
    localStorage.setItem("normalHighScore", normalHighScore);
  }; 
  if (!hardHighScore) {
    hardHighScore = 0;
    localStorage.setItem("hardHighScore", hardHighScore);
  };
};

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
  }; 

  if (localStorage.getItem('normalHighScore') < 9) {
    hardInput.type = "button";
    padlockIcon[1].style.display = "inline-block";
  }; 
};


/** Ensures that the answer btn colors reset as each question is loaded */
function resetColors() {
  answerButtons.forEach(answerButton => {
    answerButton.style.backgroundColor = "#4B5842";
  });   
};

/** Checks form validity and stores username in local storage upon submission */
function storeUsername() {
  clickAudio();
  let form = document.getElementById('username-form');
  if (form.checkValidity()) {
    username = document.getElementById('username').value;
    localStorage.setItem('username', username);
    convertHighScore();
    selectDifficulty();
  }; 
  return username;
};

function generateAnswers() {
  // Populates answer buttons with random answer from array
  answerButtons = Array.from(answerButtons);
  let n = 0;
  let currentAnswers = [];
  for (answerButton of answerButtons) {
      let j = randomIndex[n];
      answerButton.innerHTML = questionDifficulty[j].answer;
      console.log(questionDifficulty[j].answer)
      currentAnswers.push(answerButton.innerHTML);
      n++;
  };
  // Inserts correct answer if it does not exist already
  if (!currentAnswers.includes(correctAnswer)) {
    answerButtons[Math.floor(Math.random() * 4)].innerHTML = correctAnswer;
  };
};

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
    };
    randomIndex.push(num);
  };  
  console.log(randomIndex);
  return randomIndex
};

/** Shuffle array before game begins to randomise question order */
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
  };
  return array;
};

function refreshPage() {
  document.location.reload(true);
};
