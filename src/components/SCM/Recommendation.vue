<template>
  <div class="container">
    <div class="col-md-12">
      <div class="box-header box-recommendation">
        <div class="container" style="padding-top: 30px">
          <div class="row">
            <div class="col-md-4">
              <!--<h5>Destination: {{ recommendation.warehouseName }}</h5>-->
              <h5>Destination: <b style="color: #0d6aad">Cawang</b></h5>
            </div>
            <div class="col-md-4">
              <h5>Total CBM: <b style="color: #0d6aad">12 CBM</b> </h5>
            </div>
          </div>

          <hr>

          <div class="row">
            <div class="col-md-4">
              <h5 style="text-align: center">1st option</h5>
              <select class="form-control" id="firstOption">
                <option value="1 van">1 Van</option>
                <option value="2 van">2 Van</option>
              </select>
              <select class="form-control" id="firstOption">
                <option value="1 van">2 Motor</option>
                <option value="2 van">3 Motor</option>
              </select>

              <br>

              <button class="btn btn-primary">PILIH</button>
            </div>

            <div class="col-md-4">
              <h5 style="text-align: center"><b style="color: #0d6aad">Recommended</b></h5>
              <select class="form-control" id="firstOption">
                <option value="1 van">1 Van</option>
                <option value="2 van">2 Van</option>
              </select>
              <select class="form-control" id="firstOption">
                <option value="1 van">2 Motor</option>
                <option value="2 van">3 Motor</option>
              </select>
            </div>

            <div class="col-md-4">
              <h5 style="text-align: center">2nd option</h5>
              <select class="form-control" id="firstOption">
                <option value="1 van">1 Van</option>
                <option value="2 van">2 Van</option>
              </select>
              <select class="form-control" id="firstOption">
                <option value="1 van">2 Motor</option>
                <option value="2 van">3 Motor</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Recommendation',
  data () {
    return {
      data: {
        warehouseName: '',
        cbmTotal: '',
        fleetRecommendationResponseList: []
      }
    }
  },
  computed: {
    ...mapGetters({
      recommendation: 'recommendation/recommendation'
    })
  },
  mounted () {
    this.getRecommendation()
  },
  methods: {
    getRecommendation: function () {
      this.$store.dispatch('recommendation/doGetRecommendation')
    }
  }
}
</script>

<style scoped>
  .box-recommendation {
    width: 100%;
    height: auto;
    background-color: #ffffff;
    box-shadow: 1px 9px 4px 0 rgba(119, 151, 178, 0.16);
  }

  .btn-pilih {

  }
</style>
