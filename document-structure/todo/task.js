const input = document.getElementById("task__input");
const button = document.getElementById("tasks__add");
const tasksList = document.getElementById("tasks__list");

function creatingHtmlTags(title) {
  return `
    <div class="task">
      <div class="task__title">${title}</div>
      <a href="#" class="task__remove">&times;</a>
    </div>
  `
}

function checkingLocalStorage() {
  const savedContent = JSON.parse(localStorage.getItem('contentText'));
  let content = [];

  if (savedContent) {
    content = savedContent;
    for (let i = 0; i < savedContent.length; i++) {
      tasksList.insertAdjacentHTML('afterbegin', creatingHtmlTags(content[i]));
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
    el.addEventListener("click", () => {
      el.parentElement.remove();
      localStorage.setItem('contentText', JSON.stringify(getContent()))
    })
  })
}

function addTasks() {
  button.addEventListener("click", e => {
    e.preventDefault();
    let content = getContent();
    let text = input.value.trim();
    
    if (!text) {
      return;
    }

    content.push(text);
    localStorage.setItem('contentText', JSON.stringify(content));
    tasksList.insertAdjacentHTML('afterbegin', creatingHtmlTags(text));
    input.value = '';
    deletingTasks();
  })
}

document.addEventListener("DOMContentLoaded", () => {
  checkingLocalStorage();
});
