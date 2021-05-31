export default abstract class Page {
  protected container: HTMLElement;

  private headerTitle: HTMLHeadingElement;

  static textObject = {};

  constructor(id: string) {
    this.container = document.createElement('div');
    this.headerTitle = document.createElement('h1');
    this.container.id = id;
  }

  protected createHeaderTitle(text: string): HTMLHeadingElement {
    this.headerTitle.innerText = text;
    return this.headerTitle;
  }

  render(): HTMLElement {
    return this.container;
  }
}
