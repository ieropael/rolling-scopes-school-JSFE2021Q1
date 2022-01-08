import './header.css';
import { BaseComponent } from '../base-component';
import { PageIDs } from '../../shared/page-ids';
import { User } from '../../models/user';
import { Game } from '../game/game';
import { Modal } from '../modal/modal';

const Buttons = [
  {
    id: PageIDs.AboutGame,
    styles: ['button', 'about-game'],
    text: 'About Game',
  },
  {
    id: PageIDs.BestScore,
    styles: ['button', 'best-score'],
    text: 'Best Score',
  },
  {
    id: PageIDs.GameSettings,
    styles: ['button', 'game-settings'],
    text: 'Game Settings',
  },
];

export default class Header extends BaseComponent {
  constructor() {
    super('header', ['header']);
  }

  renderHeader(): void {
    this.element.innerHTML = `
      <div class="logo">
        <div class="logo-top">match</div>
        <div class="logo-bottom">match</div>
      </div>
    `;

    const pageButtons = document.createElement('div');
    pageButtons.classList.add('page-buttons');
    Buttons.forEach((button) => {
      const buttonHTML = document.createElement('a');
      buttonHTML.classList.add(...button.styles);
      buttonHTML.href = `#${button.id}`;
      buttonHTML.innerText = button.text;
      pageButtons.append(buttonHTML);
    });
    this.element.append(pageButtons);

    const mainButton = document.createElement('a');
    mainButton.classList.add('main-button');
    mainButton.innerText = 'register new player';
    this.element.append(mainButton);

    const modal = new Modal();

    document.body.append(modal.renderModal());

    function showModal(): void {
      modal.element.style.display = 'flex';
    }

    mainButton.addEventListener('click', showModal);

    window.addEventListener('click', (event) => {
      if (event.target === modal.element) {
        modal.element.style.display = 'none';
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

      mainButton.innerText = 'start game';
      mainButton.removeEventListener('click', showModal);
      mainButton.href = '#play-game';
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
    this.renderHeader();
    return this.element;
  }
}
