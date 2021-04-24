const inputs = document.querySelectorAll('.filters input');

function handleUpdate() {
  this.nextElementSibling.value = this.value;
}

inputs.forEach(input => input.addEventListener('input', handleUpdate));
