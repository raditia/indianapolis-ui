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

          <!--TODO: Create better way to display recommendation results-->
          <div class="row">
            <div class="col-md-4">
              <h5 style="text-align: center">1st option</h5>
              <select class="form-control" id="firstOption">
                <option value="1 van">{{ recommendation.fleetRecommendationResponseList[0].fleetName[0] }}</option>

              </select>
              <!-- <select class="form-control" id="firstOption">
                <option value="2 van">{{ recommendation.fleetRecommendationResponseList[1].fleetName[0] }}</option>
              </select> -->

              <br>

              <button class="btn btn-primary">PILIH</button>
            </div>

            <div class="col-md-4">
              <h5 style="text-align: center"><b style="color: #0d6aad">Recommended</b></h5>
              <select class="form-control" id="recommendedOption">
                <option value="2 van">{{ recommendation.fleetRecommendationResponseList[1].fleetName[0] }}</option>
                
              </select>
              <!-- <select class="form-control" id="recommendedOption">
                <option value="2 van">{{ recommendation.fleetRecommendationResponseList[3].fleetName[0] }}</option>
              </select> -->

              <br>

              <button class="btn btn-primary" data-toggle="modal" data-target="#callLogisticModal">PILIH</button>
            </div>

            <div class="col-md-4">
              <h5 style="text-align: center">2nd option</h5>
              <select class="form-control" id="secondOption">
                <option value="2 van">{{ recommendation.fleetRecommendationResponseList[2].fleetName[0] }}</option>
              </select>
              <!-- <select class="form-control" id="secondOption">
                <option value="2 van">{{ recommendation.fleetRecommendationResponseList[5].fleetName[0] }}</option>
              </select> -->

              <br>

              <button class="btn btn-primary">PILIH</button>
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
                <button type="button" class="btn btn-primary" data-toggle="modal" data-dismiss="modal"
                        data-target="#logisticEditDetailModal">Yes I did!</button>
              </div>
            </div>
          </div>
        </div>

        <!--Edit details modal-->
        <div class="modal fade" id="logisticEditDetailModal" tabindex="-1" role="dialog"
             aria-labelledby="logisticEditDetailLabel"
             aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <h5 style="text-align: center"><b>CONFIRM DETAIL</b></h5>

                <hr>

                <div class="row">
                  <div class="col-md-4">
                    <select class="form-control" id="logisticProvider">
                      <option value="JNE">JNE</option>
                      <option value="BES">BES</option>
                    </select>
                  </div>
                  <div class="col-md-8">
                    <select class="form-control" id="logisticFleet">
                      <option value="2 van"> 2 Van</option>
                      <option value="3 motor">3 Motor</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">CONFIRM</button>
              </div>
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
      console.log(this.recommendation)

      this.fleetRecommendationResponseList = this.recommendation.fleetRecommendationResponseList
      console.log(this.fleetRecommendationResponseList)
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
