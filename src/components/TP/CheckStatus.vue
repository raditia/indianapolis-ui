<template>
  <form>
    <div class="container">
      <div class="col-md-8 offset-2">
        <div class="box-header box-search">
          <h4><b>Insert CFF Number</b></h4>
          <div class="box-body">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <input id="input_search" v-model="cffId" type="text" style="width: 100%"/>
                </div>
                <div class="form-group">
                  <button type="submit" class="btn btn-default" style="float: right" 
                  @click="getCheckStatus; showTable = !showTable">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br>

      <div class="col-md-12">
        <div class="table-responsive">
          <table class="table table-stripped" v-if="showTable">
          <thead>
            <tr>
              <th>
                <th scope="col">CFF ID</th>
                <th scope="col">Merchant Name</th>
                <th scope="col">Pickup Point</th>
                <th scope="col">CBM total</th>
                <th scope="col">Pickup Date</th>
                <th scope="col">Warehouse</th>
                <th scope="col">Status</th>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="status in checkStatus" :key="status.cffId">
              <th scope="row">{{scheduling.cffId}}</th>
              <td>{{ status.merchantName }}</td>
              <td>{{ status.pickupPointAddress }}</td>
              <td>{{ status.cbmTotal }}</td>
              <td>{{ status.pickupDate }}</td>
              <td>{{ status.warehouseName }}</td>
              <td>{{ status.schedulingStatus }}</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>
  </form>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CheckStatus',
  data () {
    return {
      cffId: '',
      showTable: false
    }
  },
  computed: {
    ...mapGetters({
      checkStatus: 'check_status/checkStatus'
    })
  },
  methods: {
    getCheckStatus: function () {
      this.$store.dispatch('check_status/doGetCheckStatus', this.cffId)
    }
  }
}
</script>

<style scoped>
  .box-search {
    width: auto;
    height: 100%;
    background-color: #ffffff;
    box-shadow: 0 9px 4px 0 rgba(119, 151, 178, 0.16);
  }

</style>
