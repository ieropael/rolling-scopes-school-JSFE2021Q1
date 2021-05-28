import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import { CardsField } from '../cards-field/cards-field';

export class Game extends BaseComponent {
  private readonly cardsField: CardsField;

  constructor() {
    super();
    this.cardsField = new CardsField();
    this.element.appendChild(this.cardsField.element);
  }

  initGame(images: string[]) {
    this.cardsField.clear();

    const cards: Card[] = images.concat(images).map((url: string) => new Card(url)).sort(() => Math.random() - 0.5);

    this.cardsField.addCards(cards);
  }
}
