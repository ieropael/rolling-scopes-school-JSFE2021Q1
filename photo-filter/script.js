const inputs = document.querySelectorAll('.filters input');

function handleUpdate() {
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
  this.nextElementSibling.value = this.value;
}

inputs.forEach(input => input.addEventListener('input', handleUpdate));
