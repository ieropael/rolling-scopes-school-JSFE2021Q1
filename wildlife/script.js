let arrowRight = document.querySelector(".arrow-right");
let arrowLeft = document.querySelector(".arrow-left"); 
let slides = document.querySelectorAll(".articles__slide");
let i = 0;
arrowRight.addEventListener("click", function () {
  if (i < 3) {
    slides[i].classList.remove("visible");
    slides[i + 3].classList.add("visible");
    i++;
  } else {
    i = 3;
  }
})
arrowLeft.addEventListener("click", function () {
  if (i < 1) {
    i = 0;
  } else {
    slides[i - 1].classList.add("visible");
    slides[i + 2].classList.remove("visible");
    i--;
  }
})