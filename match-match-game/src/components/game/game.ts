import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import { CardsField } from '../cards-field/cards-field';
import { delay } from '../../shared/delay';
import './game.css';
import { User } from '../../models/user';

const FLIP_DELAY = 3000;

export class Game extends BaseComponent {
  private readonly cardsField: CardsField;

  private activeCard?: Card;

  private isAnimation = false;

  private counter = 0;

  private timer = document.createElement('div');

  private countTime = 0;

  private countTries = 0;

  private countWrongTries = 0;

  static user: User;

  constructor() {
    super();
    this.element.appendChild(this.timer);
    this.cardsField = new CardsField();
    this.element.appendChild(this.cardsField.element);
    this.timer.classList.add('timer');
    this.timer.innerText = String(this.countTime);
  }

  addTimer(): void {
    setTimeout(() => {
      setInterval(() => {
        this.timer.innerText = String(this.countTime++);
      }, 1000);
    }, FLIP_DELAY);
  }

  static getUser(): void {
    const iDB = window.indexedDB;

    let database = null;

    const openRequest = iDB.open('testdb');

    openRequest.onsuccess = () => {
      database = openRequest.result;
      const transaction = database.transaction('testCollection', 'readwrite');
      const store = transaction.objectStore('testCollection');
      store.put({
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        email: this.user.email,
        score: this.user.score,
        avatar: this.user.avatar,
      });
    };
  }

  countResult(): void {
    const result = (this.countTries - this.countWrongTries) * 100 - this.countTime * 10;
    function checkScore() {
      const iDB = window.indexedDB;
      const score = result > 0 ? result : 0;

      let database = null;

      const openRequest = iDB.open('testdb');

      openRequest.onsuccess = () => {
        database = openRequest.result;
        const transaction = database.transaction('testCollection', 'readwrite');
        const store = transaction.objectStore('testCollection');
        const request = store.getAll();
        transaction.oncomplete = () => {
          const checkUser = request.result.find((el) => el.email === Game.user.email);
          if (score > checkUser.score) {
            Game.user.score = score;
          } else {
            Game.user.score = checkUser.score;
          }
          Game.getUser();
        };
      };
    }
    checkScore();
  }

  newGame(images: string[]): void {
    this.cardsField.clear();

    const cards: Card[] = images.concat(images).map((url: string) => new Card(url)).sort(() => Math.random() - 0.5);

    cards.forEach((card) => card.element.addEventListener('click', () => this.cardHandler(card)));

    this.cardsField.addCards(cards);

    this.addTimer();
  }

  private async cardHandler(card: Card): Promise<void> {
    if (this.isAnimation) {
      return;
    }

    if (!card.isFlipped) {
      return;
    }

    this.isAnimation = true;

    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }

    if (this.activeCard.image !== card.image) {
      this.activeCard.element.firstElementChild?.firstElementChild?.classList.add('wrong');
      card.element.firstElementChild?.firstElementChild?.classList.add('wrong');

      this.countTries++;
      this.countWrongTries++;

      await delay(FLIP_DELAY);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
    } else {
      this.activeCard.element.firstElementChild?.firstElementChild?.classList.add('right');
      card.element.firstElementChild?.firstElementChild?.classList.add('right');

      this.countTries++;

      this.counter++;
      if (this.counter >= this.cardsField.cards.length / 2) {
        this.countResult();
        alert(`Congratulations! You finished in ${this.countTime} seconds!`);
      }
    }

    this.activeCard = undefined;
    this.isAnimation = false;
  }
}
