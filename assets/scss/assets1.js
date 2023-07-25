// 获取所有需要的元素
const assetsCards = document.querySelectorAll(".assets-card");
const assets = document.querySelector(".assets");
const wallet = document.querySelector(".wallet");
const headerDate = document.querySelector(".header-date");
const headerClose = document.querySelector(".header-close");
const closebtn = document.querySelector(".close-button");

// 状态变量
let isAnimating = false;
let current = 0;
let start;
let target;
let progress;
let animationFrameId;
let isDropping = false;
let isClosing = true;

// 获取元素的offsetTop
function getOffsetTop(element) {
  let offsetTop = 0;

  while (element) {
    offsetTop += element.offsetTop;
    element = element.offsetParent;
  }

  return offsetTop;
}

// 动画函数
// 动画函数
// 动画函数
// 动画函数
function animationStep(timestamp) {
  if (!start) start = timestamp;
  progress = timestamp - start;

  // 如果没有在下降状态
  if (!isDropping) {
    current = Math.min(current + progress * 0.09, target);
    if (current === target) {
      start = null; // 重置start
      // 记录上升的最终位置
      let topPosition = target;
      // 开始下降

      isDropping = true;
      target = topPosition - 10; // 从上升的最终位置下降10px
      start = null; // 下降动画开始时，再次重置start
    }
  } else {
    current = Math.max(current - progress * 0.003, target);
    if (current === target) {
      isAnimating = false;
      isDropping = false;
    }
  }
  assets.style.transition = "none";
  assets.style.transform = `translateY(-${current}px)`;

  if (isAnimating) {
    animationFrameId = requestAnimationFrame(animationStep);
  }
}

// 开始动画的函数
function startAnimation(event) {
  if (isAnimating) return;
  if (!isClosing) return;

  isClosing = false;

  const clickedCard = event.currentTarget;

  let distanceToTop = getOffsetTop(clickedCard);

  isAnimating = true;
  current = 0;
  target = distanceToTop - 70;
  start = null;

  clickedCard.classList.add("active");
  assetsCards.forEach((card) => {
    if (card !== clickedCard) {
      card.style.transform = `translateY(1000px)`;
      card.style.opacity = "0";
      setTimeout(() => {
        card.style.transform = `translateY(0px)`;
        if (clickedCard == assetsCards[0]) {
          assetsCards[1].classList.add("hidden");
          assetsCards[2].classList.add("hidden");
        } else if (clickedCard == assetsCards[1]) {
          assetsCards[2].classList.add("hidden");
        }
      }, 300);
    }
  });

  wallet.style.opacity = "0";
  wallet.classList.add("disabled");
  headerDate.classList.add("hidden");
  headerClose.classList.remove("hidden");

  animationFrameId = requestAnimationFrame(animationStep);
}

// 结束动画的函数
function stopAnimation() {
  isClosing = true;
  isAnimating = false;
  isDropping = false;
  cancelAnimationFrame(animationFrameId);
  assets.style.transition = "";
  assets.style.transform = `translateY(-${0}px)`;

  assetsCards.forEach((card) => {
    setTimeout(() => {
      card.classList.remove("hidden");
    }, 300);
    setTimeout(() => {
      card.style.opacity = "1";
    }, 400);
    card.style.transform = "";
  });

  const activeCard = document.querySelector(".active");
  if (activeCard) activeCard.classList.remove("active");

  setTimeout(() => {
    wallet.style.opacity = "1";
  }, 300);
  wallet.classList.remove("disabled");

  headerDate.classList.toggle("hidden");
  headerClose.classList.toggle("hidden");
}

// 添加事件监听器
assetsCards.forEach((card) => {
  card.addEventListener("click", startAnimation);
});

headerClose.addEventListener("click", stopAnimation);
