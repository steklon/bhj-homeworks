const editor = document.getElementById('editor');

function clearInput(button) {
  button.addEventListener('click', (e) => {
    e.preventDefault();

    editor.textContent = '';
    localStorage.clear();
  })
}

function addButton() {
  button = document.createElement('button');
  button.id = 'btn';
  button.style = 'width: 300px; height: 30px';
  button.textContent = 'Очистить содержимое';

  editor.insertAdjacentElement('afterend', button);
  clearInput(button);
}

function checkingLocalStorage() {
  const cashedText = JSON.parse(localStorage.getItem('textContent'));
  text = '';

  if (cashedText) {
    text = cashedText
  }

  editor.textContent = text;
}

function addText() {
  editor.addEventListener('input', (e) => {
    localStorage.setItem('textContent', JSON.stringify(e.target.value));
    JSON.parse(localStorage.getItem('textContent'));
  })
}

document.addEventListener("DOMContentLoaded", () => {
  checkingLocalStorage();
  addButton();
  addText();
});