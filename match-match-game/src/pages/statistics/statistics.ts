import Page from '../../templates/page';

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
      const arr: Array<any> = [];
      result.onsuccess = () => {
        const cursor = result.result;
        if (cursor) {
          arr.push(cursor.value);
          cursor.continue();
        }
      };
      transaction.oncomplete = () => {
        console.log(arr);
        function tableCreate() {
          const tbl = document.createElement('table');
          tbl.style.width = '100px';
          tbl.style.border = '1px solid black';
          for (let i = 0; i < arr.length && i < 10; i++) {
            const tr = tbl.insertRow();
            for (let j = 0; j < 5; j++) {
              const td = tr.insertCell();
              if (j === 0) {
                const image = td.appendChild(document.createElement('img'));
                image.src = arr[i].avatar;
                image.classList.add('avatar-image');
              }
              if (j === 1) {
                td.appendChild(document.createTextNode(arr[i].firstname));
              }
              if (j === 2) {
                td.appendChild(document.createTextNode(arr[i].lastname));
              }
              if (j === 3) {
                td.appendChild(document.createTextNode(arr[i].email));
              }
              if (j === 4) {
                td.appendChild(document.createTextNode(arr[i].score));
              }
              td.style.border = '1px solid black';
            }
          }

          const stats = document.querySelector('.statistic');
          if (stats) {
            stats.appendChild(tbl);
          }
        }
        tableCreate();
      };
    };
    return this.container;
  }
}
