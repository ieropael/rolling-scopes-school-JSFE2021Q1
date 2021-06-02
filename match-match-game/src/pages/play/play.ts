import { Game } from '../../components/game/game';
import { ImageCategoryModel } from '../../models/image-category-model';

export class Play {
  private readonly game: Game;

  constructor(private readonly rootElement: HTMLElement) {
    this.game = new Game();
    this.game.element.id = 'current-page';
    this.rootElement.appendChild(this.game.element);
  }

  async start(): Promise<void> {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const test = localStorage.getItem('difficulty');
    let category: ImageCategoryModel | undefined = categories[0];
    if (test) {
      category = categories.find((el) => (el.category === test && el.difficulty === '1'));
    }
    const images: string[] | undefined = category?.images.map((name) => `${category?.category}/${name}`);
    if (images) {
      this.game.newGame(images);
    }
  }
}
