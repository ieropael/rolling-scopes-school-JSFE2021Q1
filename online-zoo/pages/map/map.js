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

// MODAL WINDOW

const donateButton = document.querySelector('.footer__button');

const modal = document.querySelector('.modal');
const modalPay = document.querySelector('.modal__pay');
const modalContent = document.querySelector('.modal__content');

const closeModal = document.querySelectorAll('.modal__close');
const nextButton = document.querySelector('.modal__button');
const payButton = document.querySelector('.modal__pay-button');

const inputFields = document.querySelectorAll('.input-field');
const inputArray = Array.from(inputFields);

function maxLengthCheck(field) {
  if (field.type == 'number' && field.value.length >= field.max.length) {
    field.value = field.value.slice(0, field.max.length);
    field.style.border = "1px solid #9ca498";
  }
}

inputFields.forEach(field => field.addEventListener('input', event => maxLengthCheck(event.target)));
  
function isNumeric(event) {
  let theEvent = event || window.event;
  let key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode(key);
  let regex = /[0-9]|\./;
  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) {
      theEvent.preventDefault()
    };
  }
}

function validateInput(field) {
  if (field.value.length < field.max.length || field.value == null || field.value == '') {
    field.style.border = "1px solid red";
    return false;
  } else {
    field.style.border = "1px solid #9ca498";
    return true;
  }
}

donateButton.addEventListener('click', () => {
  modal.style.display = 'flex';
  modalContent.style.display = 'flex';
  modalPay.style.display = 'none';
});

closeModal.forEach(close => close.addEventListener('click', () => {
  modal.style.display = "none";
}));

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

nextButton.addEventListener('click', () => {
  let checkInput = true;
  if (!validateInput(inputArray[0])) {
    checkInput = false;
  }
  if (checkInput) {
    modalContent.style.display = 'none';
    modalPay.style.display = 'flex';
  } else {
    alert('Please fill in all required fields!');
  }
});

payButton.addEventListener('click', () => {
  let checkInputs = true;
  for (let i = 1; i < inputArray.length; i++) {
    if (!validateInput(inputArray[i])) {
      checkInputs = false;
    }
  }
  if (checkInputs) {
    modal.style.display = 'none';
    alert('Thank you for your donation!');
    inputFields.forEach(input => input.value = '');
  } else {
    alert('Please fill in all required fields!');
  }
});
