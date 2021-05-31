// import { Game } from './components/game/game';
// import { ImageCategoryModel } from './models/image-category-model';
// import MainPage from './pages/main/main';
import Page from './core/templates/page';
import MainPage from './pages/main/main';
import SettingsPage from './pages/settings/settings';
import StatisticsPage from './pages/statistics/statistics';
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

  static renderNewPage(idPage: string): void {
    document.body.innerHTML = '';
    let page: Page | null = null;

    if (idPage === 'main-page') {
      page = new MainPage(idPage);
    } else if (idPage === 'settings-page') {
      page = new SettingsPage(idPage);
    } else if (idPage === 'statistics-page') {
      page = new StatisticsPage(idPage);
    }

    if (page) {
      const pageHTML = page.render();
      document.body.append(pageHTML);
    }
  }

  constructor() {
    this.container = document.body;
    this.initialPage = new MainPage('main-page');
  }

  run(): void {
    App.renderNewPage('main-page');
  }
}
