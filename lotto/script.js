const btnGetNumber = document.querySelector(".js-getNumber");
const numbersContainer = document.querySelector(".numbers");
const regularNumbersContainer = numbersContainer.querySelector(
  ".numbers__regular"
);
const bonusNumberContainer = numbersContainer.querySelector(".numbers__bonus");

function getRandomNumbers() {
  const numbers = Array(45)
    .fill()
    .map((_, i) => i + 1);

  let shuffledNumbers = [];
  while (numbers.length > 0) {
    const randomIndex = Math.floor(Math.random() * numbers.length - 1);
    const poppedNum = numbers.splice(randomIndex, 1)[0];
    shuffledNumbers.push(poppedNum);
  }

  return {
    regular: shuffledNumbers.slice(0, 6).sort((a, b) => a - b),
    bonus: shuffledNumbers[shuffledNumbers.length - 1],
  };
}

function appendBallElement(number, target) {
  const ball = document.createElement("div");
  ball.classList.add("ball");
  ball.textContent = number;
  target.append(ball);
}

function emptyNumbersContainer() {
  regularNumbersContainer.innerHTML = "";
  bonusNumberContainer.innerHTML = "";
}

btnGetNumber.addEventListener("click", () => {
  emptyNumbersContainer();

  const { regular, bonus } = getRandomNumbers();
  regular.forEach((number) => {
    appendBallElement(number, regularNumbersContainer);
  });
  appendBallElement(bonus, bonusNumberContainer);
});
