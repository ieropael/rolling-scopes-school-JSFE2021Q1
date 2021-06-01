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
}
