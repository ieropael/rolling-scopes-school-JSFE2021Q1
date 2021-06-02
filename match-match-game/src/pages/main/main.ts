import '../../assets/register.jpg';
import '../../assets/settings.jpg';
import '../../assets/game.jpg';
import './main.css';
import Page from '../../templates/page';

export default class MainPage extends Page {
  static textObject = {
    MainContent: `<h3>Уважаемый проверяющий! Пожалуйста, проверьте моё приложение немного позднее. 
    Последние пару недель завал на работе, из-за чего нормально доделать приложение не удалось. 
    Но я постараюсь приложить максимум усилий, чтобы в ближайшее время всё закончить. 
    Хоть сейчас всё и выглядит ужасно, но осталось совсем немного. :) 
    Надеюсь на Ваше понимание. Заранее, спасибо! Контакты для связи: 
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
