import './settings-page.css';
import Page from '../../templates/page';

export default class SettingsPage extends Page {
  static textObject = {
    MainContent: `
      <div class="settings">
        <div class="settings-content">
          <div class="game-cards">
            <h3>Game cards</h3>
          </div>
          <div class="difficulty">
            <h3>Difficulty</h3>
          </div>
        </div>
      </div>
    `,
  };

  render(): HTMLElement {
    const content = this.createContent(SettingsPage.textObject.MainContent);
    this.container.classList.add('settings-container');
    this.container.append(content);
    return this.container;
  }
}
