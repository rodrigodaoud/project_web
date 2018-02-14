'use strict';

// User Profile Menu
$('.user-photo').click(function () {
  $(this).toggleClass('active');
  $('.user-menu').slideToggle('slow');
});

// Slideshow Index Page
$('.slideshow > .slides:gt(0)').hide();

setInterval(function () {
  $('.slideshow > .slides:first')
    .fadeOut(1000)
    .next()
    .fadeIn(1000)
    .end()
    .appendTo('.slideshow');
}, 6000);

// Filter Places
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

// Thumbnail Slider

$(document).ready(function(){
  $('.your-class').slick({
    setting-name: setting-value
  });
});

$('.slider-for').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: '.slider-nav'
});

$('.slider-nav').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: '.slider-for',
  dots: true,
  centerMode: true,
  focusOnSelect: true
});
