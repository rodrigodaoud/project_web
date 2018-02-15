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

// Slick Slider

$('.slider-single').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  fade: false,
  adaptiveHeight: true,
  infinite: false,
  useTransform: true,
  speed: 400,
  cssEase: 'cubic-bezier(0.77, 0, 0.18, 1)'
});

$('.slider-nav')
  .on('init', function (event, slick) {
    $('.slider-nav .slick-slide.slick-current').addClass('is-active');
  })
  .slick({
    slidesToShow: 7,
    slidesToScroll: 7,
    dots: false,
    focusOnSelect: false,
    infinite: false,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5
      }
    }, {
      breakpoint: 640,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4
      }
    }, {
      breakpoint: 420,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    }]
  });

$('.slider-single').on('afterChange', function (event, slick, currentSlide) {
  $('.slider-nav').slick('slickGoTo', currentSlide);
  var currrentNavSlideElem = '.slider-nav .slick-slide[data-slick-index="' + currentSlide + '"]';
  $('.slider-nav .slick-slide.is-active').removeClass('is-active');
  $(currrentNavSlideElem).addClass('is-active');
});

$('.slider-nav').on('click', '.slick-slide', function (event) {
  event.preventDefault();
  var goToSingleSlide = $(this).data('slick-index');

  $('.slider-single').slick('slickGoTo', goToSingleSlide);
});

// MAP INFO

// function main () {
//   const placeName = myPlaces[0].name;

//   function initMap () {
//     let myMarker;
//     const mapOptions = {
//       zoom: 16,
//       center: {
//         lat: 41.3977381,
//         lng: 2.190471916}
//     };
//     // --- center the map on the current location of user (if doesnt fail)
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         mapOptions.center = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude};
//         map.setCenter(mapOptions.center);
//       });
//     }
//     const map = new google.maps.Map(document.getElementById('map'), mapOptions);

//     // Create a new marker for the user location
//     function createMyMarker () {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((position) => {
//           const pos = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//           };

//           let icon = {
//             url: '../images/currentpositionmarker.png',
//             scaledSize: new google.maps.Size(20, 20)
//           };

//           myMarker = new google.maps.Marker({
//             position: pos,
//             icon: icon,
//             map: map
//           });
//           // --- map.setCenter(pos); center the map on the current location marker
//         });
//       }
//     };

//     createMyMarker();

//     // --- pending, update current location :) <<-----------------------------------------------------------------------------------
//     // setInterval(() => {
//     //   createMyMarker();
//     //   // destroy myMarker;
//     // }, 5000);

//     // --- lop to create markers for the bars location and infoWindow
//     // --- create infoWindow with the content
//     for (let i = 0; i < myPlaces.length; i++) {
//       let contentString = myPlaces[i].name;
//       const infoWindow = new google.maps.InfoWindow(
//         {content: contentString});

//         // --- create markers for each bar
//       const placesMarker = new google.maps.Marker({
//         position: {
//           lat: myPlaces[i].location.coordinates[0],
//           lng: myPlaces[i].location.coordinates[1]
//         },
//         // --- icon: icon, place to change icon
//         map: map,
//         label: myPlaces[i].type
//       });

//       // --- bind each infowindow with each bar´s marker and add event listener to display and hide the infowindow
//       infoWindow.setPosition({
//         lat: myPlaces[i].location.coordinates[0],
//         lng: myPlaces[i].location.coordinates[1]
//       });
//       placesMarker.addListener('click', () => {
//         if (!placesMarker.open) {
//           infoWindow.open(map, placesMarker);
//           placesMarker.open = true;
//         } else {
//           infoWindow.close();
//           placesMarker.open = false;
//         }
//         google.maps.event.addListener(map, 'click', () => {
//           infoWindow.close();
//           placesMarker.open = false;
//         });
//       });
//     }
//   }
//   initMap();
// }

// window.onload = main;
