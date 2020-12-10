const opponentDisplay = document.querySelector(".opponent span");
const reresultDisplay = document.querySelector(".result span");

const dictionary = {
  scissors: "가위",
  rock: "바위",
  paper: "보",
};
const options = ["rock", "scissors", "paper"];

const buttons = document.querySelectorAll("button[data-value]");

function clearDisplay() {
  opponentDisplay.textContent = "";
  reresultDisplay.textContent = "";
  buttons.forEach((button) => {
    button.classList.remove("clicked");
  });
}
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    clearDisplay();
    e.target.classList.add("clicked");

    const opponentSelection = Math.floor(Math.random() * 3);
    const mine = e.target.dataset.value;

    let resultText = "";
    if (options.indexOf(mine) === opponentSelection) {
      resultText = "비겼습니다";
    } else if (
      options.indexOf(mine) - opponentSelection === -1 ||
      options.indexOf(mine) - opponentSelection === 2
    ) {
      resultText = "이겼습니다";
    } else {
      resultText = "졌습니다";
    }

    opponentDisplay.textContent = dictionary[options[opponentSelection]];
    reresultDisplay.textContent = resultText;
  });
});
