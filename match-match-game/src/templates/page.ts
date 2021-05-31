export default abstract class Page {
  protected container: HTMLElement;

  private headerTitle: HTMLHeadingElement;

  static textObject = {};

  constructor(id: string) {
    this.container = document.createElement('div');
    this.headerTitle = document.createElement('div');
    this.container.id = id;
  }

  protected createHeaderTitle(text: string): HTMLHeadingElement {
    this.headerTitle.innerHTML = text;
    return this.headerTitle;
  }

  render(): HTMLElement {
    return this.container;
  }
}
