/**
 * Created by xuanjinliang on 2019/02/10.
 */

import {gmapApi} from 'vue2-google-maps';

class DisplayRoute {
  constructor(map) {
    this.google = gmapApi();
    this.directionsService = new this.google.maps.DirectionsService;
    this.directionsDisplay = new this.google.maps.DirectionsRenderer;
    this.directionsDisplay.setMap(map);
  }

  // BICYCLING, DRIVING, TRANSIT, WALKING
  calculateAndDisplayRoute(origin, destination, travelMode = 'WALKING') {
    this.directionsService.route({
      origin,
      destination,
      travelMode
    }, (response, status) => {
      console.log(response, status);
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
}

export default DisplayRoute;