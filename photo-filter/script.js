const inputs = document.querySelectorAll('.filters input');
const resetButton = document.querySelector('.btn-reset');
const nextButton = document.querySelector('.btn-next');
const image = document.querySelector('img');
const base = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
const images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;

function handleUpdate() {
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
  this.nextElementSibling.value = this.value;
}

function reset() {
  inputs.forEach(input => {
    const suffix = input.dataset.sizing || '';
    input.value = input.min;
    input.nextElementSibling.value = input.min;
    if (input.name === 'saturate') {
      input.value = 100;
      input.nextElementSibling.value = 100;
    }
    document.documentElement.style.setProperty(`--${input.name}`, input.value + suffix);
  });
}

function viewImage(src) {  
  const img = new Image();
  img.src = src;
  img.onload = () => {      
    image.src = src;
  };
}

function getImage() {
  const index = i % images.length;
  const morning = new Date();
  const day = new Date();
  const evening = new Date();
  const night = new Date();
  const time = new Date();
  time.setHours(19, 0, 0);
  let timeOfDay = '';
  morning.setHours(6, 0, 0);
  day.setHours(12, 0, 0);
  evening.setHours(18, 0, 0);
  night.setHours(0, 0, 0);
  if (time >= morning && time < day) {
    timeOfDay = 'morning/';
  }
  if (time >= day && time < evening) {
    timeOfDay = 'day/';
  }
  if (time >= evening) {
    timeOfDay = 'evening/';
  }
  if (time >= night && time < morning) {
    timeOfDay = 'night/';
  }
  const imageSrc = base + timeOfDay + images[index];
  viewImage(imageSrc);
  i++;
  nextButton.disabled = true;
  setTimeout(function() {
    nextButton.disabled = false;
  }, 1000);
}

inputs.forEach(input => input.addEventListener('input', handleUpdate));
resetButton.addEventListener('click', reset);
nextButton.addEventListener('click', getImage);
