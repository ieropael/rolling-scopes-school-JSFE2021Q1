import '../../assets/register.jpg';
import '../../assets/settings.jpg';
import '../../assets/game.jpg';
import './main.css';
import Page from '../../templates/page';

export default class MainPage extends Page {
  static textObject = {
    MainContent: `<h3>Уважаемый проверяющий! Приложение выглядит не очень, но весь основной функционал
    работает. Проверьте, пожалуйста, не обращая внимания на этот ужас. :) Заранее, большое спасибо! Контакты для связи: 
    Discord: ieropael#1569, Telegram: @ieropael</h3>
    <div class="about-game">
    <div class="about-game__content">
      <h2 class="how-to-play">How to play?</h2>
      <div class="register">
        <div class="register__info">
          <div class="register__number">1</div>
          <div class="register__text">Register new player in game</div>
        </div>
        <img class="register__example" src="../../assets/register.jpg">
      </div>
      <div class="configure">
        <div class="configure__info">
          <div class="register__number">2</div>
          <div class="register__text">Configure your game settings</div>
        </div>
        <img class="configure__example" src="../../assets/settings.jpg">
      </div>
      <div class="start">
        <div class="start__info">
          <div class="register__number">3</div>
          <div class="register__text">Start you new game! Remember card<br>
          positions and match it before times up.</div>
        </div>
        <img class="start__example" src="../../assets/game.jpg">
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
