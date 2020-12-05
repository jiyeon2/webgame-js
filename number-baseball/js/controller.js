class Controller {
  constructor() {
    this.view = new UserInput();
    this.game = new BaseballGame();

    this.view.submitNumberEvent.addListener((number) => {
      const result = this.game.countAnswer(number.split(""));
      this.game.proceedGame({ input: number, result });
    });

    this.game.updateRecordEvent.addListener((record) => {
      this.view.updateRecord(record);
    });

    this.game.updateResultEvent.addListener((record) => {
      this.view.updateResult(record);
    });

    this.game.failEvent.addListener(({ message }) => {
      this.view.updateResult({
        rest: 0,
        input: "----",
        result: message,
      });
    });

    this.game.winEvent.addListener(({ message }) => {
      this.view.updateResult({
        rest: 0,
        input: "----",
        result: message,
      });
    });
  }
}
