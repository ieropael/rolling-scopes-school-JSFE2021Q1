import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import { CardsField } from '../cards-field/cards-field';
import { delay } from '../../shared/delay';

const FLIP_DELAY = 3000;

export class Game extends BaseComponent {
  private readonly cardsField: CardsField;

  private activeCard?: Card;

  private isAnimation = false;

  constructor() {
    super();
    this.cardsField = new CardsField();
    this.element.appendChild(this.cardsField.element);
  }

  newGame(images: string[]): void {
    this.cardsField.clear();

    const cards: Card[] = images.concat(images).map((url: string) => new Card(url)).sort(() => Math.random() - 0.5);

    cards.forEach((card) => card.element.addEventListener('click', () => this.cardHandler(card)));

    this.cardsField.addCards(cards);
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
      await delay(FLIP_DELAY);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
    } else {
      this.activeCard.element.firstElementChild?.firstElementChild?.classList.add('right');
      card.element.firstElementChild?.firstElementChild?.classList.add('right');
    }

    this.activeCard = undefined;
    this.isAnimation = false;
  }
}
