import './main.css';
import Page from '../../templates/page';

export default class MainPage extends Page {
  static textObject = {
    MainContent: `<div class="about-game">
    <div class="about-game__content">
      <h2 class="how-to-play">How to play?</h2>
      <div class="register">
        <div class="register__info">
          <div class="register__number">1</div>
          <div class="register__text">Register new player in game</div>
        </div>
        <div class="register__example"></div>
      </div>
      <div class="configure">
        <div class="configure__info">
          <div class="register__number">2</div>
          <div class="register__text">Configure your game settings</div>
        </div>
        <div class="configure__example"></div>
      </div>
      <div class="start">
        <div class="start__info">
          <div class="register__number">3</div>
          <div class="register__text">Start you new game! Remember card<br>
          positions and match it before times up.</div>
        </div>
        <div class="start__example"></div>
      </div>
    </div>
  </div>
  `,
  };

  render(): HTMLElement {
    const title = this.createContent(MainPage.textObject.MainContent);
    this.container.append(title);
    return this.container;
  }
}
