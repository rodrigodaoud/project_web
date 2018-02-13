'use strict';

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides (n) {
  showSlides(slideIndex += n);
}

function currentSlide (n) {
  showSlides(slideIndex = n);
}

function showSlides (n) {
  var i;
  var slides = document.getElementsByClassName('mySlides');
  var dots = document.getElementsByClassName('demo');
  // var captionText = document.getElementById('caption');
  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '');
  }
  slides[slideIndex - 1].style.display = 'block';
  dots[slideIndex - 1].className += ' active';
  // captionText.innerHTML = dots[slideIndex - 1].alt;
}

$('.user-photo').click(function () {
  $(this).toggleClass('active');
  $('.user-menu').slideToggle('slow');
});

filterSelection('all');

function filterSelection (c) {
  const x = document.getElementsByClassName('place');
  if (c == 'all') {
    c = '';
  }
  for (let i = 0; i < x.length; i++) {
    removeClass(x[i], 'show');
    if (x[i].className.indexOf(c) > -1) addClass(x[i], 'show');
  }
}

function addClass (element, name) {
  const arr1 = element.className.split(' ');
  const arr2 = name.split(' ');
  for (let i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) { element.className += ' ' + arr2[i]; }
  }
}

function removeClass (element, name) {
  const arr1 = element.className.split(' ');
  const arr2 = name.split(' ');
  for (let i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(' ');
}
