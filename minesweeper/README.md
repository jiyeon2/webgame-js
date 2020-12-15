# 지뢰찾기


## 202012113
- 데이터(2차원 배열)와 화면(테이블)을 따로 작업 후, 둘을 일치시키는 작업해야함
- 데이터와 화면 일치시키는 것이 중요함 - 뷰, 앵귤러, 리액트 등 사용하면 편하다
- 혼자 코드 짤 때는 손으로 순서도(설계도) 그려보고 코딩하기
- 존재하지 않는 요소에는 이벤트리스너를 달 수 없다
- e.target / e.currentTarget 차이
    + e.currentTarget : 이벤트리스너를 직접 단 대상
    + e.target : 이벤트가 실제로 발생한 요소
    + e.target과 e.currentTarget은 다를 수 있다
- Array.prototype.indexOf.call(target, param) === target.indexOf(param)

- [ ] 첫번째 클릭에는 지뢰가 나오지 않도록 어떻게 만들까? (첫번째 클릭이 지뢰이면 지뢰가 아닌 다른 칸과 바꾸는 방법은 어떨까)


## 202012114
- 스코프 : 변수의 접근 가능한 범위
- 변수는 자신을 감싸고 있는 함수(자신이 선언된 곳) 밖에서는 사용할 수 없다(접근할 수 없다)
- var은 선언한 함수 내부에서만 유효함(함수 스코프)
```javascript
// 스코프 예제
var x = "global";

function ex() {
  var x = "local";
  x = "change";
}
ex(); // x를 바꾼다
console.log(x); // 여전히 global
```

- 스코프 간의 상하관계를 스코프체인 이라고 함
- 스코프 내에 변수나 함수가 없으면 스코프체인을 타고 올라가 부모 스코프에서 찾음
```javascript
// inner 위에 outer, outer 위에 전역으로 이어지는 스코프체인 형성되어 있다
var name = "zero";

function outer() {
  console.log("외부", name); // 외부 zero
  function inner() {
    var enemy = "nero"; // enemy는 inner함수 내에서만 존재
    console.log("내부", name); // 내부 zero
  }
  inner();
}

outer();
console.log(enemy); // undefined, enemy는 outer 함수 내부 inner 함수 내부에 있으므로 접근할 수 없음

```

- 렉시컬 스코프, 정적 스코프: 코드가 적힌 순간(선언된 순간?) 스코프가 정해짐. 이것을 렉시컬 스코프라함
    + 자바스크립트는 정적 스코핑 따름
```javascript
// 렉시컬 스코프, 정적 스코프
var name = "zero";
function log() {
  console.log(name);
}

function wrapper() {
  var name = "nero";
  log(); // zero
}
wrapper();
```

- 클로저 : 함수 & 함수가 접근할 수있는 스코프가 이루는 조합, 관계
```javascript

// for루프는 콜스택에서 실행되고,
// 콜스택이 비었을 때 이벤트큐에서 setTimeout에 전달되었던 콜백함수를 가져와서 실행한다.
// 이때 i는 이미 for루프가 종료되어 10이 된 상태임
for (var i = 0; i < 10; i += 1) {
  setTimeout(function () {
    console.log(i); // i는 렉시컬 스코프에 따라 for루프의 i를 가리킴
  }, i * 1000);
}

// javascript가 해석한 코드, for loop가 실행되는 과정
// setTimeout(function () {
//   console.log(i); //비동기 콜백함수 내의 변수는 '실행'될 때 해당 변수에 접근해서 가져온다
// }, 0 * 1000);

// setTimeout(function () {
//   console.log(i);
// }, 1 * 1000);

// //...
// setTimeout(function () {
//   console.log(i);
// }, 9 * 1000);
//--------------------------------------

// 클로저 특성을 사용하여 해결하기
for (var i = 0; i < 10; i += 1) {
  (function closure(j) {
    setTimeout(function () {
      console.log(j); // j는 인자로 들어온 j를 가리킴
    }, j * 1000);
  })(i); // 즉시실행함수
}

// 실행과정
// function closure(j) {
//   // 0
//   setTimeout(function () {
//     console.log(j); // 0
//   }, 0 * 1000);
// }
// closure(0);

// function closure(j) {
//   // 1
//   setTimeout(function () {
//     console.log(j); // 1
//   }, 1 * 1000);
// }
// closure(1);

// //...
// function closure(j) {
//   // 9
//   setTimeout(function () {
//     console.log(j); // 9
//   }, 9 * 1000);
// }
// closure(9);

```

- 재귀함수 : 지뢰개수가 0인경우 주변 8칸 오픈
    + 반복문을 함수로 표현하는 방법 - 재귀함수
```javascript
//재귀함수
function recur(num) {
  console.log(num);
  if (num < 5) {
    recur(num + 1);
  }
}
recur(1);
```


## 20201215
- 재귀함수를 사용할 때는 효율성 체크 필요
  + 이전 구조에서는 열려있는지 여부를 확인하지 않아 인접한 칸이 서로를 계속 클릭하게 됨
- 플래그 : 코드의 흐름을 좌우하는 변수