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
      <div id="username-div">
        <label for="username" class="setup-label">Please enter a Username:</label><br>
        <input id="username" type="text" placeholder="Enter your username here..." required>
        <button type="submit" id="submit" class="btn">Submit <i class="fas fa-arrow-right"></i></button>
      </div>
    `;
    document.getElementById('submit').addEventListener('click', storeUsername);
  } else {
    selectDifficulty();
  }; 
};

/** Stores username in local storage upon submission
 */
function storeUsername() {
  username = document.getElementById('username').value;
  localStorage.setItem("username", username);
  console.log(localStorage);

  selectDifficulty();
}

/**
* Shows html area where user selects a difficulty
*/
function selectDifficulty() {
  gameArea.innerHTML = `test`
}