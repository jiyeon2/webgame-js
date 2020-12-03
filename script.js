class TicTacToe {
  constructor() {
    this.player;
    this.board;
    this.playing = false;

    this.cells = document.querySelectorAll(".board__cell");
    this.startButton = document.querySelector(".cover button");
    this.coverContainer = document.querySelector(".cover");
    this.gameContainer = document.querySelector(".game");
    this.playerDisplay = document.querySelector(".player__id");
    this.resultDisplay = document.querySelector(".result");

    this.cells.forEach((cell) => {
      cell.addEventListener("click", this.cellClickHandler.bind(this));
    });
    this.startButton.addEventListener("click", this.startNewGame.bind(this));

    this.init();
  }

  startNewGame() {
    console.log("새게임");
    this.coverContainer.classList.add("hide");
    this.gameContainer.classList.remove("hide");
    this.init();
  }

  finishGame() {
    this.playing = false;
    this.coverContainer.classList.remove("hide");
    this.gameContainer.classList.add("hide");
  }

  cellClickHandler(e) {
    if (this.playing === false) {
      return;
    }
    const el = e.target;
    const row = Number(e.target.dataset.row);
    const col = Number(e.target.dataset.col);

    if (this.isEmptyCell({ row, col })) {
      this.markCell({ row, col, el });
      if (this.isCurrentPlayerWin()) {
        // 3칸이 이어진 경우 해당 플레이어 승리
        this.displayText(`${this.player}의 승리!`);
        this.finishGame();
      } else if (this.isEveryCellMarked()) {
        // 3칸을 잇지 못했지만 모든 칸이 찬 경우 비김
        this.displayText("비겼습니다");
        this.finishGame();
      } else {
        // 누구도 3칸을 잇지 못하고, 남은 칸이 있는 경우
        this.changePlayer();
      }
    }
  }

  init() {
    this.player = "X";
    this.board = Array.from({ length: 3 }, () => {
      return Array.from({ length: 3 }, () => null);
    });
    this.playing = true;
    this.cells.forEach((cell) => (cell.textContent = ""));
  }

  changePlayer() {
    this.player = this.player === "X" ? "O" : "X";
    this.playerDisplay.textContent = this.player;
  }

  displayText(text) {
    // cover 에 표시
    this.resultDisplay.textContent = text;
    console.log(text);
  }

  isEmptyCell({ row, col }) {
    return this.board[row][col] === null;
  }

  isEveryCellMarked() {
    for (let i = 0; i < 3; i++) {
      const row = this.board[i];
      for (let j = 0; j < 3; j++) {
        if (row[j] === null) {
          return false;
        }
      }
    }
    return true;
  }

  isCurrentPlayerWin() {
    // 3칸이 이어졌는지 확인
    // 가로줄
    if (
      this.board[0].every === this.player ||
      this.board[1].every === this.player ||
      this.board[2].every === this.player
    ) {
      return true;
    }
    // 세로줄
    for (let i = 0; i < this.board.length; i++) {
      if (
        this.board[0][i] == this.player &&
        this.board[1][i] == this.player &&
        this.board[2][i] == this.player
      ) {
        return true;
      }
    }
    // 대각선
    if (
      this.board[0][0] == this.player &&
      this.board[1][1] == this.player &&
      this.board[2][2] == this.player
    ) {
      return true;
    }
    if (
      this.board[2][0] == this.player &&
      this.board[1][1] == this.player &&
      this.board[0][2] == this.player
    ) {
      return true;
    }
    return false;
  }

  markCell({ row, col, el }) {
    el.textContent = this.player;
    this.board[row][col] = this.player;
  }
}

const t = new TicTacToe();
