//Started at 1342 10/21/21
//Lunch break at 1429 10/21/21
//Aaand we're back at 1452
//Nap time 1530
//Oops, is there a timestamp extension?

let todoItem = document.querySelector("input[name='todoItem']");
let todoLevel = document.querySelectorAll("input[name='todoLevel']");
let form_container = document.querySelector("#form_container");
let todoList = document.querySelector("#todo_body");
let todoContainer = document.querySelector("#todo_container");
let congrats = document.querySelector("#congrats");

let listData = [];

let checkInit = () => {
  if (JSON.parse(localStorage.listData).length > 0) {
    todoList.innerHTML = "";
    listData = [...JSON.parse(localStorage.listData)];
  }
};

if (localStorage.length) {
  checkInit();  
}

for (const item of listData) {
  const li = document.createElement("li");
  li.textContent = item.text;
  li.classList.value = item.classes;
  todoList.appendChild(li);
}

let checkList = () => {
  let refreshedList = document.querySelectorAll("#todo_body>li");
  let newList = [];
  for (const item of refreshedList) {
    newList.push({ text: item.textContent, classes: item.classList.value });
  }
  listData = newList;
  localStorage.setItem("listData", JSON.stringify(listData))
  if (refreshedList.length < 1 && !congrats.classList.value) { document.getElementById("congrats").classList.add("show") }
  else { congrats.classList.remove("show") };
};

let crossItem = (e) => {
  e.target.classList.toggle("strike");
  checkList()
};

todoContainer.addEventListener("click", (e) => {
  if (e.target.tagName == "LI") {
    crossItem(e);
  } else if (e.target.classList.contains("yeet")) {
    const doneList = document.querySelectorAll(".strike");
    for (const doneItem of doneList) {
      doneItem.remove();
    }
    checkList();
    console.log("YEET");
  }
});

form_container.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!todoItem.value.toString().trim()) {
    window.alert("Whoa! Please write something in the text input field!");
    return;
  }

  const newToDo = document.createElement("li");
  newToDo.textContent = todoItem.value.toString();

  for (const radio of todoLevel) {
    if (radio.checked) {
      newToDo.classList.toggle(radio.value);
    }
  }

  let infoArr = { text: newToDo.textContent, classes: newToDo.classList };
  listData.push(infoArr);
  todoList.appendChild(newToDo);
  checkList();

  todoItem.value = "";
});
