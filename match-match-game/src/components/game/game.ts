import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import { CardsField } from '../cards-field/cards-field';
import { delay } from '../../shared/delay';
import './game.css';

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
    }, 3000);
  }

  countResult(): number {
    const result = (this.countTries - this.countWrongTries) * 100 - this.countTime * 10;
    return result > 0 ? result : 0;
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
        alert(`Congratulations! Your result is ${this.countResult()} points!`);
      }
    }

    this.activeCard = undefined;
    this.isAnimation = false;
  }
}
