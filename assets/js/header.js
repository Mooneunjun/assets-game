// DOM 요소를 가져옵니다.
const header = document.querySelector(".header");

// 스크롤 이벤트를 추가합니다.
window.addEventListener("scroll", function () {
  // 스크롤 위치를 가져옵니다.
  const scrollY = window.scrollY;

  // 1픽셀 아래로 스크롤하면 "fixed" 클래스를 추가하고, 그렇지 않으면 제거합니다.
  if (scrollY > 1) {
    // header 스타일 box-shadow 입혀주기
    header.style.boxShadow = "0px 1px 17px 0px #00000017";

    header.classList.add("fixed");
  } else {
    header.style.boxShadow = "0px 1px 17px 0px #00000000";
  }
});
