const SELECTED_CLASS = "selected";
const SHOW_CLASS = "show";

let interval;
let imageCoord = 0;

let comboCount = 0;

let playing = false;
let options = {
  scissor: 0,
  rock: -300,
  paper: -600,
};

const computerContainer = document.querySelector("#computer");
const resultBadge = document.querySelector(".result.badge");
const combo = document.querySelector(".combo");
const comboText = combo.querySelector("span");

function getComputerSelection(imageCoord) {
  return Object.entries(options).find((v) => {
    return v[1] === imageCoord;
  })[0];
}

function startPlaying() {
  playing = true;
  resultBadge.classList.remove(SHOW_CLASS);
  intervalMaker();
}

function intervalMaker() {
  interval = setInterval(() => {
    if (imageCoord === options.rock) {
      imageCoord = options.scissor;
    } else if (imageCoord === options.scissor) {
      imageCoord = options.paper;
    } else {
      imageCoord = options.rock;
    }
    computerContainer.style.background = `url(image.jpg) ${imageCoord}px 0`;
  }, 100);
}

combo.addEventListener("animationend", (e) => {
  console.log("animation end");
  combo.classList.remove("animate");
});

document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    if (!playing) return;
    playing = false;

    let prevSelectedBtn = this.parentElement.querySelector(
      `.${SELECTED_CLASS}`
    );
    if (prevSelectedBtn) {
      prevSelectedBtn.classList.remove(SELECTED_CLASS);
    }
    this.classList.add(SELECTED_CLASS);

    combo.classList.remove("animate");

    clearInterval(interval);

    setTimeout(() => {
      startPlaying();
    }, 1000);

    let mySelection = this.id;
    let computerSelection = getComputerSelection(imageCoord);

    const score = {
      scissor: 0,
      rock: 1,
      paper: -1,
    };

    let scoreDiff = score[mySelection] - score[computerSelection];

    if (scoreDiff === 0) {
      resultBadge.textContent = "다시";
      resultBadge.style.backgroundColor = "turquoise";
    } else if ([-1, 2].includes(scoreDiff)) {
      resultBadge.textContent = "패";
      resultBadge.style.backgroundColor = "red";
      comboCount = 0;
    } else {
      resultBadge.textContent = "승";
      resultBadge.style.backgroundColor = "blue";
      comboCount += 1;
      combo.classList.add("animate");
    }

    comboText.textContent = comboCount;

    if (comboCount) {
      combo.classList.add(SHOW_CLASS);
    } else {
      combo.classList.remove(SHOW_CLASS);
    }

    resultBadge.classList.add(SHOW_CLASS);
    resultBadge.style.left = `${this.offsetLeft - 16}px`; // badge의 width 1/3만큼 이동
  });
});

startPlaying();
