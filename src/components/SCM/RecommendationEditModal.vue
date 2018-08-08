<template>
   <div class="modal fade" id="recommendationEditModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title" id="modalLabel"> CONFIRM DETAIL</h5>
            </div>
            <div class="modal-body">
               <div v-for="(fleet, index) in this.recommendationResult.fleetName"
                    :key="index" class="row">
                    <div class="col-md-4">
                      <select class="form-control" id="logisticProvider">
                        <option value="JNE">JNE</option>
                        <option value="BES">BES</option>
                      </select>
                    </div>
                    <div class="col-md-8">
                       <select class="form-control" id="logisticFleet">
                         <option :key="index" :value="fleet">
                           {{ fleet }}
                         </option>
                         <!--<option :key="this.recommendationResult.id" :value="this.recommendationResult.id">-->
                          <!--{{ this.recommendationResult.fleetName }}-->
                        <!--</option>-->
                         <!--<option v-for="(fleet, index) in this.recommendationResult.fleetName"-->
                          <!--:key="index"-->
                          <!--:value="fleet">-->
                          <!--{{ fleet }}-->
                         <!--</option>-->
                      </select>
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
      fleetName: Array
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

</style>
