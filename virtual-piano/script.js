const piano = document.querySelector('.piano');
const pianoKeys = document.querySelectorAll('.piano-key');

const toggle = document.querySelector('.btn-container');
const toggleButtons = document.querySelectorAll('.btn');

const fullscreenButton = document.querySelector('.fullscreen');

function startCorrespondOver(event) {
  startSound(event);
  pianoKeys.forEach((elem) => {
    elem.addEventListener('mouseover', startSound);
    elem.addEventListener('mouseout', stopSound);
  });
}

function stopCorrespondOver() {
  pianoKeys.forEach((elem) => {
    elem.removeEventListener('mouseover', startSound);
    elem.classList.remove('piano-key-active');
  });
}

function startSound(event) {
  if (event.target.classList.contains('piano-key')) {
    event.target.classList.add('piano-key-active');
    const note = event.target.dataset.note;
    const src = `assets/audio/${note}.mp3`;
    playAudio(src);
  }
}

function stopSound(event) {
  if (event.target.classList.contains('piano-key')) {
    event.target.classList.remove('piano-key-active');
  }
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
  pianoKeys.forEach((elem) => {
    const key = `Key${elem.dataset.letter}`;
    const note = elem.dataset.note;
    const src = `assets/audio/${note}.mp3`;
    if (event.code == key) {
      playAudio(src);
      elem.classList.add('piano-key-active');
    }
  });
});

window.addEventListener('keyup', () => {
  pianoKeys.forEach((elem) => {
    elem.classList.remove('piano-key-active');
  });
});

toggle.addEventListener('click', (event) => {
  if (event.target.classList.contains('btn-notes')) {
    toggleButtons.forEach((elem) => {
      elem.classList.remove('btn-active');
    });
    event.target.classList.add('btn-active');
    pianoKeys.forEach((elem) => {
      elem.classList.remove('piano-key-letter');
    });
  };
  if (event.target.classList.contains('btn-letters')) {
    toggleButtons.forEach((elem) => {
      elem.classList.remove('btn-active');
    });
    event.target.classList.add('btn-active');
    pianoKeys.forEach((elem) => {
      elem.classList.add('piano-key-letter');
    });
  };
});

fullscreenButton.addEventListener('click', () => {
  toggleFullScreen();
});
