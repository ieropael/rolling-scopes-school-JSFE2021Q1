const infoBlock = document.querySelectorAll('.info__block');

function toggleSpoiler(spoilerElement) {
  const infoText = spoilerElement.querySelector('.info__text');
  const infoButton = spoilerElement.querySelector('.info__button');
  spoilerElement.classList.toggle('block-expanded');
  infoText.classList.toggle('text-expanded');
  infoButton.classList.toggle('button-expanded');
}

infoBlock.forEach(block => block.addEventListener('click', event => toggleSpoiler(event.target.closest('.info__block'))));