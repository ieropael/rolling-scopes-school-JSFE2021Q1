import Page from '../../templates/page';

export default class StatisticsPage extends Page {
  static textObject = {
    MainContent: 'Statistics Page',
  };

  render(): HTMLElement {
    const title = this.createContent(StatisticsPage.textObject.MainContent);
    this.container.append(title);
    return this.container;
  }
}
