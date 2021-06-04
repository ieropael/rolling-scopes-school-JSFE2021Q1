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
      const category = document.querySelector('.game-cards');
      const categorySelect: HTMLSelectElement = document.createElement('select');
      const categoryFirstOption: HTMLOptionElement = document.createElement('option');
      const categorySecondOption: HTMLOptionElement = document.createElement('option');
      categoryFirstOption.innerText = 'animals';
      categorySecondOption.innerText = 'birds';
      if (category) {
        category.append(categorySelect);
        categorySelect.append(categoryFirstOption);
        categorySelect.append(categorySecondOption);
      }
      categorySelect.addEventListener('change', () => localStorage.setItem('category', categorySelect.value));

      const difficulty = document.querySelector('.difficulty');
      const difficultySelect: HTMLSelectElement = document.createElement('select');
      const difficultyFirstOption: HTMLOptionElement = document.createElement('option');
      const difficultySecondOption: HTMLOptionElement = document.createElement('option');
      const difficultyThirdOption: HTMLOptionElement = document.createElement('option');
      difficultyFirstOption.innerText = '4 x 4';
      difficultySecondOption.innerText = '6 x 6';
      difficultyThirdOption.innerText = '8 x 8';
      if (difficulty) {
        difficulty.append(difficultySelect);
        difficultySelect.append(difficultyFirstOption);
        difficultySelect.append(difficultySecondOption);
        difficultySelect.append(difficultyThirdOption);
      }
      const diffValue = localStorage.getItem('difficulty');
      if (diffValue) {
        if (diffValue === '4 x 4') {
          difficultyFirstOption.selected = true;
        }
        if (diffValue === '6 x 6') {
          difficultySecondOption.selected = true;
        }
        if (diffValue === '8 x 8') {
          difficultyThirdOption.selected = true;
        }
      }

      const catValue = localStorage.getItem('category');
      if (catValue) {
        if (catValue === 'animals') {
          categoryFirstOption.selected = true;
        }
        if (catValue === 'birds') {
          categorySecondOption.selected = true;
        }
      }

      difficultySelect.addEventListener('change', () => localStorage.setItem('difficulty', difficultySelect.value));
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
    App.renderNewPage(window.location.hash.slice(1));
    this.enableRouteChange();
  }
}
