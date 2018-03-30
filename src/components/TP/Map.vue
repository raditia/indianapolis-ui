<!--<template>-->
  <!--<div>-->
    <!--<input id="pac-input" class="controls" type="text" placeholder="Search Box">-->
    <!--<div id="map"></div>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
  <!--name: 'Map',-->
  <!--props: ['name'],-->
  <!--data: function () {-->
    <!--return {-->
      <!--mapName: this.name + '-map'-->
    <!--}-->
  <!--},-->
  <!--mounted: function () {-->
    <!--var map = new google.maps.Map(document.getElementById('map'), {-->
      <!--center: {lat: -33.8688, lng: 151.2195},-->
      <!--zoom: 13,-->
      <!--mapTypeId: 'roadmap'-->
    <!--});-->

    <!--// Create the search box and link it to the UI element.-->
    <!--var input = document.getElementById('pac-input');-->
    <!--var searchBox = new google.maps.places.SearchBox(input);-->
    <!--map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);-->

    <!--// Bias the SearchBox results towards current map's viewport.-->
    <!--map.addListener('bounds_changed', function() {-->
      <!--searchBox.setBounds(map.getBounds());-->
    <!--});-->

    <!--var markers = [];-->
    <!--// Listen for the event fired when the user selects a prediction and retrieve-->
    <!--// more details for that place.-->
    <!--searchBox.addListener('places_changed', function () {-->
      <!--var places = searchBox.getPlaces();-->

      <!--if (places.length == 0) {-->
        <!--return;-->
      <!--}-->

      <!--// Clear out the old markers.-->
      <!--markers.forEach(function(marker) {-->
        <!--marker.setMap(null);-->
      <!--});-->
      <!--markers = [];-->

      <!--// For each place, get the icon, name and location.-->
      <!--var bounds = new google.maps.LatLngBounds();-->
      <!--places.forEach(function(place) {-->
        <!--if (!place.geometry) {-->
          <!--console.log("Returned place contains no geometry");-->
          <!--return;-->
        <!--}-->
        <!--var icon = {-->
          <!--url: place.icon,-->
          <!--size: new google.maps.Size(71, 71),-->
          <!--origin: new google.maps.Point(0, 0),-->
          <!--anchor: new google.maps.Point(17, 34),-->
          <!--scaledSize: new google.maps.Size(25, 25)-->
        <!--};-->

        <!--// Create a marker for each place.-->
        <!--markers.push(new google.maps.Marker({-->
          <!--map: map,-->
          <!--icon: icon,-->
          <!--title: place.name,-->
          <!--position: place.geometry.location-->
        <!--}));-->

        <!--if (place.geometry.viewport) {-->
          <!--// Only geocodes have viewport.-->
          <!--bounds.union(place.geometry.viewport);-->
        <!--} else {-->
          <!--bounds.extend(place.geometry.location);-->
        <!--}-->
      <!--});-->
      <!--map.fitBounds(bounds);-->
    <!--});-->
  <!--}-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
  <!--/* Always set the map height explicitly to define the size of the div-->
       <!--* element that contains the map. */-->
  <!--#map {-->
    <!--height: 100%;-->
  <!--}-->
  <!--/* Optional: Makes the sample page fill the window. */-->
  <!--html, body {-->
    <!--height: 100%;-->
    <!--margin: 0;-->
    <!--padding: 0;-->
  <!--}-->
  <!--.controls {-->
    <!--margin-top: 10px;-->
    <!--border: 1px solid transparent;-->
    <!--border-radius: 2px 0 0 2px;-->
    <!--box-sizing: border-box;-->
    <!-- -moz-box-sizing: border-box;-->
    <!--height: 32px;-->
    <!--outline: none;-->
    <!--box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);-->
  <!--}-->

  <!--#pac-input {-->
    <!--background-color: #fff;-->
    <!--font-family: Roboto;-->
    <!--font-size: 15px;-->
    <!--font-weight: 300;-->
    <!--margin-left: 12px;-->
    <!--padding: 0 11px 0 13px;-->
    <!--text-overflow: ellipsis;-->
    <!--width: 300px;-->
  <!--}-->

  <!--#pac-input:focus {-->
    <!--border-color: #4d90fe;-->
  <!--}-->

  <!--.pac-container {-->
    <!--font-family: Roboto;-->
  <!--}-->

  <!--#type-selector {-->
    <!--color: #fff;-->
    <!--background-color: #4d90fe;-->
    <!--padding: 5px 11px 0px 11px;-->
  <!--}-->

  <!--#type-selector label {-->
    <!--font-family: Roboto;-->
    <!--font-size: 13px;-->
    <!--font-weight: 300;-->
  <!--}-->
  <!--#target {-->
    <!--width: 345px;-->
  <!--}-->
<!--</style>-->

data: function () {
return {
mapName: this.name + "-map",
markerCoordinates: [{
latitude: 51.501527,
longitude: -0.1921837
}, {
latitude: 51.505874,
longitude: -0.1838486
}, {
latitude: 51.4998973,
longitude: -0.202432
}],
map: null,
bounds: null,
markers: []
}
}
These can be empty to start with as we will initialised them within the mounted event. Here, instead of creating new constants, we will need to update our code to instead reference the appropriate instance object. For example, our map creation line should now read:

this.map = new google.maps.Map(element, options);
We also want to add each new marker to the this.markers object, so that we can reference them at a later stage if necessary.

Our final code is as follows:

<template>
  <div class="google-map" :id="mapName"></div>
</template>
<script>
export default {
  name: 'google-map',
  props: ['name'],
  data: function () {
    return {
      mapName: this.name + '-map',
      markerCoordinates: [{
        latitude: 51.501527,
        longitude: -0.1921837
      }
      ],
      map: null,
      bounds: null,
      markers: []
    }
  },
  mounted: function () {
    this.bounds = new google.maps.LatLngBounds()
    const element = document.getElementById(this.mapName)
    const mapCentre = this.markerCoordinates[0]
    const options = {
      center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude)
    }
    this.map = new google.maps.Map(element, options)
    this.markerCoordinates.forEach((coord) => {
      const position = new google.maps.LatLng(coord.latitude, coord.longitude)
      const marker = new google.maps.Marker({
        position,
        map: this.map
      })
      this.markers.push(marker)
      this.map.fitBounds(this.bounds.extend(position))
    })
  }
}
</script>
<style scoped>
  .google-map {
    width: auto;
    height: 100%;
    margin: 0 auto;
    background: gray;
  }
</style>
