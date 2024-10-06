const input = document.getElementById("task__input");
const button = document.getElementById("tasks__add");
const tasks = document.getElementById("tasks");

function creatingHtmlTags(content) {
  let task = document.createElement("div");
  let taskTitle = document.createElement("div");
  let taskRemove = document.createElement("a");

  task.classList.add("task");
  taskTitle.classList.add("task__title");
  taskRemove.classList.add("task__remove");

  taskRemove.innerHTML = "&times;";
  taskRemove.href = "#";
  taskTitle.textContent = content;

  task.appendChild(taskTitle);
  task.appendChild(taskRemove);
  tasks.appendChild(task);
}

function checkingLocalStorage() {
  const savedContent = JSON.parse(localStorage.getItem('contentText'));
  let content = [];

  if (savedContent) {
    content = savedContent;
    for (let i = 0; i < savedContent.length; i++) {
      creatingHtmlTags(content[i]);
    }
  }

  localStorage.setItem('contentText', JSON.stringify(content));
  addTasks();
  deletingTasks();
}

function getContent() {
  let taskTitleList = [];
  let taskTitle = document.querySelectorAll(".task__title");

  for (let i = 0; i < taskTitle.length; i++) {
    taskTitleList.push(taskTitle[i].textContent);
  }

  return taskTitleList;
}

function deletingTasks() {
  let removeLinks = document.querySelectorAll(".task__remove");

  removeLinks.forEach((el) => {
    el.addEventListener("click", e => {
      el.parentElement.remove();
      localStorage.setItem('contentText', JSON.stringify(getContent()))
    })
  })
}

function addTasks() {
  button.addEventListener("click", e => {
    e.preventDefault();
    let content = getContent();
    
    if (input.value) {
      content.push(input.value.trim());
      localStorage.setItem('contentText', JSON.stringify(content));
      creatingHtmlTags(input.value.trim());
      input.value = '';
      }
    deletingTasks();
  })
}

document.addEventListener("DOMContentLoaded", () => {
  checkingLocalStorage();
});
