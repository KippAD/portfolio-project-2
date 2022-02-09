let modal = document.getElementById('modal');
let modalTitle = document.getElementById('modalTitle');
let modalContent = document.getElementById('modalContent');    
let modalType;

/** Displays modal when certain events are triggered */
function showModal() {
  modal.style.display = 'block';
  // Specifies which modal to display
  if (modalType === "endQuiz") {
    endGameAudio();
    endQuizModal();
  } else if (modalType === "wipeModal") {
    confirmAudio();
    wipeModal();
  } else if (modalType === "homeModal") {
    confirmAudio();
    goHomeModal();
  } else if (modalType === "createUsername") {
    confirmAudio();
    createUsernameModal();
  }
}

/** Modal displayed upon quiz completion */
function endQuizModal() {
  if (scoreCounter < 9) {
    modalTitle.innerHTML = "Game Over";
    modalContent.innerHTML = `
    <p>Close! You scored ${scoreCounter} out of 12 on the ${difficultySelection} quiz..</p>
    <p>You need to answer 9 questions correctly to complete the quiz.</p>
    <button id="menu-btn" class="btn">Main Menu</button>
    <button id="reset-quiz" class="btn">Try Again</button>
    `;
  } else {
      quizCompletedModal();    
    }
  document.getElementById('menu-btn').addEventListener('click', refreshPage);
  document.getElementById('reset-quiz').addEventListener('click', setQuestionDifficulty);
}

// Different html to be displayed when user completes a quiz
function quizCompletedModal() {
  if (difficultySelection === "hard") {
    modalTitle.innerHTML = "Congratulations";
    modalContent.innerHTML = `
      <p>Well done! You scored ${scoreCounter} out of 12 on the ${difficultySelection} quiz..</p>
      <p>Congratulations, you have completed every quiz difficulty! You are a Capitals Master.</p>
      <button id="menu-btn" class="btn">Main Menu</button>
    `;
  } else {
    modalTitle.innerHTML = "Well Done!";
    modalContent.innerHTML = `
    <p>Well done on completing the ${difficultySelection} quiz, you scored ${scoreCounter} out of 12.</p>
    <p>Your score means that you are eligible to play the next difficulty level!
    <p id="nextQuizText"></p>
    <button id="menu-btn" class="btn">Main Menu</button>
    <button id="next-quiz" class="btn">Next Quiz</button>
    `;
    document.getElementById('next-quiz').addEventListener('click', nextQuiz);
  }
}

/** Modal display when user attempts to clear data */
function wipeModal() {
  modal.style.backgroundColor = "white";
  modalTitle.innerHTML = "Are you sure?";
  modalContent.innerHTML = `
  <p>This action will clear all locally stored data, including high scores</p>
  <p>Are your sure you want to continue?</p>
  <button id="noBtn" class="btn">No</button>
  <button id="yesBtn" class="btn">Yes</button>
  `;
  document.getElementById('noBtn').addEventListener('click', closeModal);
  document.getElementById('yesBtn').addEventListener('click', clearLocalStorage);
}

// Modal displayed when user clicks home icon in game area
function goHomeModal() {
  modal.style.backgroundColor = "white";
  modalTitle.innerHTML = "Are you sure?";
  modalContent.innerHTML = `
  <p>If you go home now you will lose all of your progress in this game.</p>
  <p>Are your sure you want to go to the main menu?</p>
  <button id="noBtn" class="btn">No</button>
  <button id="yesBtn" class="btn">Yes</button>
  `;
  document.getElementById('noBtn').addEventListener('click', closeModal);
  document.getElementById('yesBtn').addEventListener('click', refreshPage);
}

/** The modal that displays when user tries to access the scores page without a stored username */
function createUsernameModal() {
  modal.style.backgroundColor = "white";
  modalTitle.innerHTML = "Sorry!";
  modalContent.innerHTML = `
  <p>Sorry, you need to enter a username to check the scores page!</p>
  <p>Create username?</p>
  <button id="noBtn" class="btn">No</button>
  <button id="yesBtn" class="btn">Yes</button>
  `;
  document.getElementById('noBtn').addEventListener('click', closeModal);
  document.getElementById('yesBtn').addEventListener('click', enterUsername);
}

function nextQuiz() {
  if (difficultySelection === "easy") {
    difficultySelection = "normal";
  } else if (difficultySelection === "normal") {
    difficultySelection = "hard";
  }
  setQuestionDifficulty();
  return difficultySelection;
}

/** Closes the modal */
function closeModal() {
  modal.style.display = 'none';
}

/** Clears storage and assigns username to falsey value form local storage */
function clearLocalStorage() {
  localStorage.clear();
  setHighScoreCounter();
  username = localStorage.getItem('username');
  if (loadPage === "home") {
    refreshPage();
  } else if (loadPage === "username") {
    enterUsername();
  }
  closeModal();
}