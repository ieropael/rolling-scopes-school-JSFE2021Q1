export default abstract class Page {
  protected container: HTMLElement;

  private content: HTMLElement;

  static textObject = {};

  constructor(id: string) {
    this.container = document.createElement('div');
    this.content = document.createElement('div');
    this.container.id = id;
  }

  protected createContent(text: string): HTMLElement {
    this.content.innerHTML = text;
    return this.content;
  }

  render(): HTMLElement {
    return this.container;
  }

  renderSettings(): void {
    const category = this.content.querySelector('.game-cards');
    const categorySelect: HTMLSelectElement = document.createElement('select');
    const categoryFirstOption: HTMLOptionElement = document.createElement('option');
    const categorySecondOption: HTMLOptionElement = document.createElement('option');

    categoryFirstOption.innerText = 'animals';
    categorySecondOption.innerText = 'birds';

    if (category) {
      category.append(categorySelect);
      categorySelect.append(categoryFirstOption, categorySecondOption);
    }

    categorySelect.addEventListener('change', () => localStorage.setItem('category', categorySelect.value));

    const difficulty = document.querySelector('.difficulty');
    const difficultySelect: HTMLSelectElement = document.createElement('select');
    const difficultyFirstOption: HTMLOptionElement = document.createElement('option');
    const difficultySecondOption: HTMLOptionElement = document.createElement('option');
    const difficultyThirdOption: HTMLOptionElement = document.createElement('option');

    difficultyFirstOption.innerText = '4 x 4';
    difficultySecondOption.innerText = '6 x 6';
    difficultyThirdOption.innerText = '8 x 8';

    if (difficulty) {
      difficulty.append(difficultySelect);
      difficultySelect.append(difficultyFirstOption, difficultySecondOption, difficultyThirdOption);
    }

    difficultySelect.addEventListener('change', () => localStorage.setItem('difficulty', difficultySelect.value));

    const diffValue = localStorage.getItem('difficulty');
    if (diffValue) {
      if (diffValue === '4 x 4') {
        difficultyFirstOption.selected = true;
      }
      if (diffValue === '6 x 6') {
        difficultySecondOption.selected = true;
      }
      if (diffValue === '8 x 8') {
        difficultyThirdOption.selected = true;
      }
    }

    const catValue = localStorage.getItem('category');
    if (catValue) {
      if (catValue === 'animals') {
        categoryFirstOption.selected = true;
      }
      if (catValue === 'birds') {
        categorySecondOption.selected = true;
      }
    }
  }
}
