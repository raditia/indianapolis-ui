<template>
  <form @submit.prevent="getCheckStatus">
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
                  <button type="button" class="btn btn-primary" style="float: right"
                  @click="getCheckStatus"
                  @keyup.enter="getCheckStatus">SEARCH</button>
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
                <th scope="col">CFF ID</th>
                <th scope="col">Merchant Name</th>
                <th scope="col">Pickup Point</th>
                <th scope="col">CBM total</th>
                <th scope="col">Warehouse</th>
                <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr :key="checkStatus.cffId">
              <th scope="row">{{checkStatus.cffId}}</th>
              <td>{{ checkStatus.merchantName }}</td>
              <td>{{ checkStatus.pickupPointAddress }}</td>
              <td>{{ checkStatus.cbmTotal }}</td>
              <!-- <td>{{ formattedDate }}</td> -->
              <td>{{ checkStatus.warehouseName }}</td>
              <td>{{ checkStatus.schedulingStatus }}</td>
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
    }),
    formattedDate: function () {
      let date = new Date(this.checkStatus.pickupDate)
      return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
    }
  },
  methods: {
    getCheckStatus: function () {
      this.showTable = !this.showTable
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
