<template>
  <div class="container">
    <div class="col-md-12">
      <div class="box-header box-recommendation">
        <div class="container" style="padding: 50px 30px 30px 30px">
          <div class="row">
            <div class="col-md-5">
              <h5>Destination: <b style="color: #0d6aad">{{ recommendation.warehouseName }}</b></h5>
            </div>
            <div class="col-md-4">
              <h5>Total CBM: <b style="color: #0d6aad">{{ recommendation.cbmTotal }} CBM</b> </h5>
            </div>
          </div>

          <hr>

          <div class="row">
            <div v-for="(recommendationResult, index) in this.recommendation.recommendationResultResponseList"
                 :key="recommendationResult.id" class="col-md-4">
              <h5 style="text-align: center">option #{{index+1}}</h5>
              <div v-for="(fleet, index) in recommendationResult.fleetResponseList"
                   :key="index"
                   class="box-fleet">
                {{ fleet.fleetName }}
              </div>
              <!--<select class="form-control" v-for="(fleet, index) in recommendationResult.fleetResponseList"-->
                      <!--:key="index"-->
                      <!--:value="recommendationResult.id">-->
                <!--<option :value="recommendationResult.id">-->
                  <!--{{ fleet.fleetName }}-->
                <!--</option>-->
              <!--</select>-->
              <br>
              <button class="btn btn-primary" style="width: 100%"
                      v-bind:key="recommendationResult.id"
                      data-toggle="modal"
                      data-target="#callLogisticModal"
                      @click="getOption(recommendationResult)">PILIH</button>
            </div>
          </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="callLogisticModal" tabindex="-1" role="dialog" aria-labelledby="callLogisticLabel"
             aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <h5 style="color: #0d6aad;text-align: center">You need to call your third party logistics in order to
                check the fleets availability</h5>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <!-- <button type="button" class="btn btn-primary" data-toggle="modal"
                        data-target="#recommendationEditModal">Yes I did!</button> -->
                <a href="#recommendationEditModal" role="button" class="btn btn-primary"
                 data-dismiss="modal" data-toggle="modal">Yes I did!</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <RecommendationEditModal :recommendationResult="clickedRecommendationResult" :logisticVendor="logisticVendors"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import RecommendationEditModal from '@/components/SCM/RecommendationEditModal'

export default {
  name: 'Recommendation',
  data () {
    return {
      warehouseId: '',
      clickedRecommendationResult: {
        id: '',
        fleetResponseList: []
      },
      fleetList: {}
    }
  },
  components: {
    RecommendationEditModal
  },
  computed: {
    ...mapGetters({
      recommendation: 'recommendation/recommendation',
      logisticVendors: 'logistic_vendor/logisticVendorList'
    })
  },
  mounted () {
    this.getLogisticVendorList()
    this.getRecommendation()
  },
  created () {
    this.warehouseId = this.$route.params.warehouseId
  },
  methods: {
    getRecommendation: function () {
      this.$store.dispatch(
        'recommendation/doGetRecommendation',
        this.warehouseId
      )
    },
    getLogisticVendorList: function () {
      this.$store.dispatch(
        'logistic_vendor/doGetAllLogisticVendor'
      )
    },
    getOption: function (recommendationResult) {
      this.clickedRecommendationResult = recommendationResult
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
.box-fleet {
  width: 100%;
  text-align: center;
  background-color: #D9D9D9;
  padding: 8px 8px 8px 8px;
  margin-top: 8px;
  border-radius: 2px;
  font-weight: bold;
}

</style>
