import Api from './api';

const { items: cars, count: carsCount } = await Api.getCars(1);
const { items: winners, count: winnersCount } = await Api.getWinners({ page: 1 });

export default class Store {
  static store = {
    carsPage: 1,
    cars,
    carsCount,
    winnersPage: 1,
    winners,
    winnersCount,
    animation: {},
    view: 'garage',
    sortBy: null,
    sortOrder: null,
  };
}
