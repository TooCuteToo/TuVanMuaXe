import type { SuggestCar } from '../../../constrants/types';
import { getSuggestCar } from '../../helper';

export function showSuggestCar(e: Event) {
  const price = document.querySelector('#price') as HTMLInputElement;
  const age = document.querySelector('#age') as HTMLInputElement;

  const carDetailContainer = document.querySelector(
    '.car-detail-container',
  ) as HTMLDivElement;

  const carImgContainer = document.querySelector(
    '.car-img-container',
  ) as HTMLDivElement;

  const car = getSuggestCar(+price.value, +age.value);

  carImgContainer.innerHTML = generateCarImg(car.img);
  carDetailContainer.innerHTML = generateCarInfo(car);
}

function generateCarImg(src: string) {
  return `
      <img
        src=${src}
        alt="img here"
      />
  `;
}

function generateCarInfo(car: SuggestCar) {
  const labels: (keyof typeof car)[] = [
    'id',
    'name',
    'brand',
    'year',
    'place',
    'price',
  ];

  return labels
    .map(
      (label) => `
      <div class="row">
      <div class="column">
        <p class="${label}-label">${label.toUpperCase()}:</p>
      </div>
      <div class="column">
        <p class="${label}-text">${car[label]}</p>
      </div>
    </div>
  `,
    )
    .join('');
}
