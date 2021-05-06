const zoomPlus = document.querySelector('.zoom__plus');
const zoomMinus = document.querySelector('.zoom__minus');
const map = document.querySelector('.map');

function zoomIn() {
  let currWidth = map.clientWidth;
  let currHeigth = map.clientHeight;
  let wrapperWidth = document.querySelector('.map__wrapper').clientWidth;
  if (currWidth < wrapperWidth * 8) {
    map.style.width = (currWidth + 100) + 'px';
    map.style.height = (currHeigth + (currWidth / currHeigth) * 100 + 'px');
  } else {
    return false;
  }
}

function zoomOut() {
  let currWidth = map.clientWidth;
  let currHeigth = map.clientHeight;
  let wrapperWidth = document.querySelector('.map__wrapper').clientWidth;
  if (currWidth > wrapperWidth) {
    map.style.width = (currWidth - 100) + 'px';
    map.style.height = (currHeigth - (currWidth / currHeigth) * 100 + 'px');
  } else {
    return false;
  }
}

zoomPlus.addEventListener('click', () => zoomIn());
zoomMinus.addEventListener('click', () => zoomOut());
