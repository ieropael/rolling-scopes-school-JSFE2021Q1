const inputs = document.querySelectorAll('.filters input');
const resetButton = document.querySelector('.btn-reset');

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

inputs.forEach(input => input.addEventListener('input', handleUpdate));
resetButton.addEventListener('click', reset);
