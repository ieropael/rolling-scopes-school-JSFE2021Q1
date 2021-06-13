import Page from './templates/page';
import Header from './components/header/header';
import MainPage from './pages/main/main';
import SettingsPage from './pages/settings/settings-page';
import StatisticsPage from './pages/statistics/statistics';
import { Play } from './pages/play/play';
import { PageIDs } from './shared/page-ids';

export default class App {
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
    } else if (idPage === PageIDs.GameSettings) {
      page = new SettingsPage(idPage);
    } else if (idPage === PageIDs.BestScore) {
      page = new StatisticsPage(idPage);
    } else if (idPage === PageIDs.PlayGame) {
      new Play(document.body).start();
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = App.defaultPageID;
      App.container.append(pageHTML);
      if (idPage === PageIDs.GameSettings) {
        page.renderSettings();
      }
    }
  }

  private enableRouteChange() {
    this.window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      const pageButtons = document.querySelectorAll('.button');
      pageButtons.forEach((button) => {
        button.classList.remove('active');
        if (button.classList.contains(hash)) {
          button.classList.add('active');
        }
      });
      App.renderNewPage(hash);
    });
  }

  constructor() {
    this.header = new Header();
  }

  run(): void {
    App.container.append(this.header.render());
    if (window.location.hash.slice(1)) {
      App.renderNewPage(window.location.hash.slice(1));
    } else {
      App.renderNewPage('about-game');
    }
    this.enableRouteChange();
  }
}
