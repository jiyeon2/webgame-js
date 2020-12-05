class BaseballGame {
  constructor() {
    this.answer;
    this.records = [];
    this.init();

    this.updateRecordEvent = new Event();
    this.updateResultEvent = new Event();
    this.winEvent = new Event();
    this.failEvent = new Event();
  }

  init() {
    this.answer = this.makeRandomNumber();
  }

  makeRandomNumber() {
    let answerNumberList = [];
    let numberList = Array(9)
      .fill(0)
      .map((_, i) => i + 1);

    for (let i = 0; i < 4; i++) {
      const randIdx = Math.random() * numberList.length;
      const num = numberList.splice(randIdx, 1)[0];
      answerNumberList.push(num);
    }
    console.log(answerNumberList);
    return answerNumberList;
  }

  proceedGame({ input, result }) {
    this.records.push({ input, result });

    if (this.records.length > 10) {
      this.failEvent.trigger({ message: " 😤 맞추기 실패! 😤" }); // 10회 했지만 맞추지 못함
    } else {
      this.triggerUpdateView({ input, result });
      if (result.strike === 4) {
        this.winEvent.trigger({ message: "🙆 정답!! 🙆" }); // 정답을 맞춤
      }
    }
  }

  triggerUpdateView({ input, result }) {
    this.updateRecordEvent.trigger({
      round: this.records.length,
      input,
      result,
    });
    this.updateResultEvent.trigger({
      rest: 10 - this.records.length,
      input,
      result: result.out ? "out" : `${result.strike}S ${result.ball}B`,
    });
  }

  countAnswer(input) {
    let strike = 0;
    let ball = 0;
    for (let i = 0; i < 4; i++) {
      if (this.answer[i] === Number(input[i])) {
        // 스트라이크
        strike += 1;
      } else if (this.answer.includes(Number(input[i]))) {
        // 볼
        ball += 1;
      }
    }

    return {
      strike,
      ball,
      out: strike === 0 && ball === 0,
    };
  }
}
