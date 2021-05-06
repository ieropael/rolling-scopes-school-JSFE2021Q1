// HOW IT WORKS CAROUSEL

const carouselList = document.querySelector('.how-it-works');
const carouselItems = document.querySelectorAll('.how-it-works__item');
const elems = Array.from(carouselItems);

function update(newActive) {
  const newActivePos = newActive.dataset.pos;

  const current = elems.find((elem) => elem.dataset.pos == 0);
  const prev = elems.find((elem) => elem.dataset.pos == -1);
  const next = elems.find((elem) => elem.dataset.pos == 1);
  const first = elems.find((elem) => elem.dataset.pos == -2);
  const last = elems.find((elem) => elem.dataset.pos == 2);

  [current, prev, next, first, last].forEach(item => {
    let itemPos = item.dataset.pos;
    item.dataset.pos = getPos(itemPos, newActivePos);
  });
};

function getPos(current, active) {
  const diff = current - active;

  if (Math.abs(diff) > 2) {
    return diff > 0 ? diff - carouselItems.length : diff + carouselItems.length;
  }

  return diff;
}

function startCarousel(event) {
  if (event.target.classList.contains('how-it-works__picture')) {
    update(event.target.parentNode);
  }

  carouselList.removeEventListener('click', startCarousel);

  setTimeout(function() {
    carouselList.addEventListener('click', startCarousel);
  }, 500);
}

carouselList.addEventListener('click', startCarousel);

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

// PETS IN ZOO CAROUSEL

const items = document.querySelectorAll('.pets-in-zoo__slides');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('active', direction);
  });
}

function showItem(direction) {
  items[currentItem].classList.add('next', direction);
  items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('next', direction);
    this.classList.add('active');
    isEnabled = true;
  });
}

function prevItem(n) {
  hideItem('to-right');
  changeCurrentItem(n - 1);
  showItem('from-left');
}

function nextItem(n) {
  hideItem('to-left');
  changeCurrentItem(n + 1);
  showItem('from-right');
}

document.querySelector('.pets-in-zoo__left').addEventListener('click', function() {
  if (isEnabled) {
    nextItem(currentItem);
  }
});

document.querySelector('.pets-in-zoo__right').addEventListener('click', function() {
  if (isEnabled) {
    prevItem(currentItem);
  }
});
