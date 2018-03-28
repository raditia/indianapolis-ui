<template>
  <div class="upload">
    <form @submit.prevent="postMerchant">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>CFF ID</label>
            <input id="inputCffId" v-model="requestor.id" type="text" class="form-control" placeholder="Enter id">
          </div>
          <div class="form-group">
            <label>Date</label>
            <input id="inputDate" v-model="requestor.date" type="date" class="form-control" placeholder="Enter date">
          </div>
          <div class="form-group">
            <label>TP name</label>
            <input id="inputTpName" v-model="requestor.name" type="text" class="form-control" placeholder="Enter name">
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label>Merchant name</label>
            <input id="inputMerchantName" v-model="merchant.name" type="text" class="form-control" placeholder="Enter name">
          </div>
          <div class="form-group">
            <label>Merchant email</label>
            <input id="inputMerchantEmail" v-model="merchant.emailAddress" type="text" class="form-control" placeholder="Enter name">
          </div>
          <div class="form-group">
            <label>Merchant phone</label>
            <input id="inputMerchantPhone" v-model="merchant.phoneNumber" type="text" class="form-control" placeholder="Enter name">
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="allowedVehiclesSelection">Allowed Vehicles</label>
        <select multiple class="form-control" id="allowedVehiclesSelection">
          <option v-for="item in fleetList" :key="item.id" v-bind:value="item.id">
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="categorySelection">Category</label>
            <select class="form-control" id="categorySelection">
              <option v-for="item in categoryList" :key="item.id" v-bind:value="item.id">
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="warehouseSelection">Warehouse</label>
            <select class="form-control" id="warehouseSelection">
              <option v-for="item in warehouseList" :key="item.id" v-bind:value="item.id">
                {{ item.id }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="form-group">
        <input type="file" multiple="false" id="fileToUpload" @change="onChange"/>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary">SUBMIT</button>
        <div id="out-table" style="display: none"></div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import XLSX from 'xlsx'
import axios from 'axios'

export default {
  name: 'upload',
  data () {
    return {
      requestor: {
        id: '',
        date: '',
        name: ''
      },
      merchant: {
        name: '',
        emailAddress: '',
        phoneNumber: ''
      },
      // TODO : Change this pickup point address and lat lng
      pickupPoint: {
        pickupAddress: 'Terban Yogyakarta',
        latitude: -7.777261,
        longitude: 110.374324
      },
      categoryId: '',
      warehouseId: '',
      allowedVehicles: [],
      goods: [],
      jsonFromSheet: []
    }
  },
  computed: {
    ...mapGetters({
      categoryList: 'category/categoryList',
      warehouseList: 'warehouse/warehouseList',
      fleetList: 'fleet/fleetList'
    })
  },
  mounted () {
    this.getAllCategory()
    this.getAllWarehouse()
    this.getAllFleet()
  },
  methods: {
    onChange: function (evt) {
      var file
      var files = evt.target.files

      if (!files || files.length === 0) return

      file = files[0]

      var reader = new FileReader()
      reader.onload = function (e) {
        // pre-process data
        var binary = ''
        var bytes = new Uint8Array(e.target.result)
        var length = bytes.byteLength
        for (var i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i])
        }

        /* read workbook */
        var wb = XLSX.read(binary, {type: 'binary'})

        /* grab first sheet */
        var wsname = wb.SheetNames[0]
        var ws = wb.Sheets[wsname]

        /* generate HTML */
        var HTML = XLSX.utils.sheet_to_html(ws)

        /* update table */
        document.getElementById('out-table').innerHTML = HTML

        // this.jsonFromSheet = XLSX.utils.sheet_to_json(ws)
        // console.log(JSON.stringify(this.jsonFromSheet))
      }

      reader.readAsArrayBuffer(file)
    },
    getAllCategory: function () {
      this.$store.dispatch('category/doGetAllCategory')
    },
    getAllWarehouse: function () {
      this.$store.dispatch('warehouse/doGetAllWarehouse')
    },
    getAllFleet: function () {
      this.$store.dispatch('fleet/doGetAllFleet')
    },
    postMerchant: function () {
      var wb = XLSX.utils.table_to_sheet(document.getElementById('out-table'))
      var ws = XLSX.utils.sheet_to_json(wb)
      console.log(ws.length)
      for (var i = 0; i < ws.length; i++) {
        this.goods[i] = ws[i]
      }
      console.log(JSON.stringify(this.goods))
      let warehouseSelection = document.getElementById('warehouseSelection')
      this.warehouseId = warehouseSelection.options[warehouseSelection.selectedIndex].value
      let categorySelection = document.getElementById('categorySelection')
      this.categoryId = categorySelection.options[categorySelection.selectedIndex].value
      let allowedVehiclesSelection = document.getElementById('allowedVehiclesSelection')
      for (i = 0; i < allowedVehiclesSelection.options.length; i++) {
        if (allowedVehiclesSelection.options[i].selected) {
          this.allowedVehicles.push(allowedVehiclesSelection.options[i].text)
        }
      }
      // TODO : Change this date
      // this.requestor.date = '2018-03-26T07:55:41.637+0000'
      axios.post(
        '/api/cff', {
          requestor: {
            id: this.requestor.id,
            date: this.requestor.date,
            name: this.requestor.name
          },
          merchant: {
            name: this.merchant.name,
            emailAddress: this.merchant.emailAddress,
            phoneNumber: this.merchant.phoneNumber
          },
          pickupPoint: {
            pickupAddress: this.pickupPoint.pickupAddress,
            latitude: this.pickupPoint.latitude,
            longitude: this.pickupPoint.longitude
          },
          allowedVehicles: this.allowedVehicles,
          category: this.categoryId,
          warehouse: this.warehouseId,
          goods: this.goods
        }, {
          headers: {
            'Content-type': 'application/json'
          }
        })
      this.resetAll()
    },
    resetAll: function () {
      this.requestor = {
        id: '',
        date: '',
        name: ''
      }
      this.merchant = {
        name: '',
        emailAddress: '',
        phoneNumber: ''
      }
      this.allowedVehicles = []
      this.categoryId = ''
      this.warehouseId = ''
      this.goods = []
      this.jsonFromSheet = []
      // this.getAllCategory()
      // this.getAllWarehouse()
      // this.getAllFleet()
    }
  }
}
</script>

<style scoped>
  .upload {
    float: none;
    margin: 50px 250px 0 250px;
  }
  .btn-primary {
    width: 100%;
  }
</style>
