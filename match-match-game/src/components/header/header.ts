import './header.css';
import { BaseComponent } from '../base-component';
import { PageIDs } from '../../shared/page-ids';
import { User } from '../../models/user';
import { Game } from '../game/game';

const Buttons = [
  {
    id: PageIDs.AboutGame,
    styles: ['button', 'about-game'],
    text: 'About Game',
  },
  {
    id: PageIDs.Settings,
    styles: ['button', 'best-score'],
    text: 'Game Settings',
  },
  {
    id: PageIDs.Statistics,
    styles: ['button', 'game-settings'],
    text: 'Best Score',
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
      buttonHTML.classList.add(...button.styles);
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
    playButton.classList.add('main-button');
    playButton.innerText = 'register new player';
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
        <input type="file" class="avatar"></input>
        <button class="register-button" type="button">Submit</button>
      </form>
    `;

    function listener() {
      modal.style.display = 'flex';
    }

    playButton.addEventListener('click', listener);
    // playButton.href = '#play';

    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });

    const registerButton = document.querySelector('.register-button');
    const firstNameInput: HTMLFormElement | null = document.querySelector('.firstname');
    const lastNameInput: HTMLFormElement | null = document.querySelector('.lastname');
    const eMailInput: HTMLFormElement | null = document.querySelector('.e-mail');
    const avatarInput: HTMLFormElement | null = document.querySelector('.avatar');
    registerButton?.addEventListener('click', () => {
      const user = new User(firstNameInput?.value, lastNameInput?.value, eMailInput?.value);
      Game.user = user;

      const file = avatarInput?.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      let image = '';
      reader.onload = () => {
        image = <string>reader.result;
        const avatar = document.createElement('img');
        avatar.src = <string>reader.result;
        avatar.classList.add('avatar-image');
        this.element.append(avatar);
        user.avatar = image;
      };
      const iDB = window.indexedDB;

      let database: IDBDatabase;

      const openRequest = iDB.open('testdb');
      openRequest.onupgradeneeded = () => {
        database = openRequest.result;
        const store = database.createObjectStore('testCollection', { keyPath: 'email' });
        store.createIndex('firstname', 'firstname');
        store.createIndex('lastname', 'lastname');
        store.createIndex('email', 'email');
        store.createIndex('score', 'score');
        store.createIndex('avatar', 'avatar');
      };

      openRequest.onsuccess = () => {
        database = openRequest.result;
        const transaction = database.transaction('testCollection', 'readwrite');
        const store = transaction.objectStore('testCollection');
        const result = store.getAll();
        function checkScore() {
          const secondTransaction = database.transaction('testCollection', 'readwrite');
          const secondStore = secondTransaction.objectStore('testCollection');
          secondStore.put({
            firstname: user.firstname, lastname: user.lastname, email: user.email, score: user.score, avatar: image,
          });
        }
        transaction.oncomplete = () => {
          const checkUser = result.result.find((el) => el.email === user.email);
          if (checkUser && user.email === checkUser.email) {
            user.score = checkUser.score;
            checkScore();
          } else {
            user.score = 0;
            checkScore();
          }
        };
      };
      playButton.innerText = 'start game';
      playButton.removeEventListener('click', listener);
      playButton.href = '#play-game';
    });

    function validate(firstname: string, lastname: string, email: string) {
      const regExp = /^[^0-9][^(~!@#$%*&()_—+=|:;"'`<>,.?\\/\\^\s)]{1,30}$/;
      const regExpEMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return (regExp.test(firstname) && regExp.test(lastname) && regExpEMail.test(email));
    }

    function check(firstname: string, lastname: string, email: string) {
      if (!validate(firstname, lastname, email)) {
        registerButton?.setAttribute('disabled', 'true');
      } else {
        registerButton?.removeAttribute('disabled');
      }
    }

    registerButton?.setAttribute('disabled', 'true');
    if (firstNameInput && lastNameInput && eMailInput && avatarInput) {
      firstNameInput.addEventListener('input', () => {
        check(firstNameInput.value, lastNameInput.value, eMailInput.value);
      });
      lastNameInput.addEventListener('input', () => {
        check(firstNameInput.value, lastNameInput.value, eMailInput.value);
      });
      eMailInput.addEventListener('input', () => {
        check(firstNameInput.value, lastNameInput.value, eMailInput.value);
      });
    }
  }

  render(): HTMLElement {
    this.renderPageButtons();
    return this.element;
  }
}
