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
    Buttons.forEach((button) => {
      const buttonHTML = document.createElement('a');
      buttonHTML.href = `#${button.id}`;
      buttonHTML.innerText = button.text;
      pageButtons.append(buttonHTML);
    });
    this.element.append(pageButtons);
  }

  render(): HTMLElement {
    this.renderPageButtons();
    return this.element;
  }
}
