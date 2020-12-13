import { scrollEffect } from '../../';
import { showSuggestCar } from '../Detail/CarDetail';

export function initDetailUI() {
  scrollEffect();
  document
    .querySelector('.btn-suggest')
    ?.addEventListener('click', showSuggestCar);
}
