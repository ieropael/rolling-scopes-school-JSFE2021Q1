// import { Game } from './components/game/game';
// import { ImageCategoryModel } from './models/image-category-model';
import Page from './templates/page';
import Header from './components/header/header';
import MainPage from './pages/main/main';
import SettingsPage from './pages/settings/settings';
import StatisticsPage from './pages/statistics/statistics';
import { PageIDs } from './shared/page-ids';

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

  private static container: HTMLElement = document.body;

  private static defaultPageID = 'current-page';

  private window = window;

  private header: Header;

  static renderNewPage(idPage: string): void {
    const currentPageHTML = document.querySelector(`#${App.defaultPageID}`);
    if (currentPageHTML) {
      currentPageHTML.remove();
    }
    let page: Page | null = null;

    if (idPage === PageIDs.AboutGame) {
      page = new MainPage(idPage);
    } else if (idPage === PageIDs.Settings) {
      page = new SettingsPage(idPage);
    } else if (idPage === PageIDs.Statistics) {
      page = new StatisticsPage(idPage);
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = App.defaultPageID;
      App.container.append(pageHTML);
    }
  }

  private enableRouteChange() {
    this.window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    });
  }

  constructor() {
    this.header = new Header();
  }

  run(): void {
    App.container.append(this.header.render());
    App.renderNewPage('main');
    this.enableRouteChange();
  }
}
