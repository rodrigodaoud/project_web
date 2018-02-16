'use strict';

// MAP INFO

function main () {
  if (!Array.isArray(myPlaces)) {
    myPlaces = [myPlaces];
  }
  const placeName = myPlaces;

  function initMap () {
    let myMarker;
    const mapOptions = {
      zoom: 12,
      center: {
        lat: 41.3977381,
        lng: 2.190471916}
    };
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    if (myPlaces.length === 1) {
      mapOptions.center = {
        lat: myPlaces[0].address.coordinates[0],
        lng: myPlaces[0].address.coordinates[1]
      };
      map.setCenter(mapOptions.center);
    } else if (myPlaces.length > 2) {
      // --- center the map on the current location of user (if doesnt fail)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          mapOptions.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          map.setCenter(mapOptions.center);
        });
      }
    }


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

    // --- create infoWindow with the content
    for (let i = 0; i < myPlaces.length; i++) {
      let contentString = '<h3 class="map-info-box">Name: ' + myPlaces[i].name + '</h3>';
      let placeAddress = '<h3 class="map-info-box">Address: ' + myPlaces[i].address.name + '</h3>';
      const infoWindow = new google.maps.InfoWindow(
        {content: contentString + placeAddress});

      // --- create markers for each bar
      const placesMarker = new google.maps.Marker({
        position: {
          lat: myPlaces[i].address.coordinates[0],
          lng: myPlaces[i].address.coordinates[1]
        },
        icon: {
          url: '../images/' + myPlaces[i].type + '-img.png',
          scaledSize: new google.maps.Size(20, 20),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 32)
        },
        map: map
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
