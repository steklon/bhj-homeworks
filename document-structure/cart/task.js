const cartWrapper = document.querySelector('.cart');
const cartContainer = document.querySelector('.cart__products');
const productsContainer = document.querySelector('.products');

function changeQuantity(element, action) {
  const quantityValue = element
    .closest('.product__quantity-controls')
    .querySelector('.product__quantity-value');
  if (action === 'inc') {
    quantityValue.textContent = Number(quantityValue.textContent) + 1;
  } else {
    if (Number(quantityValue.textContent) === 1) {
      return;
    }
    quantityValue.textContent = Number(quantityValue.textContent) - 1;
  }
}

function addProductInCart(element) {
  const id = Number(element.closest('.product').dataset.id);
  const imgURL = element
    .closest('.product')
    .querySelector('.product__image')
    .getAttribute('src');
  const productCount = Number(element
    .previousElementSibling.querySelector('.product__quantity-value')
    .textContent);
  const findProduct = getProductsFromLocalStorage().find((product) => id === product.id);
  if (findProduct) {
    const cartElement = document
      .querySelector(`.cart__product[data-id="${findProduct.id}"]`)
      .querySelector('.cart__product-count');
    cartElement.textContent = Number(cartElement.textContent) + productCount;
    setProductsFromLocalStorage(id, imgURL, Number(cartElement.textContent));
    element.closest('.product').querySelector('.product__quantity-value').textContent = 1;
    return;
  }
  setProductsFromLocalStorage(id, imgURL, productCount);
  cartWrapper.classList.remove('cart__hidden');
  const template = templateProduct(id, imgURL, productCount);
  cartContainer.insertAdjacentHTML('beforeend', template);

  element.closest('.product').querySelector('.product__quantity-value').textContent = 1;
}

function templateProduct(id, imgURL, productCount) {
  return `
    <div class="cart__product" data-id="${id}">
      <img class="cart__product-image" src="${imgURL}" alt="Cart picture">
      <div class="cart__product-count">${productCount}</div>
      <div class="product__remove">&times;</div>
    </div>
  `;
}

function loadProductsFromLocalStorage() {
  cartContainer.innerHTML = '';
  const cart = getProductsFromLocalStorage();
  if (!cart) {
    localStorage.setItem('cart', JSON.stringify([]));
    cartWrapper.classList.add('cart__hidden');
  } else {
    cart.forEach((product) => {
      const { id, imgURL, productCount } = product;
      const template = templateProduct(id, imgURL, productCount);
      cartContainer.insertAdjacentHTML('beforeend', template);
      cartWrapper.classList.remove('cart__hidden');
    });
  }
}

function getProductsFromLocalStorage() {
  return JSON.parse(localStorage.getItem('cart'));
}

function setProductsFromLocalStorage(id, imgURL, productCount) {
  const currentProduct = {
    id,
    imgURL,
    productCount,
  };
  const products = getProductsFromLocalStorage();
  localStorage.removeItem('cart');
  const newProducts = products.filter((product) => product.id !== currentProduct.id);
  newProducts.push(currentProduct);
  localStorage.setItem('cart', JSON.stringify(newProducts));
}

function delTaskFromLocalStorage(currentProduct) {
  const { id } = currentProduct.closest('.cart__product').dataset;
  const cart = getProductsFromLocalStorage();
  const newProducts = cart.filter((product) => product.id !== Number(id));
  localStorage.setItem('cart', JSON.stringify(newProducts));
}

document.addEventListener('DOMContentLoaded', () => loadProductsFromLocalStorage());
productsContainer.addEventListener('click', (e) => {
  const currentElement = e.target;
  if (currentElement.classList.contains('product__quantity-control_inc')) {
    changeQuantity(currentElement, 'inc');
  }
  if (currentElement.classList.contains('product__quantity-control_dec')) {
    changeQuantity(currentElement, 'dec');
  }
  if (currentElement.classList.contains('product__add')) {
    addProductInCart(currentElement);
  }
});

cartContainer.addEventListener('click', (e) => {
  const currentElement = e.target;
  if (!currentElement.classList.contains('product__remove')) {
    return;
  }
  delTaskFromLocalStorage(currentElement);
  loadProductsFromLocalStorage();
});
