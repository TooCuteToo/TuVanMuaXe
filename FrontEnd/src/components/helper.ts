import { UniqueCar, ClusterCar, KNNCar } from '../constrants/types';
import type { Car, SuggestCar } from '../constrants/types';

function getInputPrice(price: number) {
  if (price >= 1643 && price <= 86000) return 0;
  else if (price >= 86421 && price <= 250000) return 2;
  else if (price >= 254853 && price <= 470000) return 4;
  else if (price >= 479832 && price <= 1640000) return 1;

  return 3;
}

interface Option {
  brand: string;
  place: string;
  year: string;
}

interface ToaDo {
  age: number;
  outcome: number;
}

function getClusterCar(price: string | number, option?: Option) {
  const cluster = getInputPrice(+price);

  if (option) {
    const { brand, place, year } = option;
    return UniqueCar[cluster].filter((car) => {
      // const condition1 = car["brand"] === brand && car["palace"] == palace && car["color"] === color;
      const condition3 =
        car['brand'].toLowerCase() === brand &&
        car['place'].toLowerCase() === place &&
        car['year'] == +year;

      const condition2 =
        car['brand'].toLowerCase() === brand &&
        car['place'].toLowerCase() === place;

      if (condition3 || condition2) return true;
    });
  }

  return UniqueCar[cluster];
}

function getSuggestCar(outcome: number, age: number): SuggestCar {
  const KNNClusterCar = initKNNClusterCar(ClusterCar, outcome, age);
  const k = Math.round(KNNClusterCar.length / 2);
  const { id, name, brand, year, place, price, img } = doKNN(k, KNNClusterCar);

  const option = {
    style: 'currency',
    currency: 'USD',
  };

  return {
    id: id + '',
    name,
    brand,
    year: +year,
    place,
    price: new Intl.NumberFormat('en-US', option).format(price),
    img,
  };
}

function doKNN(k: number, KNNClusterCar: KNNCar[]) {
  let car: Car = KNNClusterCar[0];
  let max = 0;
  let minPrice = 99999999;

  for (let i = 0; i < k - 1; ++i) {
    let count = 0;

    for (let j = i + 1; j < k; ++j) {
      if (KNNClusterCar[i].name === KNNClusterCar[j].name) count++;
    }

    if (count > max && minPrice > KNNClusterCar[i].price) {
      max = count;
      car = KNNClusterCar[i];
      minPrice = KNNClusterCar[i].price;
    }
  }

  return car;
}

function initKNNClusterCar(
  clusterCar: ClusterCar,
  outcome: number,
  age: number,
) {
  const cluster = getInputPrice(outcome);
  const kNNClusterCar: KNNCar[] = [];

  for (let car of clusterCar[cluster]) {
    const obj = {
      ...car,
      distance: doEuclid(
        { age, outcome },
        { age: car.age, outcome: car.outcome },
      ),
    };

    kNNClusterCar.push(obj);
  }

  return kNNClusterCar.sort((a, b) => a.distance - b.distance);
}

function doEuclid(x: ToaDo, y: ToaDo) {
  const xAge = standardizedData(x.age, 20, 69);
  const yAge = standardizedData(y.age, 20, 69);

  const xOutcome = standardizedData(x.outcome, 1297, 843025);
  const yOutcome = standardizedData(y.outcome, 1297, 843025);

  const distance = Math.pow(xAge - yAge, 2) + Math.pow(xOutcome - yOutcome, 2);

  return Math.sqrt(distance);
}

function standardizedData(data: number, min: number, max: number) {
  const result = Math.abs((data - min) / (max - min));

  return Math.round(result * 10000) / 10000;
}

function getUniqueOption<K extends keyof Car>(cars: Car[], option: K) {
  const arr = cars.map((elem) => elem[option]);

  return [...new Set(arr)];
}

export { getClusterCar, getUniqueOption, getSuggestCar };
