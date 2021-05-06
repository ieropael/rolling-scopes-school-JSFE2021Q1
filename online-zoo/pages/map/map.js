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

map.onmousedown = function(event) {
  let windowWidth = document.documentElement.clientWidth;
  let fixWidth = 0;
  if (windowWidth > 1160) {
    fixWidth = (windowWidth - 1160) / 2;
  }

  let shiftX = event.clientX - map.getBoundingClientRect().left;
  let shiftY = event.clientY - map.getBoundingClientRect().top;

  moveAt(event.pageX - fixWidth, event.pageY - 180);

  function moveAt(pageX, pageY) {
    map.style.left = pageX - shiftX + 'px';
    map.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX - fixWidth, event.pageY - 180);
  }

  document.addEventListener('mousemove', onMouseMove);

  document.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    map.onmouseup = null;
  };

  document.onmouseover = function() {
    document.removeEventListener('mousemove', onMouseMove);
    map.onmouseup = null;
  };

};

map.ondragstart = function() {
  return false;
};
