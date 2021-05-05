const zoom = document.querySelector('.zoom');
const map = document.querySelector('.map__image');

function zoomIn() {
  let currWidth = map.clientWidth;
  map.style.width = (currWidth + 100) + 'px';
}

zoom.addEventListener('click', () => zoomIn());
