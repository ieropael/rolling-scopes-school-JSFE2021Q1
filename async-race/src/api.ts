export default class Api {
  static base = 'http://127.0.0.1:3000';

  static garage = `${Api.base}/garage`;

  static engine = `${Api.base}/engine`;

  static winners = `${Api.base}/winners`;

  static async getCars(page: number, limit = 7): Promise<{ items: Record<string, string | number>[]; count: string | null; }> {
    const response = await fetch(`${Api.garage}?_page=${page}&_limit=${limit}`);

    return {
      items: await response.json(),
      count: response.headers.get('X-Total-Count'),
    };
  }

  static async getCar(id: number): Promise<unknown> {
    return (await fetch(`${Api.garage}/${id}`)).json();
  }

  static async createCar(body: unknown): Promise<void> {
    (await fetch(Api.garage, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })).json();
  }

  static async deleteCar(id: number): Promise<unknown> {
    return (await fetch(`${Api.garage}/${id}`, { method: 'DELETE' })).json();
  }

  static async updateCar(id: number, body: unknown): Promise<unknown> {
    return (await fetch(`${Api.garage}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })).json();
  }

  static async startEngine(id: number): Promise<void> {
    (await fetch(`${Api.engine}?id=${id}&status=started`)).json();
  }

  static async stopEngine(id: number): Promise<void> {
    (await fetch(`${Api.engine}?id=${id}&status=stopped`)).json();
  }

  static async drive(id: number): Promise<unknown> {
    const res = await fetch(`${Api.engine}?id=${id}&status=drive`).catch();
    return res.status !== 200 ? { success: false } : { ...(await res.json()) };
  }

  static getSortOrder(sort: unknown, order: unknown): string {
    if (sort && order) return `&_sort=${sort}&_order=${order}`;
    return '';
  }

  static async getWinners({
    page, limit = 10, sort, order,
  }: Record<string, unknown>): Promise<{
      items: [unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown];
      count: string | null;
    }> {
    const response = await fetch(`${Api.winners}?_page=${page}&_limit=${limit}${Api.getSortOrder(sort, order)}`);
    const items = await response.json();

    return {
      items: await Promise.all(items.map(async (winner: Record<string, number>) => ({
        ...winner, car: await Api.getCar(winner.id),
      }))),
      count: response.headers.get('X-Total-Count'),
    };
  }

  static async getWinner(id: number): Promise<Record<string, number>> {
    return (await fetch(`${Api.winners}/${id}`)).json();
  }

  static async getWinnerStatus(id: number): Promise<number> {
    return (await fetch(`${Api.winners}/${id}`)).status;
  }

  static async deleteWinner(id: number): Promise<unknown> {
    return (await fetch(`${Api.winners}/${id}`, { method: 'DELETE' })).json();
  }

  static async createWinner(body: unknown): Promise<unknown> {
    return (await fetch(Api.winners, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })).json();
  }

  static async updateWinner(id: number, body: unknown): Promise<unknown> {
    return (await fetch(`${Api.winners}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })).json();
  }

  static async saveWinner({ id, time }: Record<string, number>): Promise<void> {
    const winnerStatus = await Api.getWinnerStatus(id);

    if (winnerStatus === 404) {
      await Api.createWinner({
        id,
        wins: 1,
        time,
      });
    } else {
      const winner = await Api.getWinner(id);
      await Api.updateWinner(id, {
        id,
        wins: winner.wins + 1,
        time: time < winner.time ? time : winner.time,
      });
    }
  }
}
