<template>
  <div class="container">
    <div class="row" style="float: right;">
      <div class="col-md-6">
        <div class="form-group">
          <select class="form-control" id="warehouseSelection" @change="setWarehouseId">
            <option v-for="item in this.warehouseList" :key="item.id" v-bind:value="item.id">
              {{ item.id }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <button type="button" class="btn btn-primary" @click="recommendationResult">NEXT</button>
        </div>
      </div>
    </div>
    <div class="table-responsive">
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
      warehouseId: 'warehouse_cawang'
    }
  },
  computed: {
    ...mapGetters({
      schedulingList: 'scheduling/schedulingList',
      warehouseList: 'warehouse/warehouseList'
    })
  },
  mounted () {
    this.getAllScheduling()
    this.executeRecommendation()
    this.getAllWarehouse()
  },
  updated () {
    // this.getAllScheduling()
    this.executeRecommendation()
  },
  methods: {
    getAllScheduling: function () {
      this.$store.dispatch('scheduling/doGetAllScheduling')
    },
    getAllWarehouse: function () {
      this.$store.dispatch('warehouse/doGetAllWarehouse')
    },
    setWarehouseId: function () {
      let warehouseSelection = document.getElementById('warehouseSelection')
      this.warehouseId = warehouseSelection.options[warehouseSelection.selectedIndex].value
    },
    executeRecommendation: function () {
      axios.get('/api/recommendation/execute')
    },
    recommendationResult: function () {
      this.$router.push({
        name: 'recommendation',
        params: {
          warehouseId: this.warehouseId
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
