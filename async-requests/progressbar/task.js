const form = document.getElementById('form');
const progress = document.getElementById('progress');
const lable = document.querySelector('.input__wrapper-button');

function readyInHtml() {
  let card = document.querySelector('.card');
  let ready = document.createElement('div');
  ready.textContent = 'готово';
  ready.id = 'ready';
  card.insertAdjacentElement('afterbegin', ready);
}

function selectFile() {
  lable.addEventListener('click', (e) => {
    let ready = document.getElementById('ready')
    progress.value = '0.0';

    if (ready) {
      ready.remove();
    }
  })
}

form.addEventListener('submit', e => {
  e.preventDefault()

  let formData = new FormData(form);
  let xhr = new XMLHttpRequest();

  xhr.open('POST', form.action);
  xhr.setRequestHeader('Content-Type', 'image');

  xhr.upload.addEventListener('progress', e => {
    let progressValue = (e.loaded / e.total);
    progress.value = `${progressValue}`;
    if (progressValue === 1){
      readyInHtml();
    }
  });
  
  xhr.addEventListener('error', (e) => {
    console.error('Произошла ошибка при отправке данных на сервер');
  });
  xhr.send(formData);
})

selectFile()
