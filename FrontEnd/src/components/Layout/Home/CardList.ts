import type { Car } from '../../../constrants/types';
import { getClusterCar, getSuggestCar } from '../../helper';
import { createCard } from './';

function showCarList() {
  const price = document.querySelector('#price') as HTMLInputElement;
  const brand = document.querySelector('#brand-select') as HTMLSelectElement;

  const place = document.querySelector('#place-select') as HTMLSelectElement;
  const year = document.querySelector('#year-select') as HTMLSelectElement;

  let Cars: Car[] = getClusterCar(
    Math.floor(Math.random() * (900000 - 1200) + 1500),
  );

  if (price.value) {
    Cars = getClusterCar(price.value, {
      brand: brand.value.toLowerCase(),
      place: place.value.toLowerCase(),
      year: year.value.toLowerCase(),
    });

    createCarList(15, Cars);

    return;
  }

  createCarList(41, Cars);
}

async function createCarList(length: number, Cars: Car[]) {
  const div = document.querySelector('#car-container') as HTMLDivElement;

  if (Cars.length === 0) {
    div.innerHTML = `<p class="message">Không tìm thấy dữ liệu phù hợp</p>`;
    return;
  }

  div.innerHTML = Cars?.map((car, index) => {
    if (index < length - 1) return createCard(car);
  }).join('')!;
}

export { showCarList };
