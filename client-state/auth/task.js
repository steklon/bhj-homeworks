const form = document.getElementById('signin__form');
const signin = document.getElementById('signin');
const welcome = document.getElementById('welcome');

function createButtonLogout(button) {
  button.style = 'width:70px; height: 30px; margin-left: 50px;';
  button.textContent = 'выйти';
  button.id = 'btn';
  welcome.insertAdjacentElement('beforeend', button);
}

function logout() {
  const button = document.createElement('button');
  createButtonLogout(button);

  button.addEventListener('click', e => {
    e.preventDefault();

    localStorage.removeItem("user_id");
    welcome.classList.remove('welcome_active');
    signin.classList.add('signin_active');
    button.remove();

  })
}

function insertGreeting(user_id) {
  signin.classList.remove('signin_active');
  welcome.classList.add('welcome_active');
  welcome.querySelector('#user_id').textContent = user_id;
  logout();
}

function authorizationCheck(data) {
  if (data.success) {
    localStorage.setItem('user_id', data.user_id);
    insertGreeting(data.user_id);
  } else {
    alert('Неверный логин/пароль');
  }
  form.reset();
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: formData
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      alert(`ошибка: ${res.status}`);
      form.reset();
    }
  })
  .then(data => authorizationCheck(data))
  .catch(err => alert(`ошибка: ${err}`));


})

function checkingLocalStorage() {
  const cashedUser = JSON.parse(localStorage.getItem('user_id'));

  if (cashedUser) {
    insertGreeting(cashedUser);
  } else {
    signin.classList.add('signin_active');
  }
}

document.addEventListener("DOMContentLoaded", () => {
  signin.classList.remove('signin_active');
  checkingLocalStorage();
});