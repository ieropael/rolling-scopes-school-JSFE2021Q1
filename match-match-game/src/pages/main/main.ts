export class MainPage {
  private container: HTMLElement;

  private headerTitle: HTMLHeadingElement;

  static textObject = {
    MainTitle: 'Main Page',
  };

  constructor(id: string) {
    this.container = document.createElement('div');
    this.headerTitle = document.createElement('h1');
    this.container.id = id;
  }

  private createHeaderTitle(text: string) {
    this.headerTitle.innerText = text;
    return this.headerTitle;
  }

  render(): HTMLElement {
    const title = this.createHeaderTitle(MainPage.textObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}
