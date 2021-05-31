import './header.css';
import { BaseComponent } from '../base-component';
import { PageIDs } from '../../shared/page-ids';

const Buttons = [
  {
    id: PageIDs.Main,
    text: 'Main Page',
  },
  {
    id: PageIDs.Settings,
    text: 'Settings Page',
  },
  {
    id: PageIDs.Statistics,
    text: 'Statistics Page',
  },
];
export default class Header extends BaseComponent {
  constructor() {
    super('header', ['header']);
  }

  renderPageButtons(): void {
    const pageButtons = document.createElement('div');
    pageButtons.classList.add('page-buttons');
    Buttons.forEach((button) => {
      const buttonHTML = document.createElement('a');
      buttonHTML.classList.add('button');
      buttonHTML.href = `#${button.id}`;
      buttonHTML.innerText = button.text;
      pageButtons.append(buttonHTML);
    });
    this.element.innerHTML = `
    <div class="logo">
      <div class="logo-top">match</div>
      <div class="logo-bottom">match</div>
    </div>
    `;
    this.element.append(pageButtons);
  }

  render(): HTMLElement {
    this.renderPageButtons();
    return this.element;
  }
}
