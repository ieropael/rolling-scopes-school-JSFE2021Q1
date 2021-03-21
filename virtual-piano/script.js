const piano = document.querySelector('.piano');
const pianoKeys = document.querySelectorAll('.piano-key');

function playAudio(src) {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}

piano.addEventListener('mousedown', (event) => {
  if (event.target.classList.contains('piano-key')) {
    const note = event.target.dataset.note;
    const src = `assets/audio/${note}.mp3`;
    playAudio(src);
  }
});

piano.addEventListener('mousedown', (event) => {
  if (event.target.classList.contains('piano-key')) {
    pianoKeys.forEach((elem) => {
      if (elem.classList.contains('piano-key-active')) {
        elem.classList.remove('piano-key-active');
      }
    });
    event.target.classList.add('piano-key-active');
  }
});

window.addEventListener('keydown', (event) => {
  pianoKeys.forEach((elem) => {
    const key = `Key${elem.dataset.letter}`;
    const note = elem.dataset.note;
    const src = `assets/audio/${note}.mp3`;
    if (event.code == key) {
      playAudio(src);
    }
  });
});
