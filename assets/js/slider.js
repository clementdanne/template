// Fonctionnement slider

document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slides-wrapper .slider');
  const dots = document.querySelectorAll('.pagination-dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  }

  prevBtn.addEventListener('click', function() {
    let index = currentSlide - 1;
    if (index < 0) index = slides.length - 1;
    showSlide(index);
  });

  nextBtn.addEventListener('click', function() {
    let index = currentSlide + 1;
    if (index >= slides.length) index = 0;
    showSlide(index);
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      showSlide(index);
    });
  });

  showSlide(0);
});
