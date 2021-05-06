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
