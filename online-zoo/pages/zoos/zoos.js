const infoBlock = document.querySelectorAll('.info__block');

function toggleSpoiler(spoilerElement) {
  const infoText = spoilerElement.querySelector('.info__text');
  const infoButton = spoilerElement.querySelector('.info__button');
  spoilerElement.classList.toggle('block-expanded');
  infoText.classList.toggle('text-expanded');
  infoButton.classList.toggle('button-expanded');
}

infoBlock.forEach(block => block.addEventListener('click', event => toggleSpoiler(event.target.closest('.info__block'))));

const changeVideoButton = document.querySelectorAll('.video__button');

changeVideoButton.forEach(button => button.addEventListener('click', event => {
  let mainVideo = document.querySelector('.video__main').querySelector('.video__iframe');
  let otherVideo = event.target.parentNode.querySelector('.video__iframe');
  let tempContent = mainVideo.outerHTML;
  mainVideo.outerHTML = otherVideo.outerHTML;
  otherVideo.outerHTML = tempContent;
}));


const items = document.querySelectorAll('.video__player');
let currentItem = 0;
let forward = true;

function nextItem(n) {
  items[n].classList.remove('active');
  items[n + 4].classList.add('active');
}

function prevItem(n) {
  items[n].classList.add('active');
  items[n + 4].classList.remove('active');
}

let autoCarousel = setInterval(function() {
  if (currentItem + 4 > items.length - 1) {
    forward = false;
  }
  if (currentItem == 0) {
    forward = true;
  }
  if (forward) {
    nextItem(currentItem);
    currentItem++;
  } else {
    currentItem--;
    prevItem(currentItem);
  }
}, 5000);

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
