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
