let choices = document.querySelector(".startgame");

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
  let outcome = document.querySelector("#outcome");
  let computerChoice = getComputerChoice();

  let choicesArr = ["rock", "paper", "scissors"];

  let playerEl = document.getElementById(playerChoice);
  let computerEl = document.getElementById(computerChoice);

  if (playerChoice === computerChoice) {
    //tie
    outcome.innerHTML = "Tie!";
    outcome.style.opacity = "1";

    playerEl.style.scale = "0.9";

    choicesArr.forEach((choice) => {
      if (choice !== playerChoice) {
        let element = document.getElementById(choice);
        element.style.opacity = "0.5";
      }
    });

    let game = document.querySelectorAll(".game");
    game.forEach((el) => {
      el.style.pointerEvents = "none";
    });

    setTimeout(() => {
      outcome.style.opacity = "0";
      game.forEach((el) => {
        el.style.pointerEvents = "auto";
      });
      choicesArr.forEach((choice) => {
        let element = document.getElementById(choice);
        element.style.opacity = "1";
      });
      playerEl.style.scale = "1";
    }, 3500);

    return;
  } else if (
    (playerChoice.toLowerCase() === "rock" && computerChoice === "scissors") ||
    (playerChoice.toLowerCase() === "paper" && computerChoice === "rock") ||
    (playerChoice.toLowerCase() === "scissors" && computerChoice === "paper")
  ) {
    //win
    outcome.innerHTML = `${playerChoice} beats ${computerChoice}, You Win!`;
    outcome.style.opacity = "1";

    playerEl.style.scale = "1.1";

    choicesArr.forEach((choice) => {
      if (choice !== playerChoice && choice !== computerChoice) {
        let element = document.getElementById(choice);
        element.style.opacity = "0.2";
        element.style.filter = "blur(5px)";
      }
    });

    let game = document.querySelectorAll(".game");
    game.forEach((el) => {
      el.style.pointerEvents = "none";
    });

    computerEl.style.opacity = "0.5";
    computerEl.style.scale = "0.9";

    setTimeout(() => {
      outcome.style.opacity = "0";
      game.forEach((el) => {
        el.style.pointerEvents = "auto";
      });
      choicesArr.forEach((choice) => {
        let element = document.getElementById(choice);
        element.style.opacity = "1";
        element.style.filter = "blur(0px)";
      });
      playerEl.style.scale = "1";
    }, 3500);

    return;
  } else {
    //loss
    outcome.innerHTML = `${playerChoice} is beat by ${computerChoice}, You Lose!`;
    outcome.style.opacity = "1";

    playerEl.style.filter = "grayscale(65%)";
    playerEl.style.opacity = "0.8";
    playerEl.style.scale = "0.9";

    choicesArr.forEach((choice) => {
      if (choice !== playerChoice && choice !== computerChoice) {
        let element = document.getElementById(choice);
        element.style.opacity = "0.2";
        element.style.filter = "blur(5px)";
      }
    });

    let game = document.querySelectorAll(".game");
    game.forEach((el) => {
      el.style.pointerEvents = "none";
    });

    computerEl.style.scale = "1.1";

    setTimeout(() => {
      outcome.style.opacity = "0";
      game.forEach((el) => {
        el.style.pointerEvents = "auto";
      });
      choicesArr.forEach((choice) => {
        let element = document.getElementById(choice);
        element.style.opacity = "1";
        element.style.filter = "blur(0px)";
        element.style.filter = "grayscale(0%)";
      });
      computerEl.style.scale = "1";
    }, 3500);

    return;
  }
}
