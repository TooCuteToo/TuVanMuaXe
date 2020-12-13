function showCart(e: Event) {
  const cartContainer = document.querySelector(
    '.cart-container',
  ) as HTMLDivElement;
  const cartDOM = document.querySelector('.cart') as HTMLDivElement;

  cartContainer.classList.toggle('transparentBG');
  cartDOM.classList.toggle('showCart');
}

function addCarToCart(
  brand: string,
  price: number,
  code: string,
  img: HTMLImageElement,
) {
  const cartItem = document.createElement('div');
  const cartContainer = document.querySelector(
    '#cart-items-container',
  ) as HTMLDivElement;

  cartItem.classList.add('cart-items');

  let item = `
    <img src="${img.src}">
    <div class="item-detail">
      <p class="title">${brand}</p>
      <p class="price">$${price.toFixed(2)}</p>
      <p class="remove-btn" data-id="${code}">remove</p>
    </div>
    <div class="item-btn">
      <i class="fas fa-chevron-up" data-id="${code}"></i>
      <p class="item-amount">0</p>
      <i class="fas fa-chevron-down" data-id="${code}"></i>
    </div>
  `;

  cartItem.innerHTML = item;
  cartContainer.appendChild(cartItem);
}

function addToCart(e: Event) {
  const target = e.target as HTMLButtonElement;

  if (!target.classList.contains('add-btn')) return;

  const text = target.innerText;

  target.disabled = text == 'in cart' ? true : false;
  target.innerText = text == 'in cart' ? 'add to cart' : 'in cart';

  const brand = target.dataset.brand!;
  const price = +target.dataset.price!;
  const code = target.dataset.id!;
  const image = target.previousElementSibling as HTMLImageElement;

  addCarToCart(brand, price, code, image);
}

export { showCart, addToCart };
