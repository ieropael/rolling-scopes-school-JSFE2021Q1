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
