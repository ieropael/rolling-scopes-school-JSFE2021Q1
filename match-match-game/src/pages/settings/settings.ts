import Page from '../../core/templates/page';

export default class SettingsPage extends Page {
  static textObject = {
    MainTitle: 'Settings Page',
  };

  render(): HTMLElement {
    const title = this.createHeaderTitle(SettingsPage.textObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}
