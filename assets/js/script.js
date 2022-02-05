// Assigning buttons on the home page
const buttons = document.getElementsByTagName('button');
const playBtn = buttons[0];
const rulesBtn = buttons[1];
const scoresBtn = buttons[2];

// Event listeners for buttons on main menu to take to different game pages
playBtn.addEventListener('click', enterUsername);

// Game area is manipulated throughout the game
const gameArea = document.getElementById('game-area');

// Empty variables for later reassignment
let username = localStorage.getItem('username');

/**
* Takes user to input where username is stored in local storage
*/
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

/**
* Shows html area where user selects a difficulty
*/
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
  document.getElementById('play-btn').addEventListener('click', runGame);
};

function runGame() {
  gameArea.innerHTML = ``;
}

/** Checks form validity and stores username in local storage upon submission
*
 */
function storeUsername() {
  let form = document.getElementById('username-form');
  if (form.checkValidity()) {
    username = document.getElementById('username').value;
    localStorage.setItem('username', username);
    console.log(localStorage);
    selectDifficulty();
  } 
};

/** Clears storage and assigns username to falsey value form local storage */
function clearLocalStorage() {
  localStorage.clear();
  username = localStorage.getItem('username');
  enterUsername();
}

