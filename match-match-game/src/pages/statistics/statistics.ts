import Page from '../../templates/page';

const SCORE_SIZE = 10;
const FIELDS_AMOUNT = 5;

export default class StatisticsPage extends Page {
  static textObject = {
    MainContent: 'Statistics Page',
  };

  render(): HTMLElement {
    const iDB = window.indexedDB;

    let database = null;
    const title = this.createContent(StatisticsPage.textObject.MainContent);

    this.container.append(title);
    this.container.classList.add('statistic');

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
      const result = store.index('score').openCursor(null, 'prev');
      const arr: Array<Record<string, string>> = [];
      result.onsuccess = () => {
        const cursor = result.result;
        if (cursor) {
          arr.push(cursor.value);
          cursor.continue();
        }
      };
      transaction.oncomplete = () => {
        function tableCreate() {
          const table = document.createElement('table');

          for (let i = 0; i < arr.length && i < SCORE_SIZE; i++) {
            const tr = table.insertRow();
            for (let j = 0; j < FIELDS_AMOUNT; j++) {
              const td = tr.insertCell();
              const avatar = td.appendChild(document.createElement('img'));
              switch (j) {
                case 0:
                  avatar.src = arr[i].avatar;
                  avatar.classList.add('avatar-image');
                  break;
                case 1:
                  td.appendChild(document.createTextNode(arr[i].firstname));
                  break;
                case 2:
                  td.appendChild(document.createTextNode(arr[i].lastname));
                  break;
                case 3:
                  td.appendChild(document.createTextNode(arr[i].email));
                  break;
                case 4:
                  td.appendChild(document.createTextNode(arr[i].score));
                  break;
                default:
                  break;
              }
              td.style.border = '1px solid black';
            }
          }

          const stats = document.querySelector('.statistic');
          if (stats) {
            stats.appendChild(table);
          }
        }
        tableCreate();
      };
    };
    return this.container;
  }
}
