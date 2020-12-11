let imageCoord = 0;

let options = {
  scissor: 0,
  rock: -300,
  paper: -600,
};

function getComputerSelection(imageCoord) {
  return Object.entries(options).find((v) => {
    return v[1] === imageCoord;
  })[0];
}

let interval;

function intervalMaker() {
  interval = setInterval(() => {
    if (imageCoord === options.rock) {
      imageCoord = options.scissor;
    } else if (imageCoord === options.scissor) {
      imageCoord = options.paper;
    } else {
      imageCoord = options.rock;
    }
    document.querySelector(
      "#computer"
    ).style.background = `url(image.jpg) ${imageCoord}px 0`;
  }, 100);
}

intervalMaker();

document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    clearInterval(interval);
    setTimeout(() => {
      intervalMaker();
    }, 1000);
    let koDict = {
      가위: "scissor",
      바위: "rock",
      보: "paper",
    };
    let mySelection = koDict[this.textContent];
    let computerSelection = getComputerSelection(imageCoord);
    console.log(mySelection, computerSelection);

    const score = {
      scissor: 0,
      rock: 1,
      paper: -1,
    };

    let scoreDiff = score[mySelection] - score[computerSelection];
    if (scoreDiff === 0) {
      console.log("비겼습니다");
    } else if ([-1, 2].includes(scoreDiff)) {
      console.log("졌습니다");
    } else {
      console.log("이겼습니다");
    }
  });
});
