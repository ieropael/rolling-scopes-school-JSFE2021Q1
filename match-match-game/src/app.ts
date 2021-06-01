import Page from './templates/page';
import Header from './components/header/header';
import MainPage from './pages/main/main';
import SettingsPage from './pages/settings/settings';
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
    } else if (idPage === PageIDs.Settings) {
      page = new SettingsPage(idPage);
    } else if (idPage === PageIDs.Statistics) {
      page = new StatisticsPage(idPage);
    } else if (idPage === PageIDs.Play) {
      new Play(document.body).start();
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
    App.renderNewPage('about');
    this.enableRouteChange();
  }
}
