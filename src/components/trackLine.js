/**
 * Created by xuanjinliang on 2019/02/11.
 */

import { gmapApi } from 'vue2-google-maps'
import _ from 'lodash'

class TrackLine {
  constructor (map, flightPlanCoordinates = [], options = {}) {
    this.google = gmapApi()
    this.flightPlanCoordinates = flightPlanCoordinates
    this.map = map
    this.flightPath = null
    this.options = options
  }

  setTrack () {
    this.flightPath = new this.google.maps.Polyline(Object.assign({
      path: this.flightPlanCoordinates,
      geodesic: false,
      editable: false,
      clickable: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    }, this.options))

    this.flightPath.setMap(this.map)
  }

  getPathLen () {
    return this.flightPath.getPath().getLength()
  }

  add (coor) {
    if (!this.flightPath) {
      return
    }

    if (_.isPlainObject(coor)) {
      this.flightPlanCoordinates.push(coor)
    } else if (_.isArray(coor)) {
      this.flightPlanCoordinates = this.flightPlanCoordinates.concat(coor)
    }

    this.reset(this.flightPlanCoordinates)
  }

  setLatLng (num, latLng) {
    if (!_.isInteger(num) || !(latLng instanceof this.google.maps.LatLng)) {
      return
    }

    this.flightPath.getPath().setAt(num, latLng)
  }

  addLatLng (latLng) {
    if (!(latLng instanceof this.google.maps.LatLng)) {
      return
    }
    let path = this.flightPath.getPath()
    path.push(latLng)
  }

  reset (flightPlanCoordinates = []) {
    this.flightPath.setPath(flightPlanCoordinates)
  }

  setEditable (bool) {
    if (!_.isBoolean(bool)) {
      return
    }
    this.flightPath.setEditable(bool)
  }

  setOptions (obj) {
    if (!_.isPlainObject(obj)) {
      return
    }
    this.flightPath.setOptions(obj)
  }

  clickable (bool) {
    if (!_.isBoolean(bool)) {
      return
    }
    this.setOptions({'clickable': bool})
  }

  deleteLatLng (num) {
    const path = this.flightPath.getPath()
    const len = path.getLength()

    if (!_.isInteger(num)) {
      num = len - 1
    }

    if (len <= 0 || len <= num) {
      return
    }

    path.removeAt(num)
  }

  getLatLngArray () {
    return this.flightPath.getPath().getArray().map(obj => ({
      lat: obj.lat(),
      lng: obj.lng()
    }))
  }

  remove () {
    this.flightPath.setMap(null)
    this.flightPlanCoordinates = null
  }
}

export default TrackLine