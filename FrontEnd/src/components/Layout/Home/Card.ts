import type { Car } from '../../../constrants/types';

export function createCard(item: Car) {
  const { brand, price, id, img } = item;
  const option = {
    style: 'currency',
    currency: 'USD',
  };
  return `
    <article class="car">
      <div class="car-img">
        <img src="${img}" />
        <button class="add-btn" data-id="${id}" data-price="${price}" data-brand="${brand}">add to cart</button>
      </div>
      <div class="car-detail">
        <h3 class="title">${brand.toUpperCase()}</h3>
        <h3 class="price">${new Intl.NumberFormat('en-US', option).format(
          price,
        )}</h3>
      </div>
    </article>
  `;
}
