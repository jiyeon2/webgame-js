class BaseballGame {
  constructor() {
    this.selectedNumber;
    this.trial;
    this.form;
    this.input;

    this.createNumber();
    // this.form.addEventListener("submit", this.submitHandler.bind(this));
  }

  createNumber() {
    console.log("create number");
  }

  submitHandler(e) {
    e.preventDefault();
    console.log(this.input.value);
  }
}

const game = new BaseballGame();
