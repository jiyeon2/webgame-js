const body = document.body;

let numberCandidate;
let numList;
let trial;

function selectNum() {
  numberCandidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  numList = [];
  trial = 0;
  for (let i = 0; i < 4; i += 1) {
    const popedNum = numberCandidates.splice(
      Math.floor(Math.random() * numberCandidates.length),
      1
    )[0]; // splice는 배열 반환
    numList.push(popedNum);
  }

  console.log(numList);
}
selectNum();

const result = document.createElement("p");
result.classList.add("result");
result.textContent = "1스트라이크 1볼";
body.append(result);

const form = document.createElement("form");
const input = document.createElement("input");
input.type = "text";
input.maxLength = 4;
const button = document.createElement("button");
button.textContent = "입력";
form.append(input);
form.append(button);
body.append(form);

function async(e) {
  e.preventDefault();
  const answer = input.value;
  console.log(answer);

  if (answer == numList.join("")) {
    //답이 맞으면
    result.textContent = "홈런";
    input.value = "";
    input.focus();

    selectNum();
  } else {
    // 답이 틀리면
    trial += 1;
    if (trial > 3) {
      result.textContent = "10번 넘게 틀려서 실패! 답은 " + numList.join(", ");
      selectNum();
    } else {
      let answerList = answer.split("");
      let strike = 0;
      let ball = 0;
      for (let i = 0; i < 4; i += 1) {
        if (Number(answerList[i]) === numList[i]) {
          // 같은 자리인지 확인
          strike += 1;
        } else if (numList.indexOf(Number(answerList[i])) > -1) {
          // 같은 자리는 아니지만 숫자가 있는지 확인
          ball += 1;
        }
        result.textContent = `${strike} 스트라이크 ${ball} 볼`;
        input.value = "";
        input.focus();
      }
    }
  }
}

form.addEventListener("submit", async);
