const piano = document.querySelector('.piano');
const pianoKeys = document.querySelectorAll('.piano-key');

const notes = document.querySelector('.btn-notes');
const letters = document.querySelector('.btn-letters');

const fullscreenButton = document.querySelector('.fullscreen');

let mousePressed = false;

function startCorrespondOver(event) {
  mousePressed = true;
  startSound(event);
  pianoKeys.forEach((elem) => {
    elem.addEventListener('mousemove', (event) => {
      if (mousePressed && !event.target.classList.contains('piano-key-active')) {
        startSound(event);
      }
    });
    elem.addEventListener('mouseout', stopSound);
  });
}

function stopCorrespondOver() {
  mousePressed = false;
  pianoKeys.forEach((elem) => {
    elem.removeEventListener('mouseover', startSound);
    stopSound();
  });
}

function startSound(event) {
  if (event.target.classList.contains('piano-key')) {
    event.target.classList.add('piano-key-active');
    const note = event.target.dataset.note;
    const src = `assets/audio/${note}.mp3`;
    playAudio(src);
  } else {
    pianoKeys.forEach((elem) => {
      const key = `Key${elem.dataset.letter}`;
      const note = elem.dataset.note;
      const src = `assets/audio/${note}.mp3`;
      if (event.code == key) {
        elem.classList.add('piano-key-active');
        playAudio(src);
      }
    });
  }
}

function stopSound() {
  pianoKeys.forEach((elem) => {
    elem.classList.remove('piano-key-active');
  });
}

function playAudio(src) {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

piano.addEventListener('mousedown', startCorrespondOver);
document.addEventListener('mouseup', stopCorrespondOver);

window.addEventListener('keydown', (event) => {
  if (event.repeat) {
    return;
  }
  startSound(event);
});

window.addEventListener('keyup', () => {
  pianoKeys.forEach((elem) => {
    elem.classList.remove('piano-key-active');
  });
});

notes.addEventListener('click', () => {
  notes.classList.add('btn-active');
  letters.classList.remove('btn-active');
  pianoKeys.forEach((elem) => {
    elem.classList.remove('letter');
  });
});

letters.addEventListener('click', () => {
  letters.classList.add('btn-active');
  notes.classList.remove('btn-active');
  pianoKeys.forEach((elem) => {
    elem.classList.add('letter');
  });
});

fullscreenButton.addEventListener('click', () => {
  toggleFullScreen();
});
