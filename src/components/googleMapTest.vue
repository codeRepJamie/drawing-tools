<template>
    <div class="content">
        <button class="btn" @click="startDraw">{{draw ? '可画' : '不可画'}}</button>
        <button class="btn" @click="editFun">{{isEditable ? '可编辑' : '不可编辑'}}</button>
        <button class="btn" @click="cancelFun">撤消</button>
        <button class="btn" @click="deleteFun">删除</button>
        <button class="btn" @click="getLatLngArray">获取经度与纬度数据</button>
        <GmapMap ref="mapRef" :options="{
                    clickableIcons: false,
                    fullscreenControl: false,
                    keyboardShortcuts: false,
                    mapTypeControl: false,
                    zoomControl: false,
                    panControl: false,
                    streetViewControl: false
                }"
                 :center="center"
                 :zoom="18"
                 map-type-id="terrain"
                 style="width: 1000px; height: 500px">
            <GmapMarker
                    :position="center"
                    :clickable="true"
                    :draggable="false"/>
        </GmapMap>
    </div>
</template>

<script>
  import { gmapApi } from 'vue2-google-maps'
  import DisplayRoute from './getPathMethod'
  // import SearchPlaceService from './searchPlaceService'
  import TrackLine from './trackLine'

  export default {
    name: 'googleMapTest',
    data () {
      return {
        center: { lat: 23.126333, lng: 113.380046 },
        isEditable: false,
        pathLength: 0,
        draw: false
      }
    },
    mounted () {
      this.$refs.mapRef.$mapPromise.then((map) => {
        this.map = map
        this.displayRoute = new DisplayRoute(map, [], {
          isEditable: this.isEditable,
          clickable: !this.draw
        })
        //this.map.addListener('click', this.handleClick.bind(this));

        //this.searchPlaceService = new SearchPlaceService(map);
        //this.searchPlace();
        /*this.trackLine = new TrackLine(map, [
          {lat: 23.126243, lng: 113.380245},
          {lat: 23.125963, lng: 113.380244},
          {lat: 23.125874, lng: 113.380230},
          {lat: 23.125925, lng: 113.379871}
        ]);*/

        //this.trackLine.setTrack();

        //this.trackLine.add({lat: 23.127370, lng: 113.375743})
        /*this.trackLine.add([
          {lat: 23.126394, lng: 113.377809},
          {lat: 23.127370, lng: 113.375743}
        ])*/

        this.trackLine = new TrackLine(map)

        this.trackLine.setTrack()

        gmapApi().maps.event.addListener(this.map, 'click', this.addLatLng.bind(this))
        gmapApi().maps.event.addListener(this.map, 'rightclick', this.rightEvent.bind(this))
      })
    },
    created () {

    },
    methods: {
      handleClick (e) {
        console.log(e, e.latLng.lat(), e.latLng.lng())
        this.displayRoute.calculateAndDisplayRoute(this.center, e.latLng)
      },
      searchPlace () {
        this.searchPlaceService.nearBySearch(this.center).then((result) => {
          console.log(result)
        }).catch((err) => {
          console.log(err)
        })
      },
      rightEvent () {
        this.draw = false
        this.trackLine.clickable(true)
        gmapApi().maps.event.clearListeners(this.map, 'mousemove')
        this.cancelFun()
      },
      moveLatLng (e) {
        let len = this.pathLength
        if(len < 1){
          len = 1
        }
        this.trackLine.setLatLng(len, e.latLng)
      },
      addLatLng (e) {
        if (!this.draw) {
          return
        }
        this.pathLength = this.trackLine.getPathLen()
        // console.log('length-->', this.pathLength)
        if (this.pathLength <= 0) {
          this.trackLine.addLatLng(e.latLng)
          gmapApi().maps.event.addListener(this.map, 'mousemove', this.moveLatLng.bind(this))
        } else {
          // console.log(this.pathLength - 1, e.latLng)
          this.trackLine.setLatLng(this.pathLength - 1, e.latLng)
        }
      },
      editFun () {
        this.isEditable = !this.isEditable
        this.trackLine.setEditable(this.isEditable)
      },
      cancelFun () {
        this.trackLine.deleteLatLng()
      },
      deleteFun () {
        this.trackLine.reset()
      },
      startDraw () {
        this.trackLine.clickable(this.draw)
        this.draw = !this.draw
      },
      getLatLngArray () {
        console.log(this.trackLine.getLatLngArray())
      }
    }
  }
</script>

<style scoped>
    .content {
        position: relative;
        width: auto;
        height: auto;
    }

    button {
        border: 1px solid #333;
        margin: 0 10px 10px;
    }
</style>