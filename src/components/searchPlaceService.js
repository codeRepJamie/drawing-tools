/**
 * Created by xuanjinliang on 2019/02/10.
 */

import {gmapApi} from 'vue2-google-maps';

class SearchPlaceService {
  constructor(map) {
    this.google = gmapApi();
    this.service = new this.google.maps.places.PlacesService(map);
  }

  search(query = '') {
    return new Promise((resolve, reject) => {
      this.service.findPlaceFromQuery({
        query,
        fields: ['name', 'geometry']
      }, (results, status) => {
        console.log('search=>', results, status);
        if (status === this.google.maps.places.PlacesServiceStatus.OK) {
          resolve(123);
        }

        reject(false);
      })
    })
  }

  nearBySearch(location, radius = 500) {
    return new Promise((resolve, reject) => {
      this.service.nearbySearch({
        location,
        radius
      }, (results, status, PlaceSearchPagination) => {
        console.log('search=>', results, status, PlaceSearchPagination);
        if (status === this.google.maps.places.PlacesServiceStatus.OK) {
          resolve(123);
        }

        reject(false);
      })
    })
  }
}

export default SearchPlaceService;