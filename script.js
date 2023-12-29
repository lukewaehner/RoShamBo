//decor JS
const slides = document.querySelectorAll(".slides");
let currentSlide = 0;

function flipToNextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlideTransform();

  setTimeout(flipToFirstSlide, 3500);
}

function flipToFirstSlide() {
  currentSlide = 0;
  updateSlideTransform();
  setTimeout(deleteTemp, 500);
}

function updateSlideTransform() {
  slides.forEach((slide, index) => {
    const offset = (index - currentSlide) * 100;
    slide.style.transform = `translateX(${offset}%)`;
  });
}

function deleteTemp() {
  let temp = document.querySelectorAll(".temporary");
  temp.forEach((element) => {
    element.remove();
  });
}

// game JS
let choices = document.querySelector("#Moves");
choices.addEventListener("click", (e) => {
  switch (e.target.id) {
    case "rock":
      playRound("rock");
      break;
    case "paper":
      playRound("paper");
      break;
    case "scissors":
      playRound("scissors");
      break;
  }
});

function getComputerChoice() {
  RandomVar = Math.floor(Math.random() * 3) + 1;
  const RPS = {
    1: "rock",
    2: "paper",
    3: "scissors",
  };
  return RPS[RandomVar];
}
//plays the game

function playRound(playerChoice) {
  let playScreen = document.querySelector(".playScreen");
  //add player choice to slide 2
  let playerGraphic = document.createElement("img");
  playerGraphic.src = `./assets/rps-${playerChoice}.jpg`;
  playerGraphic.id = "tempPlayerGraphic";
  playerGraphic.classList.add("temporary");

  let computerChoice = getComputerChoice();
  let computerGraphic = document.createElement("img");
  computerGraphic.src = `./assets/rps-computer-${computerChoice}.jpeg`;
  computerGraphic.id = "tempComputerGraphic";
  computerGraphic.classList.add("temporary");

  let outcomeText = document.querySelector("#outcome");
  let winCard = document.querySelector("#winCard");
  let lossCard = document.querySelector("#lossCard");
  let tieCard = document.querySelector("#tieCard");
  if (playerChoice === computerChoice) {
    computerGraphic.classList.add("tieImage");
    playerGraphic.classList.add("tieImage");
    playScreen.appendChild(playerGraphic);
    playScreen.appendChild(computerGraphic);

    outcomeText.innerHTML = "Tie";
    setTimeout(() => {
      tieCard.innerHTML = parseInt(tieCard.innerHTML) + 1;
    }, 500);
    return;
  } else if (
    (playerChoice.toLowerCase() === "rock" && computerChoice === "scissors") ||
    (playerChoice.toLowerCase() === "paper" && computerChoice === "rock") ||
    (playerChoice.toLowerCase() === "scissors" && computerChoice === "paper")
  ) {
    playerGraphic.classList.add("winner");
    computerGraphic.classList.add("loser");
    playScreen.appendChild(playerGraphic);
    playScreen.appendChild(computerGraphic);

    outcomeText.innerHTML = "You Win!";
    setTimeout(() => {
      winCard.innerHTML = parseInt(winCard.innerHTML) + 1;
    }, 500);
    //win
  } else {
    computerGraphic.classList.add("winner");
    playerGraphic.classList.add("loser");
    playScreen.appendChild(playerGraphic);
    playScreen.appendChild(computerGraphic);

    outcomeText.innerHTML = "You Lose!";
    setTimeout(() => {
      lossCard.innerHTML = parseInt(lossCard.innerHTML) + 1;
    }, 500);

    //loss
  }
}
