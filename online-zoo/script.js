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
    item.dataset.pos = getPos(itemPos, newActivePos)
  });
};

function getPos(current, active) {
  const diff = current - active;

  if (Math.abs(current - active) > 2) {
    return -current
  }

  return diff;
}

function startCarousel(event) {
  update(event.target.parentNode);
  
  carouselList.removeEventListener('click', startCarousel);
  setTimeout(function() {
    carouselList.addEventListener('click', startCarousel);
  }, 500);
}

carouselList.addEventListener('click', startCarousel);

// MODAL WINDOW

function maxLengthCheck(object) {
  if (object.value.length > object.max.length)
    object.value = object.value.slice(0, object.max.length)
}
  
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

const modal = document.querySelector('.modal');
const donateButton = document.querySelector('.footer__button');
const closeModal = document.querySelectorAll('.modal__close');
const nextButton = document.querySelector('.modal__button');
const modalPay = document.querySelector('.modal__pay');
const modalContent = document.querySelector('.modal__content');
const payButton = document.querySelector('.modal__pay-button');

donateButton.addEventListener('click', () => {
  modal.style.display = 'block';
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
  modalContent.style.display = 'none';
  modalPay.style.display = 'flex';
});

payButton.addEventListener('click', () => {
    modal.style.display = "none";
    alert("Thank you for your donation");
});
