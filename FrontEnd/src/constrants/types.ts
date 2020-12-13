import Cars from '../models/CarArray.json';

type Car = typeof Cars[0];
type KNNCar = typeof Cars[0] & { distance: number };

interface ClusterCar {
  [id: string]: Car[];
}

interface SuggestCar {
  id: string;
  name: string;
  brand: string;
  year: number;
  place: string;
  price: string;
  img: string;
}

const ClusterCar: ClusterCar = {};
const UniqueCar: ClusterCar = {};

(() => {
  setClusterCar(Cars);
  setUniqueCars(Cars);
})();

function setClusterCar(Cars: Car[]) {
  for (let i = 0; i < 5; ++i) {
    ClusterCar[i] = Cars.filter((car) => car['Cluster'] === i).sort(
      (a, b) => a.price - b.price,
    );
  }
}

function setUniqueCars(Cars: Car[]) {
  const CarName = new Map();

  for (let i = 0; i < 5; ++i) {
    UniqueCar[i] = Cars.filter((car) => {
      if (!CarName.has(car.name) && car['Cluster'] === i) {
        CarName.set(car.name, car.name);

        return true;
      }
    }).sort((a, b) => a.price - b.price);
  }
}

export type { Car, SuggestCar, KNNCar };

export { Cars, ClusterCar, UniqueCar };
