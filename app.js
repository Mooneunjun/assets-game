const today = new Date();
const year = today.getFullYear().toString().substr(-2);
const month = (today.getMonth() + 1).toString().padStart(2, "0");
const date = today.getDate().toString().padStart(2, "0");
const dateString = `${year}년${month}월${date}일`;

const titleEl = document.querySelector(".title");
const dateEl = document.createElement("span");
dateEl.textContent = dateString;
titleEl.insertBefore(dateEl, titleEl.children[1]);

const input = document.getElementById("input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("list");
const todoCount = document.querySelector(".Todo h2:nth-of-type(2)");

// 로컬 스토리지에 저장된 todo 리스트 불러오기
const savedList = JSON.parse(localStorage.getItem("todoList")) || [];

// 리스트 보여주기
function showList() {
  // 리스트 초기화
  list.innerHTML = "";
  // 저장된 리스트를 순회하며 리스트 아이템 생성
  savedList.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item.text;

    // 삭제 버튼 생성
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "";
    deleteBtn.dataset.index = index;
    deleteBtn.addEventListener("click", () => {
      savedList.splice(index, 1);
      localStorage.setItem("todoList", JSON.stringify(savedList));
      showList();
    });
    li.appendChild(deleteBtn);

    // 체크박스 생성
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.completed;
    checkbox.dataset.index = index;
    checkbox.addEventListener("click", () => {
      savedList[index].completed = checkbox.checked;
      localStorage.setItem("todoList", JSON.stringify(savedList));
      if (checkbox.checked) {
        li.classList.add("finish");
      } else {
        li.classList.remove("finish");
      }
    });
    const label = document.createElement("label");
    label.htmlFor = "checkbox";

    li.insertBefore(label, li.firstChild);
    li.insertBefore(checkbox, li.firstChild);

    if (item.completed) {
      li.classList.add("finish");
    }

    list.appendChild(li);
  });
  todoCount.textContent = savedList.length;
}

// 추가 버튼 클릭 시 todo 리스트 추가
addBtn.addEventListener("click", () => {
  const todo = {
    text: input.value,
    completed: false,
  };
  // 입력란이 비어있지 않을 경우 todo 리스트에 추가
  if (todo.text !== "") {
    savedList.push(todo);
    localStorage.setItem("todoList", JSON.stringify(savedList));
    showList();
    input.value = "";
  }
});

// 페이지 로드 시 리스트 보여주기
showList();
