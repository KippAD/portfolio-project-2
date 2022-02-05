// Assigning buttons on the home page
const buttons = document.getElementsByTagName('button');
const playBtn = buttons[0];
const rulesBtn = buttons[1];
const scoresBtn = buttons[2];

// Event listeners for buttons on main menu
playBtn.addEventListener('click', enterUsername);

const gameArea = document.getElementById('game-area');

let answerButtons = document.getElementsByClassName('answer-btn');

// General variables
let username = localStorage.getItem('username');
let difficulty;
let questionDifficulty;
let question;
let answer;
let scoreCounter = 0;
let questionCounter = 1;
let displayAnswer;
let randomIndex = [];


/** Takes user to input where username is stored in local storage */
function enterUsername() {
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
  // 'Not you?' text that clears local storage and reloads enter username page
  document.getElementById('clear-username').addEventListener('click', clearLocalStorage);
  // Submit button to load game area with selected difficulty
  document.getElementById('play-btn').addEventListener('click', setQuestionDifficulty);
};

/** Selects which array to draw questions from depending on selected difficulty */
function setQuestionDifficulty() {
  difficultySelection = document.querySelector('input[name="difficulty"]:checked').value;

  if (difficultySelection === "easy") {
    questionDifficulty = [...easyQuestions];
  } else if (difficultySelection === "normal") {
    questionDifficulty = [...normalQuestions];
  } else if (difficultySelection === "hard") {
    questionDifficulty = [...hardQuestions];
  };
  let i = 0;
  runGame();
};

function runGame() {
  gameArea.innerHTML = `
    <h2>Good luck ${username}, this is question <span id="questionCounter"></span> of 12</h2>
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
  i = 0;
  nextQuestion();
  checkAnswer();
};

/** Sets all counters and ensures game area populated with question */
function nextQuestion() {
  if (questionCounter <= 12) {
    populateQuestion();
    questionCounter += 1;
    i++;
  }
};

/** Sets the html substitution values in game area */
function populateQuestion() {
  // Populates answer buttons with random answer from array
  generateIndex();
  generateAnswers();
  
  question = questionDifficulty[i].question;
  answer = questionDifficulty[i].answer;
  // Replaces inner html of random answer box with correct answer 
  
  // Check through and only execute if panel isnt already there
  answerButtons[Math.floor(Math.random() * 4)].innerHTML = answer;

  document.getElementById('question-sub').innerHTML = question;
  document.getElementById('questionCounter').innerHTML = questionCounter;
  document.getElementById('scoreCounter').innerHTML = scoreCounter;
}

/** Fills answer buttons inner HTML with random values */
function generateAnswers() {
  // Populates answer buttons with random answer from array
  answerButtons = Array.from(answerButtons);
  let n = 0;
  for (answerButton of answerButtons) {
    let j = randomIndex[n];
    answerButton.innerHTML = questionDifficulty[j].answer;
    n++;
  };
}

/** Checks if answer is correct or incorrect and loads next question */
function checkAnswer() {
  answerButtons.forEach(answerButton => {
    answerButton.addEventListener('click', function () {
      if (answerButton.innerHTML === answer) {
        scoreCounter += 1;
        showAnswer();
      } else {
        answerButton.style.backgroundColor = "#C32F27";
        showAnswer();
      };
    });
  });
};

/** Highlights correct answer green */
function showAnswer() {
  for (answerButton of answerButtons)
    if (answerButton.innerHTML === answer) {
      answerButton.style.backgroundColor = "#4CB963";
      setTimeout(() => {
	      answerButton.style.backgroundColor = "#4B5842";
        resetColors();
        nextQuestion();
   }, 2000);
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
  let form = document.getElementById('username-form');
  if (form.checkValidity()) {
    username = document.getElementById('username').value;
    localStorage.setItem('username', username);
    console.log(localStorage);
    selectDifficulty();
  }; 
  return username;
};

/** Clears storage and assigns username to falsey value form local storage */
function clearLocalStorage() {
  localStorage.clear();
  username = localStorage.getItem('username');
  enterUsername();
};

function generateAnswers() {
  // Populates answer buttons with random answer from array
  answerButtons = Array.from(answerButtons);
  let n = 0;
  for (answerButton of answerButtons) {
    let j = randomIndex[n];
    answerButton.innerHTML = questionDifficulty[j].answer;
    n++;
  };
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
    };
    randomIndex.push(num);
  };  
  return randomIndex
};