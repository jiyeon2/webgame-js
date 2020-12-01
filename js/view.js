class UserInput {
  constructor() {
    this.input = document.querySelector("#user-input-number");
    this.submitButton = document.querySelector(".btn-submit");
    this.form = document.querySelector(".input-container");
    this.numberpad = this.form.querySelector(".numberpad");
    this.restDisplay = document.querySelector(".rest span");
    this.inputDisplay = document.querySelector(".last-input span");
    this.resultDisplay = document.querySelector(".result span");
    this.records = document.querySelectorAll(".record-table tbody tr");

    this.form.addEventListener("submit", this.handleSubmit.bind(this));
    this.numberpad.addEventListener("click", this.numberpadHandler.bind(this));
    this.input.addEventListener("keyup", this.inputChangeHandler.bind(this));
    // input[type=text] 키보드 입력시 모든 값과 중복되는 숫자가 입력가능함
    // 입력 자체를 막을 수 있을까?

    this.submitNumberEvent = new Event();

    this.init();
  }

  numberpadHandler(e) {
    if (!e.target.disabled && this.input.value.length < 4) {
      e.target.disabled = true;
      this.input.value += e.target.textContent;
      this.value = this.input.value;
      this.submitButton.disabled = this.input.value.length !== 4;
    }
  }

  inputChangeHandler(e) {
    if ("123456789".indexOf(e.key) > -1 && this.input.value.length <= 4) {
      this.value = this.input.value;
      this.numberpad.children[e.key - 1].disabled = true;
    } else if (e.key === "Backspace") {
      if (this.value !== this.input.value) {
        const removedNum = this.value[this.value.length - 1];
        this.numberpad.children[removedNum - 1].disabled = false;
        this.value = this.input.value;
      }
    }

    if (this.input.value.length === 4) {
      this.submitButton.disabled = false;
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.input.value.length !== 4) {
      return false;
    }

    console.log("submit value : ", this.input.value);
    this.submitNumberEvent.trigger(this.input.value);
    this.clearInputButtons();
  }

  updateResult({ rest, input, result }) {
    this.restDisplay.textContent = rest;
    this.inputDisplay.textContent = input;
    this.resultDisplay.textContent = result;
  }

  updateRecord({ round, input, result }) {
    console.log(result);
    const tr = this.records[round - 1];
    tr.children[1].textContent = input;
    tr.children[2].textContent = result.ball || "-";
    tr.children[3].textContent = result.strike || "-";
    tr.children[4].textContent = result.out ? "out" : "-";
  }

  init() {
    this.clearInputButtons();
    this.updateResult({ rest: "10", input: "", result: "" });
  }

  clearInputButtons() {
    this.value = "";
    this.input.value = "";
    this.submitButton.disabled = true;
    for (let button of this.numberpad.children) {
      button.disabled = false;
    }
  }
}
