const animation = document.getElementById("loader");
const items = document.getElementById("items");
 
function htmlTemplate(charCode, currencyPrice) {
  return `
    <div class="item">
      <div class="item__code">${charCode}</div>
      <div class="item__value">${currencyPrice}</div>
      <div class="item__currency">руб.</div>
    </div>
  `
}

function addExchangeRateToPage(cashedData) {
  let item = document.querySelectorAll(".item");
  animation.classList.remove("loader_active");

  item.forEach(e => e.remove())
  cashedData.forEach(data => {
    let { charCode, currencyPrice } = data;
    items.insertAdjacentHTML("beforeend", htmlTemplate(charCode, currencyPrice));
  });
}

function getExchangeRate() {
  fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses')
    .then(response => {
      return response.json();
    })
    .then(data => {
      let dataList = [];

      for (let key in data.response.Valute) {
        charCode = data.response.Valute[key].CharCode;
        currencyPrice = data.response.Valute[key].Value;
        dataList.push({
          charCode: charCode,
          currencyPrice: currencyPrice
        })
      }

      localStorage.setItem('cashedData', JSON.stringify(dataList));
      let cashedData = JSON.parse(localStorage.getItem('cashedData'));
      addExchangeRateToPage(cashedData);
    })
    .catch(err => {
      console.log(err);
      errorInfo = '<p>Что то пошло не так </p>';
      animation.classList.remove("loader_active");
      items.insertAdjacentHTML("beforeend", errorInfo);
    })
}

function checkingLocalStorage() {
  let cashedData = JSON.parse(localStorage.getItem('cashedData'));
  let dataList = [];

  if (cashedData) {
    dataList = cashedData;
    addExchangeRateToPage(dataList);
    if (!dataList.length) {
      animation.classList.add("loader_active");
    }
  }

  localStorage.setItem('cashedData', JSON.stringify(dataList));
  getExchangeRate();
}

document.addEventListener("DOMContentLoaded", () => {
  checkingLocalStorage();
});