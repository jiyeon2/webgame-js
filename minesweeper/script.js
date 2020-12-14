let tbody = document.querySelector("#table tbody");

let dataset = [];

document.querySelector("#exec").addEventListener("click", () => {
  tbody.innerHTML = "";
  dataset = [];

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
      arr.push(1);
      let td = document.createElement("td");
      td.addEventListener("contextmenu", (e) => {
        e.preventDefault();
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
          if (dataset[row][col] === 1) {
            e.currentTarget.textContent = "";
          } else if (dataset[row][col] === "x") {
            e.currentTarget.textContent = "x";
          }
        }
      });
      td.addEventListener("click", (e) => {
        e.currentTarget.classList.add("opened");
        // 클릭 시 주변 지뢰개수
        let parentTr = e.currentTarget.closest("tr");
        let parentTbody = e.currentTarget.closest("tbody");
        let col = Array.prototype.indexOf.call(
          parentTr.children,
          e.currentTarget
        );
        let row = Array.prototype.indexOf.call(parentTbody.children, parentTr);
        if (dataset[row][col] === "x") {
          // 지뢰인경우
          e.currentTarget.textContent = "펑";
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
          e.currentTarget.textContent = numOfMines;
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
            console.log(aroundCells);
            console.log(aroundCells.filter((v) => !!v));
            aroundCells
              .filter(function (v) {
                return !!v;
              })
              .forEach(function (nextCell) {
                nextCell.click();
              });
            // aroundCells
            //   .filter((v) => !!v) // 배열에서 null, undefined 제거
            //   .forEach((nextCell) => nextCell.click());
          }
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
