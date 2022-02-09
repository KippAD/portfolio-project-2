const clickSound = new Audio("assets/sounds/click.wav");
const correctSound = new Audio("assets/sounds/correctAnswer.wav");
const incorrectSound = new Audio("assets/sounds/incorrectAnswer.wav");
const endGameSound = new Audio("assets/sounds/endGameModal.wav");
const confirmModalSound = new Audio("assets/sounds/confirmModal.wav");

const soundIcon = document.getElementById('sound-icon');
soundIcon.addEventListener('click', soundSwitch);

let sound = localStorage.getItem('sound');
setSoundIcon();

/**
* Stores sound value in local storage so that selection is remembered when page is reloaded
*/ 
function soundSwitch() {
  clickAudio();
  if (sound === "on") {
    sound = "off";
  } else if (sound === "off") {
    sound = "on";
  }
  localStorage.setItem('sound', sound);
  setSoundIcon();
}

/** Changes the sound icon */
function setSoundIcon() {
  if (!sound) {
    sound = "on";
  }
  if (sound === "off") {
    soundIcon.innerHTML = `
    <i class="fas fa-volume-mute"></i>
  `;
  } else if (sound === "on") {
    soundIcon.innerHTML = `
    <i class="fas fa-volume-up"></i>
    `;
  }
}

/** Audio for a click */
function clickAudio() {
  if (sound === "on") {
    clickSound.play();
  }
}

/** Audio for a correct answer */
function correctAudio() {
  if (sound === "on") {
    correctSound.play();
  }
}

/** Audio for an incorrect answer */
function incorrectAudio() {
  if (sound === "on") { 
    incorrectSound.play();
  }
}

/** Audio for quiz completion */
function endGameAudio() {
  if (sound === "on") { 
    endGameSound.play();
  }
}

/** Audio for when a confirm modal pops up */
function confirmAudio() {
  if (sound === "on") { 
    confirmModalSound.play();
  }
}