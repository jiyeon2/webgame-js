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