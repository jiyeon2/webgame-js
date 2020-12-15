let tbody = document.querySelector("#table tbody");
let dataset = [];
let stopFlag = false;
let openedCells = 0;

document.querySelector("#exec").addEventListener("click", () => {
  // 내부 먼저 초기화
  tbody.innerHTML = "";
  dataset = [];
  stopFlag = false;
  openedCells = 0;
  document.querySelector("#result").textContent = "";

  let hor = document.querySelector("#hor").value;
  let ver = document.querySelector("#ver").value;
  let mine = document.querySelector("#mine").value;

  // 피셔 예이츠 셔플로 지뢰 위치 뽑기 0~99
  let candidates = Array(hor * ver)
    .fill()
    .map((v, i) => i);

  let shuffle = [];

  while (shuffle.length < mine) {
    let num = candidates.splice(
      Math.floor(Math.random() * candidates.length),
      1
    )[0];
    shuffle.push(num);
  }

  // 지뢰 테이블 만들기

  for (let i = 0; i < ver; i += 1) {
    let arr = [];
    let tr = document.createElement("tr");
    dataset.push(arr);
    for (let j = 0; j < hor; j += 1) {
      arr.push(0);
      let td = document.createElement("td");
      td.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        if (stopFlag) {
          return;
        }

        let parentTr = e.currentTarget.closest("tr");
        let parentTbody = e.currentTarget.closest("tbody");
        let col = Array.prototype.indexOf.call(
          parentTr.children,
          e.currentTarget
        );
        let row = Array.prototype.indexOf.call(parentTbody.children, parentTr);
        if (["", "x"].includes(e.currentTarget.textContent)) {
          e.currentTarget.textContent = "!";
        } else if (e.currentTarget.textContent === "!") {
          e.currentTarget.textContent = "?";
        } else if (e.currentTarget.textContent === "?") {
          if (dataset[row][col] === 0) {
            e.currentTarget.textContent = "";
          } else if (dataset[row][col] === "x") {
            e.currentTarget.textContent = "x";
          }
        }
      });
      td.addEventListener("click", (e) => {
        // 클릭했을 때
        if (stopFlag) {
          return;
        }
        if (["?", "!"].includes(e.currentTarget.textContent)) {
          return;
        }
        let parentTr = e.currentTarget.closest("tr");
        let parentTbody = e.currentTarget.closest("tbody");
        let col = Array.prototype.indexOf.call(
          parentTr.children,
          e.currentTarget
        );
        let row = Array.prototype.indexOf.call(parentTbody.children, parentTr);
        if (dataset[row][col] === 1) {
          // 이미 열린 칸일경우
          return;
        }

        openedCells += 1;
        e.currentTarget.classList.add("opened");

        if (dataset[row][col] === "x") {
          // 지뢰인경우
          e.currentTarget.textContent = "펑";
          document.querySelector("#result").textContent = "실패ㅜㅜ";
          stopFlag = true;
        } else {
          // 지뢰가 아닌경우 주변 지뢰개수 표시
          let arounds = [dataset[row][col - 1], dataset[row][col + 1]];
          if (dataset[row - 1]) {
            arounds = arounds.concat([
              dataset[row - 1][col - 1],
              dataset[row - 1][col],
              dataset[row - 1][col + 1],
            ]);
          }
          if (dataset[row + 1]) {
            arounds = arounds.concat([
              dataset[row + 1][col - 1],
              dataset[row + 1][col],
              dataset[row + 1][col + 1],
            ]);
          }
          let numOfMines = arounds.filter((v) => v === "x").length;
          // numOfMines 가 false인 값이면 ''를 쓰도록
          // 거짓인 값:  false, '' ,0, null, undefined, NaN
          e.currentTarget.textContent = numOfMines || "";
          dataset[row][col] = 1; // 한번 클릭된 칸은 1로 바꾸어 다시 클릭됨을 막기
          if (numOfMines === 0) {
            //주변 8칸 동시 오픈
            let aroundCells = [
              tbody.children[row].children[col - 1],
              tbody.children[row].children[col + 1],
            ];

            if (tbody.children[row - 1]) {
              aroundCells = aroundCells.concat([
                tbody.children[row - 1].children[col - 1],
                tbody.children[row - 1].children[col],
                tbody.children[row - 1].children[col + 1],
              ]);
            }
            if (tbody.children[row + 1]) {
              aroundCells = aroundCells.concat([
                tbody.children[row + 1].children[col - 1],
                tbody.children[row + 1].children[col],
                tbody.children[row + 1].children[col + 1],
              ]);
            }

            aroundCells
              .filter((v) => !!v) // 배열에서 null, undefined 제거
              .forEach((nextCell) => {
                let parentTr = nextCell.closest("tr");
                let parentTbody = nextCell.closest("tbody");
                let col = Array.prototype.indexOf.call(
                  parentTr.children,
                  nextCell
                );
                let row = Array.prototype.indexOf.call(
                  parentTbody.children,
                  parentTr
                );
                if (dataset[row][col] !== 1) {
                  nextCell.click();
                }
              });
          }
        }
        if (openedCells == hor * ver - mine) {
          stopFlag = true;
          document.querySelector("#result").textContent = "승리!";
        }
      });
      tr.append(td);
    }
    tbody.append(tr);
  }

  // 지뢰 심기
  for (let k = 0; k < shuffle.length; k++) {
    // 인덱스 유의
    let col = Math.floor(shuffle[k] / 10);
    let row = shuffle[k] % 10;
    tbody.children[col].children[row].textContent = "x";
    dataset[col][row] = "x";
  }
  console.table(dataset);
});
