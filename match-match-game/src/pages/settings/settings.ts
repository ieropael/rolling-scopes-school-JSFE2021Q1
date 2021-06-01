import Page from '../../templates/page';

export default class SettingsPage extends Page {
  static textObject = {
    MainContent: 'Settings Page',
  };

  render(): HTMLElement {
    const title = this.createContent(SettingsPage.textObject.MainContent);
    this.container.append(title);
    return this.container;
  }
}
