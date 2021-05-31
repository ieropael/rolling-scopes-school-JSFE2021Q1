import Page from '../../templates/page';

export default class MainPage extends Page {
  static textObject = {
    MainTitle: 'Main Page',
  };

  render(): HTMLElement {
    const title = this.createHeaderTitle(MainPage.textObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}
