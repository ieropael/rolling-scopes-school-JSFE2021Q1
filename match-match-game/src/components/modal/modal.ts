export class Modal {
  private modalWindow: HTMLElement;

  private modalForm: HTMLFormElement;

  private firstNameLabel: HTMLLabelElement;

  private lastNameLabel: HTMLLabelElement;

  private eMailLabel: HTMLLabelElement;

  private firstNameInput: HTMLInputElement;

  private lastNameInput: HTMLInputElement;

  private eMailInput: HTMLInputElement;

  constructor() {
    this.modalWindow = document.createElement('div');
    this.modalWindow.classList.add('modal');

    this.modalForm = document.createElement('form');
    this.modalForm.classList.add('modal__content');

    this.modalWindow.append(this.modalForm);

    this.firstNameLabel = document.createElement('label');
    this.firstNameLabel.classList.add('firstname-label');
    this.firstNameLabel.innerText = 'First Name * ';

    this.firstNameInput = document.createElement('input');
    this.firstNameInput.classList.add('firstname-input');

    this.lastNameLabel = document.createElement('label');
    this.lastNameLabel.classList.add('lastname-label');
    this.lastNameLabel.innerText = 'Last Name * ';

    this.lastNameInput = document.createElement('input');
    this.lastNameInput.classList.add('lastname-input');

    this.eMailLabel = document.createElement('label');
    this.eMailLabel.classList.add('email-label');
    this.eMailLabel.innerText = 'E-Mail * ';

    this.eMailInput = document.createElement('input');
    this.eMailInput.classList.add('email-input');

    this.modalForm.append(this.firstNameLabel);
    this.firstNameLabel.append(this.firstNameInput);

    this.modalForm.append(this.lastNameLabel);
    this.lastNameLabel.append(this.lastNameInput);

    this.modalForm.append(this.eMailLabel);
    this.eMailLabel.append(this.eMailInput);
  }

  render(): HTMLElement {
    return this.modalWindow;
  }
}
