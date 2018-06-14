<template>
  <div class="container">
    <button type="button" class="btn btn-primary" style="float: right" @click="executeRecommendation">NEXT</button>
    <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col">CFF ID</th>
        <th scope="col">Merchant Name</th>
        <th scope="col">Pickup Point</th>
        <th scope="col">CBM total</th>
        <th scope="col">Pickup Date</th>
        <th scope="col">Warehouse</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="scheduling in schedulingList" :key="scheduling.cffId">
        <th scope="row">{{scheduling.cffId}}</th>
        <td>{{ scheduling.merchantName }}</td>
        <td>{{ scheduling.pickupPointAddress }}</td>
        <td>{{ scheduling.cbmTotal }}</td>
        <td>{{ scheduling.pickupDate }}</td>
        <td>{{ scheduling.warehouseName }}</td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
import {mapGetters} from 'vuex'
import axios from 'axios'

export default {
  name: 'ManageCFF',
  data () {
    return {
      data: [
        {
          merchantName: '',
          cffId: '',
          cffGoodList: [],
          pickupPointAddress: '',
          cbmTotal: '',
          warehouseName: '',
          schedulingStatus: ''
        }
      ],
      warehouseListId: []
    }
  },
  computed: {
    ...mapGetters({
      schedulingList: 'scheduling/schedulingList'
    })
  },
  mounted () {
    this.getAllScheduling()
    // this.executeRecommendation()
  },
  methods: {
    getAllScheduling: function () {
      this.$store.dispatch('scheduling/doGetAllScheduling')
    },
    executeRecommendation: function () {
      var app = this
      axios.get('/api/recommendation/execute')
      app.$router.push('/recommendation')
    },
    recommendationResult: function () {

    }
  }
}
</script>

<style scoped>

</style>
