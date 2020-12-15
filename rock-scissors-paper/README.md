# 가위바위보 게임


컴퓨터와 가위바위보 하는 게임
<br>

[가위바위보 연승하러 가기](https://jiyeon2.github.io/webgame-js/rock-scissors-paper/)

<br>

- [ ] badge, combo와 관련된 변수와 함수 모아서 객체로 만들어보기
- [x] 연승 표시
- [x] 승, 패 표시
- [x] 내가 누른 버튼 표시
- [x] 버튼 눌렀을 때 플래그 변수 바꿔서 setInterval중복실행 방지

<br>

## 20201210
- 좋은 구조를 만들기 위해 코드를 중간중간 계속 바꿔나가자
- 객체를 배열로 변환 : ```Object.entries(Obj) => [[key,value], ...]```

- indexOf는 1차원배열, find/findIndex는 2차원배열에 주로 사용함
```javascript
Array.find((item) => return true)
//반복문 돌다가 return true인 아이템을 반환함
Array.findIndex((item) => return true)
//반복문 돌다가 return true인 아이템의 인덱스를 반환함
const found = Object.entries(options).findIndex((v) => {
  return v[0] === "rock";
});
```


## 20201211
- (a === x || b === x) 처럼 or 관계일 때 includes로 코드 줄일 수 있다


