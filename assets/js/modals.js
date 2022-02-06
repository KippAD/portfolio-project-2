let modalType;

/** Displays modal when certain events are triggered */
function showModal() {
  let modal = document.getElementById('modal');
  let modalTitle = document.getElementById('modalTitle');
  let modalContent = document.getElementById('modalContent');

  modal.style.display = 'block';
  // Specifies which modal to display
  if (modalType === "endQuiz") {
    endQuizModal();
  } else if (modalType === "clearModal") {
    clearModal();
  } else if (modalType === "homeModal") {
    goHomeModal();
  };
};

function endQuizModal() {
  modal.style.backgroundColor = "white";
  modalTitle.innerHTML = "Quiz Complete!";
  if (scoreCounter >= 9) {
    modalContent.innerHTML = `
    <p>Well done on completing the ${difficultySelection} quiz, you scored ${scoreCounter} out of 12.</p>
    <p>Your score means that you are eligible to play the next difficulty level!
    <p id="nextQuizText"></p>
    <button id="menu-btn" class="btn">Main Menu</button>
    <button id="next-quiz" class="btn">Next Quiz</button>
    `;
  } else {
    modalContent.innerHTML = `
    <p>Well done on completing the ${difficultySelection} quiz, you scored ${scoreCounter} out of 12.</p>
    <p id="nextQuizText"></p>
    <button id="next-btn" class="btn">Main Menu</button>
    `;
  }
}