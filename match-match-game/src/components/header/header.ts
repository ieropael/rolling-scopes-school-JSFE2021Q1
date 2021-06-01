import './header.css';
import { BaseComponent } from '../base-component';
import { PageIDs } from '../../shared/page-ids';
// import { User } from '../../models/user';

const Buttons = [
  {
    id: PageIDs.AboutGame,
    text: 'About Game',
  },
  {
    id: PageIDs.Settings,
    text: 'Settings Page',
  },
  {
    id: PageIDs.Statistics,
    text: 'Statistics Page',
  },
];
export default class Header extends BaseComponent {
  constructor() {
    super('header', ['header']);
  }

  renderPageButtons(): void {
    const pageButtons = document.createElement('div');
    pageButtons.classList.add('page-buttons');
    Buttons.forEach((button) => {
      const buttonHTML = document.createElement('a');
      buttonHTML.classList.add('button');
      buttonHTML.href = `#${button.id}`;
      buttonHTML.innerText = button.text;
      pageButtons.append(buttonHTML);
    });
    this.element.innerHTML = `
    <div class="logo">
      <div class="logo-top">match</div>
      <div class="logo-bottom">match</div>
    </div>
    `;
    this.element.append(pageButtons);
    const playButton = document.createElement('a');
    playButton.classList.add('play-button');
    playButton.innerText = 'register';
    this.element.append(playButton);

    const modal = document.createElement('div');
    modal.classList.add('modal');
    document.body.append(modal);

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal__content');
    modal.append(modalContent);

    modalContent.innerHTML = `
      <form name="register">
        <h3>Register new Player</h3>
        <span>First name *</span>
        <input type="text" class="firstname" maxlength="30" required></input>
        <span>Last name *</span>
        <input type="text" class="lastname" maxlength="30" required></input>
        <span>E-Mail *</span>
        <input type="text" class="e-mail" maxlength="30" required></input>
        <button class='register-button'>Submit</button>
      </form>
    `;

    function listener() {
      modal.style.display = 'flex';
    }

    // playButton.addEventListener('click', listener);
    playButton.href = '#play';

    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });

    const registerButton = document.querySelector('.register-button');
    const firstNameInput: HTMLFormElement | null = document.querySelector('.firstname');
    const lastNameInput: HTMLFormElement | null = document.querySelector('.lastname');
    const eMailInput: HTMLFormElement | null = document.querySelector('.e-mail');
    registerButton?.addEventListener('click', () => {
      // const user = new User(firstNameInput?.value, lastNameInput?.value, eMailInput?.value);
      playButton.innerText = 'start game';
      playButton.removeEventListener('click', listener);
      playButton.href = '#play';
    });

    function validate(value: string) {
      const regExp = /^[^0-9][^(~!@#$%*&()_—+=|:;"'`<>,.?\\/\\^\s)]{1,30}$/;
      return regExp.test(value);
    }

    function check(value: string) {
      if (!validate(value)) {
        registerButton?.setAttribute('disabled', 'true');
      } else {
        registerButton?.removeAttribute('disabled');
      }
    }

    registerButton?.setAttribute('disabled', 'true');
    if (firstNameInput && lastNameInput && eMailInput) {
      firstNameInput.addEventListener('input', () => {
        check(firstNameInput.value);
      });
      lastNameInput.addEventListener('input', () => {
        check(firstNameInput.value);
      });
      eMailInput.addEventListener('input', () => {
        check(firstNameInput.value);
      });
    }
  }

  render(): HTMLElement {
    this.renderPageButtons();
    return this.element;
  }
}
