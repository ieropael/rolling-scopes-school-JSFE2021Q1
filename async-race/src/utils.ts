import Store from './store';

export default class Utils {
  static getPositionAtCenter(element: HTMLElement): { x: number, y: number } {
    const {
      top, left, width, height,
    } = element.getBoundingClientRect();
    return {
      x: left + width / 2,
      y: top + height / 2,
    };
  }

  static getDistanceBetweenElements(a: HTMLElement, b: HTMLElement): number {
    const aPositon = Utils.getPositionAtCenter(a);
    const bPositon = Utils.getPositionAtCenter(b);

    return Math.hypot(aPositon.x - bPositon.x, aPositon.y - bPositon.y);
  }

  static animation(car: HTMLElement, distance: number, animationTime: number): { id: number } {
    let start: number | null = null;
    const state = {
      id: 0,
    };

    function step(timestamp: number) {
      if (!start) start = timestamp;
      const time = timestamp - start;
      const passed = Math.round(time * (distance / animationTime));

      car.style.transform = `translateX(${Math.min(passed, distance)}px)`;

      if (passed < distance) {
        state.id = window.requestAnimationFrame(step);
      }
    }

    state.id = window.requestAnimationFrame(step);

    return state;
  }

  static async raceAll(promises: Record<string, boolean | number>, ids: []): Promise<unknown> {
    const { success, id, time } = await Promise.race(promises);

    if (!success) {
      const failedIndex = ids.findIndex((i: number) => i === id);
      const restPromises = [...promises.slice(0, failedIndex), ...promises.slice(failedIndex + 1, promises.length)];
      const resIds = [...ids.slice(0, failedIndex), ...ids.slice(failedIndex + 1, ids.length)];
      return Utils.raceAll(restPromises, resIds);
    }

    return { ...Store.store.cars.find((car) => car.id === id), time: +(time / 1000).toFixed(2) };
  }

  static async race(action: (id: string | number) => (success: boolean, id: number, time: number) => unknown) {
    const promises = Store.store.cars.map(({ id }: Record<string, string | number>) => action(id));

    const winner = await Utils.raceAll(promises, Store.store.cars.map((car: Record<string, string | number>) => car.id));

    return winner;
  }

  static models = ['Tesla', 'Mersedes', 'BMW', 'Toyota', 'Zhiguli', 'Moskvich', 'Opel', 'Aston Martin', 'Porsche'];

  static names = ['Model S', 'CLK', '7', 'Camry', 'Combi', '9', 'Corsa', 'DB9', 'Cayene'];

  static getRandomName(): string {
    const model = Utils.models[Math.floor(Math.random() * Utils.models.length)];
    const name = Utils.names[Math.floor(Math.random() * Utils.models.length)];
    return `${model} ${name}`;
  }

  static getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  static generateRandomCars(count = 100): { name: string, color: string }[] {
    return new Array(count).fill(1).map((_) => ({ name: Utils.getRandomName(), color: Utils.getRandomColor() }));
  }
}
