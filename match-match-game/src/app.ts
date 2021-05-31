// import { Game } from './components/game/game';
// import { ImageCategoryModel } from './models/image-category-model';
// import MainPage from './pages/main/main';
import MainPage from './pages/main/main';
// import SettingsPage from './pages/settings/settings';

export default class App {
  // private readonly game: Game;

  // constructor(private readonly rootElement: HTMLElement) {
  //   this.game = new Game();
  //   this.rootElement.appendChild(this.game.element);
  // }

  // async start(): Promise<void> {
  //   const res = await fetch('./images.json');
  //   const categories: ImageCategoryModel[] = await res.json();
  //   const cat = categories[0];
  //   const images = cat.images.map((name) => `${cat.category}/${name}`);
  //   this.game.newGame(images);
  // }

  private container: HTMLElement;

  private initialPage: MainPage;

  constructor() {
    this.container = document.body;
    this.initialPage = new MainPage('main-page');
  }

  run(): void {
    const mainPageHTML = this.initialPage.render();
    this.container.append(mainPageHTML);
  }
}
