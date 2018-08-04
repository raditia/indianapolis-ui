<template>
   <div class="modal fade" id="recommendationEditModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title" id="modalLabel"> CONFIRM DETAIL</h5>
            </div>
            <div class="modal-body">
               <div class="row">
                  <div class="col-md-4">
                    <select class="form-control" id="logisticProvider">
                      <option value="JNE">JNE</option>
                      <option value="BES">BES</option>
                    </select>
                  </div>
                  <div class="col-md-8">
                     <select class="form-control" id="logisticFleet">
                      <!-- <option :key="recommendationResult.id" :value="recommendationResult.id">
                        {{ recommendationResult.fleetName }}
                      </option> -->
                      <option v-for="(fleet, index) in recommendationResult.fleetName"
                        :key="index"
                        :value="recommendationResult.id">
                        {{ fleet }}
                     </option>
                    </select>
                  </div>
               </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button"
                        class="btn btn-primary"
                        @click="chooseRecommendation(recommendationResult.id)">CONFIRM</button>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
  name: 'recommendationEditModal',
  data () {
    return {

    }
  },
  props: {
    recommendationResultId: String
  },
  methods: {
    chooseRecommendation: function (recommendationResultId) {
      this.$store.dispatch(
        'recommendation/doPostRecommendation',
        recommendationResultId
      )
    }
  }
}
</script>

<style scoped>

</style>
