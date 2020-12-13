import type { Car } from '../../../constrants/types';
import { Cars } from '../../../constrants/types';

import { getUniqueOption, scrollEffect } from '../../';
import { showCarList, showCart, addToCart } from './';

export function initHomeUI() {
  scrollEffect();
  addEventClick();
  initSelectOption(Cars);
}

function addEventClick() {
  showCarList();

  document.querySelector('.show-cart')?.addEventListener('click', showCart);
  document.querySelector('.btn-search')?.addEventListener('click', showCarList);

  document.querySelector('.close-cart')?.addEventListener('click', showCart);
  document
    .querySelector('#car-container')
    ?.addEventListener('click', addToCart);
}

function initSelectOption(Cars: Car[]) {
  const keys: (keyof Car)[] = ['brand', 'place', 'year'];

  for (let selectName of keys) {
    getUniqueOption(Cars, selectName).forEach((elem) => {
      const select = document.querySelector(
        `#${selectName}-select`,
      ) as HTMLSelectElement;
      const option = document.createElement('option');

      option.textContent = elem.toString().toUpperCase();
      select.append(option);
    });
  }
}
