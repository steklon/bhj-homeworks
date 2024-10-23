function setCookie(name_, value) {
  let date = new Date();
  date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));

  let expires = "expires=" + date.toUTCString();
  document.cookie = name_ + '=' + value + ';' + expires + ";path=/";
}

function getCookie(name_) {
  const pairs = document.cookie.split('; ');
  const cookiePopup = pairs.find(e => e.startsWith(name_ + '='));
  return cookiePopup;
}

function htmlTemplate() {
  return `
    <div class="modal modal_active" id="subscribe-modal">
      <div class="modal__content">
          <div class="modal__close modal__close_times">&times;</div>
          Подпишитесь на нашу рассылку пожалуйста!
      </div>
    </div>
  `
}

function addPopup() {
  const body = document.querySelector('body');
  body.insertAdjacentHTML('afterbegin', htmlTemplate());
}

function closePopup(name_, value) {
  const modal = document.getElementById('subscribe-modal');
  const modalClose = document.querySelector('.modal__close');
  modalClose.addEventListener('click', () => {
    modal.classList.remove('modal_active');
    setCookie(name_, value);
  })
}

document.addEventListener("DOMContentLoaded", () => {
  if (!getCookie('popupClose')) {
    addPopup();
    closePopup('popupClose', 'true');
  }
});