// 모든 assets-card 요소를 선택합니다.
const assetsCards = document.querySelectorAll(".assets-card");
const assetsBox = document.querySelector(".assets-box");
const wallet = document.querySelector(".wallet");
const headerDate = document.querySelector(".header-date");
const headerClose = document.querySelector(".header-close");
const closebtn = document.querySelector(".close-button");

// 애니메이션 실행 여부를 확인하는 플래그
let isAnimating = false;

// 클릭한 카드를 활성화하고 다른 카드를 숨기는 함수
function toggleCards(event) {
  // 만약 애니메이션 중이라면 함수를 종료
  if (isAnimating) return;

  // 애니메이션을 시작하므로 플래그를 true로 설정
  isAnimating = true;

  const clickedCard = event.currentTarget;
  assetsCards.forEach((card) => {
    if (card !== clickedCard) {
      card.classList.add("slide-down");
      card.style.opacity = "0";
      setTimeout(() => {
        card.classList.add("hidden");
        card.classList.remove("slide-down");
        // 애니메이션이 끝났으므로 플래그를 false로 설정
        isAnimating = false;
      }, 500);
    }
  });

  // 클릭한 카드의 위치와 스타일을 변경
  assetsBox.style.marginTop = "20px";
  clickedCard.style.marginTop = "0px";
  clickedCard.classList.add("active");

  windowWidth = window.innerWidth; // 실시간으로 창의 너비를 갱신합니다.
  if (windowWidth <= 769) {
    // 화면의 너비가 769px 이하일 때 원하는 동작을 추가
    if (clickedCard === assetsCards[0]) {
      clickedCard.classList.add("slide-up");
    } else if (clickedCard === assetsCards[1]) {
      clickedCard.classList.add("slide-up1");
    } else if (clickedCard === assetsCards[2]) {
      clickedCard.classList.add("slide-up2");
    }
  } else {
    // 화면의 너비가 769px 초과일 때 원래 동작
    // 화면의 너비가 769px 이하일 때 원하는 동작을 추가
    if (clickedCard === assetsCards[0]) {
      clickedCard.classList.add("slide-up4");
    } else if (clickedCard === assetsCards[1]) {
      clickedCard.classList.add("slide-up4");
      setTimeout(() => {
        assetsBox.style.flexDirection = "row-reverse";
      }, 500);
    } else if (clickedCard === assetsCards[2]) {
      clickedCard.classList.add("slide-up3");
    }
  }

  // 카드 위치에 따라 해당 클래스 추가

  // 일정 시간 후 슬라이드 업 클래스 제거
  setTimeout(() => {
    clickedCard.classList.remove("slide-up");
    clickedCard.classList.remove("slide-up1");
    clickedCard.classList.remove("slide-up2");
    clickedCard.classList.remove("slide-up3");
    clickedCard.classList.remove("slide-up4");
  }, 500);

  // 다른 요소들의 투명도 조절 및 클래스 변경
  wallet.style.opacity = "0";
  headerDate.classList.add("hidden");
  headerClose.classList.remove("hidden");

  setTimeout(() => {
    wallet.classList.add("hidden");
  }, 500);
}

// 각 카드에 클릭 이벤트 리스너 추가
assetsCards.forEach((card) => {
  card.addEventListener("click", toggleCards);
});

// 클릭하여 카드와 관련 요소들의 상태를 전환하는 함수
function toggleElements() {
  // 만약 애니메이션 중이라면 함수를 종료
  if (isAnimating) return;

  // 애니메이션을 시작하므로 플래그를 true로 설정
  isAnimating = true;

  const activeCard = document.querySelector(".active");

  activeCard.classList.add("slide-down1");

  assetsCards.forEach((card) => {
    card.classList.remove("hidden");
    assetsBox.style.flexDirection = "";
    setTimeout(() => {
      activeCard.classList.remove("active");
      activeCard.classList.remove("slide-down1");
      // 애니메이션이 끝났으므로 플래그를 false로 설정
      isAnimating = false;
    }, 500);

    setTimeout(() => {
      card.style.opacity = "1";
    }, 300);

    card.style.marginTop = "";
  });

  // 관련 요소들의 클래스 변경
  wallet.classList.toggle("hidden");
  headerDate.classList.toggle("hidden");
  headerClose.classList.toggle("hidden");
  assetsBox.style.marginTop = "";

  setTimeout(() => {
    wallet.style.opacity = "1";
  }, 300);
}

// 닫기 버튼에 클릭 이벤트 리스너 추가
headerClose.addEventListener("click", toggleElements);
