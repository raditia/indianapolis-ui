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
                  <select :key="index" class="form-control" id="logisticProvider">
                    <option value="bes">
                      Blibli Express Service
                    </option>
                    <option value="jne">
                      JNE
                    </option>
                  </select>
                </div>
                <div class="col-md-8 box-fleet">
                  {{ fleet.fleetName }}
                </div>
              </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button"
                        class="btn btn-primary"
                        data-dismiss="modal"
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
    }
  },
  props: {
    recommendationResult: {
      id: String,
      fleetResponseList: [{
        fleetId: String,
        fleetName: String
      }]
    },
    logisticVendor: {
      id: String,
      name: String
    }
  },
  methods: {
    chooseRecommendation: function () {
      this.$store.dispatch(
        'recommendation/doPostRecommendation',
        this.recommendationResult.id
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
