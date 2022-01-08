import './modal.css';
import { BaseComponent } from '../base-component';

export class Modal extends BaseComponent {
  constructor() {
    super('div', ['modal']);
  }

  renderModal(): HTMLElement {
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal__content');
    this.element.append(modalContent);

    modalContent.innerHTML = `
      <form name="register">
        <h3>Register new Player</h3>
        <span>First name *</span>
        <input type="text" class="firstname" maxlength="30" required></input>
        <span>Last name *</span>
        <input type="text" class="lastname" maxlength="30" required></input>
        <span>E-Mail *</span>
        <input type="text" class="e-mail" maxlength="30" required></input>
        <input type="file" class="avatar"></input>
        <button class="register-button" type="button">Submit</button>
      </form>
    `;

    return this.element;
  }
}
