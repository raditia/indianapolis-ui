<template>
   <div class="modal fade" id="recommendationEditModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title" id="modalLabel"> CONFIRM DETAIL</h5>
            </div>
            <div class="modal-body">
              <div v-for="(fleet, index) in this.recommendationResult.fleetResponseList"
                   :key="index" class="row" style="margin-bottom: 8px; margin-right: 4px">
                <div class="col-md-4">
                  <select class="form-control" id="logisticProvider" v-model="logisticVendorChoiceList[index]">
                    <option v-for="(logisticVendor, index) in fleet.logisticVendorResponseList"
                            :key="index"
                            :value="logisticVendor.id">
                      {{ logisticVendor.name }}
                    </option>
                  </select>
                </div>
                <div class="col-md-8 box-fleet">
                  {{ fleet.fleetName }}
                </div>
              </div>
            </div>
            <div class="modal-footer">
                <button type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                        @click="resetLogisticVendorChoiceList">Close</button>
                <button type="button"
                        class="btn btn-primary"
                        @click="chooseRecommendation">CONFIRM</button>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
  name: 'RecommendationEditModal',
  data () {
    return {
      logisticVendorChoiceList: [],
      fleetChoiceRequestList: [{
        logisticVendorId: '',
        fleetId: ''
      }],
      pickupChoiceRequest: {}
    }
  },
  props: {
    recommendationResult: {
      id: String,
      fleetResponseList: [{
        fleetId: String,
        fleetName: String,
        logisticVendorResponseList: [{
          id: String,
          name: String
        }]
      }]
    }
  },
  methods: {
    resetLogisticVendorChoiceList: function () {
      this.logisticVendorChoiceList = []
    },
    chooseRecommendation: function () {
      for (let i = 0; i < this.recommendationResult.fleetResponseList.length; i++) {
        this.fleetChoiceRequestList[i] = {
          logisticVendorId: this.logisticVendorChoiceList[i],
          fleetId: this.recommendationResult.fleetResponseList[i].fleetId
        }
      }
      this.pickupChoiceRequest = {
        recommendationResultId: this.recommendationResult.id,
        fleetChoiceRequestList: this.fleetChoiceRequestList
      }
      this.$store.dispatch(
        'recommendation/doPostRecommendation',
        this.pickupChoiceRequest
      )
      window.location.href = '/manage-cff'
    }
  }
}
</script>

<style scoped>
  .box-fleet {
    text-align: center;
    background-color: #D9D9D9;
    padding: 4px 4px 4px 4px;
    border-radius: 2px;
    font-weight: bold;
  }
</style>
