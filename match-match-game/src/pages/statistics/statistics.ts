import Page from '../../core/templates/page';

export default class StatisticsPage extends Page {
  static textObject = {
    MainTitle: 'Statistics Page',
  };

  render(): HTMLElement {
    const title = this.createHeaderTitle(StatisticsPage.textObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}
