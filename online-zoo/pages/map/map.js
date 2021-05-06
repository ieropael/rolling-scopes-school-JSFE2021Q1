const zoomPlus = document.querySelector('.zoom__plus');
const zoomMinus = document.querySelector('.zoom__minus');
const map = document.querySelector('.map');
const mapWrapper = document.querySelector('.map__wrapper')

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
    if (map.clientHeight + parseInt(map.style.top) < mapWrapper.clientHeight) {
      map.style.top = mapWrapper.clientHeight - map.clientHeight + 'px';
    }
    if (map.clientWidth + parseInt(map.style.left) < mapWrapper.clientWidth) {
      map.style.left = mapWrapper.clientWidth - map.clientWidth + 'px';
    }
    if (map.clientWidth == mapWrapper.clientWidth) {
      map.style.top = (mapWrapper.clientHeight - map.clientHeight) / 2 + 'px';
    }
  } else {
    return false;
  }
}

zoomPlus.addEventListener('click', zoomIn);
zoomMinus.addEventListener('click', zoomOut);

function moveAt(pageX, pageY, shiftX, shiftY) {
  if (pageX - shiftX <= 0 && pageX - shiftX >= mapWrapper.offsetWidth - map.offsetWidth) {
    map.style.left = pageX - shiftX + 'px';
  }
  if (pageY - shiftY <= -80 && pageY - shiftY >= mapWrapper.offsetHeight - map.offsetHeight) {
    map.style.top = pageY - shiftY + 'px';
  }
}

map.onmousedown = function(event) {
  let windowWidth = document.documentElement.clientWidth;
  let fixWidth = 0;
  if (windowWidth > 1160) {
    fixWidth = (windowWidth - 1160) / 2;
  }

  let shiftX = event.clientX - map.getBoundingClientRect().left;
  let shiftY = event.clientY - map.getBoundingClientRect().top;

  moveAt(event.pageX - fixWidth, event.pageY - 180, shiftX, shiftY);

  function onMouseMove(event) {
    moveAt(event.pageX - fixWidth, event.pageY - 180, shiftX, shiftY);
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
