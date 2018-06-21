<template>
  <div>
    <div>
      <gmap-autocomplete
        @place_changed="setPlace" style="width: 300px">
      </gmap-autocomplete>
      <button  class="btn btn-sm btn-primary"
               style="background-color: #1991eb;
                      margin-bottom: 5px"
               @click="addMarker">Add</button>
    </div>
    <gmap-map :center="center" :zoom="12" style="width:100%;  height: 250px;">
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable='true'
        :draggable='true'
        @dragend="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
// import {eventBus} from '../../main'

export default {
  name: 'GoogleMap',
  data () {
    return {
      // default to montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: -6.173608, lng: 106.834404 },
      markers: [],
      places: [],
      currentPlace: null
    }
  },

  mounted () {
    this.geolocate()
  },

  methods: {
    setPlace (place) {
      this.currentPlace = place
    },
    addMarker () {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
          pickupAddress: this.currentPlace.formatted_address
        }
        this.markers.push({ position: marker })
        this.places.push(this.currentPlace)
        this.center = marker
        this.currentPlace = null

        console.log(marker)
        this.$store.commit('map/postMap', marker)
        // eventBus.$emit('map/postMap', marker)
      }
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    }
  }
}
</script>
