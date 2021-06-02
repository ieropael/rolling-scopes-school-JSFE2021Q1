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
      const store = database.createObjectStore('testCollection', { keyPath: 'id', autoIncrement: true });
      store.createIndex('firstname', 'firstname');
      store.createIndex('lastname', 'lastname');
      store.createIndex('email', 'email', { unique: true });
    };

    openRequest.onsuccess = () => {
      database = openRequest.result;
      const transaction = database.transaction('testCollection', 'readwrite');
      const store = transaction.objectStore('testCollection');
      const result = store.getAll();
      transaction.oncomplete = () => {
        function tableCreate() {
          const tbl = document.createElement('table');
          tbl.style.width = '100px';
          tbl.style.border = '1px solid black';
          for (let i = 0; i < result.result.length; i++) {
            const tr = tbl.insertRow();
            for (let j = 0; j < 4; j++) {
              const td = tr.insertCell();
              if (j === 0) {
                td.appendChild(document.createTextNode(result.result[i].firstname));
              }
              if (j === 1) {
                td.appendChild(document.createTextNode(result.result[i].lastname));
              }
              if (j === 2) {
                td.appendChild(document.createTextNode(result.result[i].email));
              }
              if (j === 3) {
                td.appendChild(document.createTextNode(result.result[i].score));
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
