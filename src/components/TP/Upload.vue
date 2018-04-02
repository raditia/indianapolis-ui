<template>
  <form @submit.prevent="postMerchant">
    <div class="container">
      <div class="row">
        <div class="col-md-7">
          <div class="box-header box-merchant">
            <h4><b>Data Merchant</b></h4>
            <div class="box-body">
              <div class="form-group">
                <label>CFF ID</label>
                <input id="inputCffId" v-model="requestor.id" type="text" class="form-control" placeholder="Enter id">
              </div>
              <div class="base">
                <div class="idp-value">
                  REQUESTOR
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>TP name</label>
                    <input id="inputTpName" v-model="requestor.name" type="text" class="form-control"
                           placeholder="Enter name">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Merchant name</label>
                    <input id="inputMerchantName" v-model="merchant.name" type="text" class="form-control"
                           placeholder="Enter name">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Merchant phone</label>
                    <input id="inputMerchantPhone" v-model="merchant.phoneNumber" type="text" class="form-control"
                           placeholder="Enter name">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Merchant email</label>
                    <input id="inputMerchantEmail" v-model="merchant.emailAddress" type="text" class="form-control"
                           placeholder="Enter name">
                  </div>
                </div>
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
                    <label for="allowedVehiclesSelection">Allowed Vehicles</label>
                    <select multiple="multiple" class="form-control" id="allowedVehiclesSelection">
                      <option v-for="item in fleetList" :key="item.id" :value="item.id">
                        {{ item.name }}
                      </option>
                    </select>
                    <!--<li v-for="item in fleetList" :key="item.id">-->
                      <!--<input type="checkbox" :value="item.id" id="allowedVehiclesSelection" v-model="allowedVehicles"> {{item.name}}-->
                    <!--</li>-->
                  </div>
                </div>
              </div>
              <div class="base">
                <div class="idp-value">
                  PICK UP POINT
                </div>
              </div>
              <div class="row">
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
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Date</label>
                    <input id="inputDate" v-model="requestor.date" type="date" class="form-control"
                           placeholder="Enter date">
                  </div>
                </div>
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-primary" style="background-color: #1991eb">SUBMIT</button>
                <div id="out-table" style="display: none"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-5">
          <div class="box-header box-map">
            <h4><b>Map Location</b></h4>
            <div class="box-body">
              <div class="idp-map">
                <google-map></google-map>
              </div>
            </div>
          </div>
          <br/>
          <div class="box-header box-upload">
            <h4><b>Upload CFF</b></h4>
            <div class="box-body">
              <div class="form-group">
                <div class="idp-upload-box">
                  <input type="file" multiple="false" id="fileToUpload" @change="onChange"/>
                </div>
              </div>
            </div>
          </div>
          <br/>
          <p>
            Don't have CFF template? Download here <br/>
            <a href="#">CFF_Template.xlsx</a>
          </p>

        </div>
      </div>
    </div>
    </form>
</template>

<script>
import { mapGetters } from 'vuex'
import XLSX from 'xlsx'
import axios from 'axios'
import GoogleMap from '../GoogleMap'

export default {
  name: 'upload',
  components: {GoogleMap},
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
      fleetList: 'fleet/fleetList',
      merchantList: 'merchant/merchantList'
    })
  },
  mounted () {
    this.getAllCategory()
    this.getAllWarehouse()
    this.getAllFleet()
    this.getAllMerchants()
  },
  updated () {
    this.initializeBootstrapMultiselect()
  },
  methods: {
    initializeBootstrapMultiselect: function () {
      $(document).ready(function () {
        $('#allowedVehiclesSelection').multiselect()
      })
    },
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
      }

      reader.readAsArrayBuffer(file)
    },
    getAllMerchants: function () {
      this.$store.dispatch('merchant/doGetAllMerchants')
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
      for (var i = 0; i < ws.length; i++) {
        this.goods[i] = ws[i]
      }
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
  .box-merchant {
    width: 100%;
    min-height: auto;
    background-color: #ffffff;
    box-shadow: 0 9px 4px 0 rgba(119, 151, 178, 0.69);
  }
  .box-map {
    width: 100%;
    height: 350px;
    background-color: #ffffff;
    box-shadow: 0 9px 4px 0 rgba(119, 151, 178, 0.16);
  }
  .box-upload {
    width: 100%;
    height: auto;
    background-color: #ffffff;
    box-shadow: 0 9px 4px 0 rgba(119, 151, 178, 0.16);
  }
  .idp-primary-btn {
    width: 86px;
    height: 36px;
    border-radius: 4px;
    border: solid 1px rgba(0, 0, 0, 0.1);
  }
  label {
    width: 196px;
    height: 20px;
    font-family: Roboto;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.5;
    text-align: left;
    color: #7f8fa4;
  }
  .idp-value {
    width: 103px;
    height: 19px;
    font-family: Roboto;
    font-size: 10px;
    font-weight: 500;
    line-height: 1.9;
    text-align: center;
    color: #ffffff;
  }
  .idp-upload-box {
    width: 100%;
    height: 128px;
    border-radius: 4px;
    border: solid 3px #ededed;
  }
  .base {
    width: 107px;
    height: 20px;
    background-color: #1991eb;
  }

  /*CHECKBOX x DROPDOWN*/
  .dropdown-check-list {
    display: inline-block;
  }
  .dropdown-check-list .anchor {
    position: relative;
    cursor: pointer;
    display: inline-block;
    padding: 5px 50px 5px 10px;
    border: 1px solid #ccc;
  }
  .dropdown-check-list .anchor:after {
    position: absolute;
    content: "";
    border-left: 2px solid black;
    border-top: 2px solid black;
    padding: 5px;
    right: 10px;
    top: 20%;
    -moz-transform: rotate(-135deg);
    -ms-transform: rotate(-135deg);
    -o-transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
    transform: rotate(-135deg);
  }
  .dropdown-check-list .anchor:active:after {
    right: 8px;
    top: 21%;
  }
  .dropdown-check-list ul.items {
    padding: 2px;
    display: none;
    margin: 0;
    border: 1px solid #ccc;
    border-top: none;
  }
  .dropdown-check-list ul.items li {
    list-style: none;
  }
  .dropdown-check-list.visible .anchor {
    color: #0094ff;
  }
  .dropdown-check-list.visible .items {
    display: block;
  }

  .idp-map {
    width: auto;
    height: 300px;
  }
</style>
