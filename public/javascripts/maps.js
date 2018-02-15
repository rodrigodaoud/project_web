'use strict';

// MAP INFO

function main () {
  // if (myPlaces = [])
  const placeName = myPlaces;

  function initMap () {
    let myMarker;
    const mapOptions = {
      zoom: 16,
      center: {
        lat: 41.3977381,
        lng: 2.190471916}
    };
    // --- center the map on the current location of user (if doesnt fail)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        mapOptions.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude};
        map.setCenter(mapOptions.center);
      });
    }
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Create a new marker for the user location
    function createMyMarker () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          let icon = {
            url: '../images/currentpositionmarker.png',
            scaledSize: new google.maps.Size(20, 20)
          };

          myMarker = new google.maps.Marker({
            position: pos,
            icon: icon,
            map: map
          });
          // --- map.setCenter(pos); center the map on the current location marker
        });
      }
    };

    createMyMarker();

    // --- pending, update current location :) <<-----------------------------------------------------------------------------------
    // setInterval(() => {
    //   createMyMarker();
    //   // destroy myMarker;
    // }, 5000);

    // --- lop to create markers for the bars location and infoWindow
    // --- create infoWindow with the content
    for (let i = 0; i < myPlaces.length; i++) {
      let contentString = myPlaces[i].name;
      const infoWindow = new google.maps.InfoWindow(
        {content: contentString});

      // --- create markers for each bar
      const placesMarker = new google.maps.Marker({
        position: {
          lat: myPlaces[i].address.coordinates[0],
          lng: myPlaces[i].address.coordinates[1]
        },
        // --- icon: icon, place to change icon
        map: map,
        label: myPlaces[i].type
      });

      // --- bind each infowindow with each bar´s marker and add event listener to display and hide the infowindow
      infoWindow.setPosition({
        lat: myPlaces[i].address.coordinates[0],
        lng: myPlaces[i].address.coordinates[1]
      });
      placesMarker.addListener('click', () => {
        if (!placesMarker.open) {
          infoWindow.open(map, placesMarker);
          placesMarker.open = true;
        } else {
          infoWindow.close();
          placesMarker.open = false;
        }
        google.maps.event.addListener(map, 'click', () => {
          infoWindow.close();
          placesMarker.open = false;
        });
      });
    }
  }
  initMap();
}

window.onload = main;
