// import store from './store';

// export default class Ui {
//   static renderGarage(): string {
//     return `
//       <h1>Garage (${store.carsCount})</h1>
//       <h2>Page #${store.carsPage}</h2>
//       <ul class="garage">
//         ${store.cars.map((car) => `
//           <li>${renderCar(car)}</li>
//         `).join('')}
//       </ul>
//     `;
//   }

//   static renderWinners(): string {
//     return `
//       <h1>Winners (${store.winnersCount})</h1>
//       <h2>Page #${store.winnersPage}</h2>
//       <table class="table" cellspacing="0" border="0" cellpadding="0">
//         <thead>
//           <th>Number</th>
//           <th>Car</th>
//           <th>Name</th>
//           <th class="table-button table-wins ${store.sortBy === 'wins' ? store.sortOrder : ''}" id="sort-by-wins">Wins</th>
//           <th class="table-button table-time ${store.sortBy === 'time' ? store.sortOrder : ''}" id="sort-by-time">Best time (seconds)</th>
//         </thead>
//         <tbody>
//           ${store.winners.map((winner, index) => `
//             <tr>
//               <td>${index + 1}</td>
//               <td>${renderCarImage(winner.car.color)}</td>
//               <td>${winner.car.name}</td>
//               <td>${winner.wins}</td>
//               <td>${winner.time}</td>
//             </tr>
//           `).join('')}
//         </tbody>
//       </table>
//     `;
//   }

//   static async render(): Promise<void> {
//     const html = `
//       <div class="menu">
//         <button class="button garage-menu-button primary" id="garage-menu">To garage</button>
//         <button class="button winners-menu-button primary" id="winners-menu">To winners</button>
//       </div>
//       <div id="garage-view">
//         <div>
//           <form class="form" id="create">
//             <input class="input" id="create-name" name="name" type="text">
//             <input class="color" id="create-color" name="color" type="color" value="#ffffff">
//             <button class="button" type="submit">Create</button>
//           </form>
//           <form class="form" id="update">
//             <input class="input" id="update-name" name="name" type="text" disabled>
//             <input class="color" id="update-color" name="color" type="color" value="#ffffff" disabled>
//             <button class="button" id="update-submit" type="submit">Update</button>
//           </form>
//         </div>
//         <div class="race-controls">
//           <button class="button race-button primary" id="race">Race</button>
//           <button class="button reset-button primary" id="reset">Reset</button>
//           <button class="button generator-button primary" id="generator">Generate cars</button>
//         </div>
//         <div id="garage">
//           ${Ui.renderGarage()}
//         </div>
//         <div>
//           <p class="message" id="message"></p>
//         </div>
//       </div>
//       <div id="winners-view" style="display: none">
//         ${Ui.renderWinners()}
//       </div>
//       <div class="pagination">
//         <button class="button primary prev-button" id="prev" disabled>Prev</button>
//         <button class="button primary next-button" id="next" disabled>Next</button>
//       </div>
//     `;
//     const root = document.createElement('div');
//     root.innerHTML = html;
//     document.body.appendChild(root);
//   }
// }
