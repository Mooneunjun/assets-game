// 获取所有需要的元素
const assetsCards = document.querySelectorAll(".assets-card");
const assets = document.querySelector(".assets");
const wallet = document.querySelector(".wallet");
const headerDate = document.querySelector(".header-date");
const headerClose = document.querySelector(".header-close");

// 状态变量
let isAnimating = false;
let current = 0;
let start;
let target;
let progress;
let animationFrameId;
let isDropping = false;
let isClosing = true;
let topPosition; // 将这个变量移动到这里使其在整个函数中都可用

// 动画持续时间
let riseDuration = 400; // 上升阶段的持续时间，例如1秒，你可以按照自己的需要调整
let dropDuration = 300; // 下降阶段的持续时间，例如0.5秒，你可以按照自己的需要调整

// 动画函数
function easeInOut(p) {
  return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
}

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
function animationStep(timestamp) {
  if (!start) start = timestamp;
  let runtime = timestamp - start; // 计算运行时间

  if (!isDropping) {
    progress = runtime / riseDuration;
    current = easeInOut(progress) * target;
    if (progress >= 1) {
      start = performance.now();
      topPosition = current; // 记录上升的最终位置
      isDropping = true;
      target = 15; // 准备下降10px
    }
  } else {
    progress = runtime / dropDuration;
    // 下降过程，通过调整运行时间的系数可以改变下降的速度，这里是0.2
    current = topPosition - easeInOut(progress) * target;
    if (progress >= 1) {
      // 在下降完成后结束动画
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
  start = performance.now();

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
      isClosing = true;
    }, 400);
    card.style.transform = "";
  });

  const activeCard = document.querySelector(".active");
  if (activeCard) activeCard.classList.remove("active");

  setTimeout(() => {
    wallet.style.opacity = "1";
  }, 300);
  wallet.classList.remove("disabled");

  headerDate.classList.remove("hidden");
  headerClose.classList.add("hidden");
}

// 添加事件监听器
assetsCards.forEach((card) => {
  card.addEventListener("click", startAnimation);
});

headerClose.addEventListener("click", stopAnimation);
