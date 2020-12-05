# 숫자야구게임

임의의 4자리 숫자를 맞추는 게임

규칙
- 10번의 기회 안에 숫자 맞추기
- 정답 숫자에 있는 숫자의 정확한 위치를 맞추면 스트라이크(S)
- 위치는 다르지만 포함된 숫자를 맞추면 볼(B)
> 주어진 숫자가 '1234'이고 내가 입력한 숫자가 '1468'인 경우 : 1의 위치가 같으므로 1스트라이크. 4는 주어진 숫자에 포함되어 있지만 위치가 다르므로 1볼.
> 주어진 숫자가 '1234'이고 내가 입력한 숫자가 '2134'인 경우 : 3,4의 위치가 같으므로 2스트라이크. 2,1은 주어진 숫자에 포함되어 있으나 위치가 다르므로 2볼.

참고한 코드
- 인프런에 있는 [웹 게임을 만들며 배우는 자바스크립트](https://www.inflearn.com/course/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EA%B2%8C%EC%9E%84-%EA%B0%9C%EB%B0%9C#description) 강의 중 숫자야구 강의
- [Writing a Simple MVC (Model, View, Controller) App in Vanilla Javascript](https://hackernoon.com/writing-a-simple-mvc-model-view-controller-app-in-vanilla-javascript-u65i34lx)를 보고 MVC 패턴을 따라해봄


기능
- 숫자버튼 클릭으로도 숫자 입력 가능
- 이전에 입력한 숫자 기록 표시
- 남은 횟수 표시


수정, 추가할 사항
- input창에 중복된 숫자 입력, 숫자가 아닌 문자 입력 방지하기
- input창에서 여러개의 숫자를 지웠을 때, 해당되는 모든 버튼 disabled 해제하기
- 게임 재시작 버튼 추가하기
- 숫자 지우기 버튼 추가하기

- 화면 너비가 좁으면 기록테이블을 아래로 옮기기
- 마지막 기록 하이라이트 표시하기
- 승리, 패배시 이미지나 애니메이션 표시하기

배운점
- MVC패턴 코드 구조를 따라 써보면서 모델과 뷰가 컨트롤러를 통해 어떻게 연결되는지 간략히 이해하였다. 
MVC패턴 예제 코드에서 보면 Event라는 클래스를 만든다. 이 클래스는 listener(콜백함수) 배열을 가지고 있고, 메서드로 listener를 추가하거나(addListener), param을 전달받아 listener를 실행(trigger)시킬 수 있다.





