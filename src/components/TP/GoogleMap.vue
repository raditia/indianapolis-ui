<template>
  <div>
    <div>
      <gmap-autocomplete
        @place_changed="setPlace" @keyup.enter.native="addMarker">
      </gmap-autocomplete>
      <button  class="btn btn-primary" style="background-color: #1991eb" @click="addMarker">Add</button>
    </div>
    <gmap-map :center="center" :zoom="12" style="width:100%;  height: 250px;">
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
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
          lng: this.currentPlace.geometry.location.lng()
        }
        this.markers.push({ position: marker })
        this.places.push(this.currentPlace)
        this.center = marker
        this.currentPlace = null

        console.log(marker)
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
