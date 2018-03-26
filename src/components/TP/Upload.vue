<template>
  <div class="upload">
    <form @submit.prevent="postMerchant">
      <div class="form-group">
        <label>ID</label>
        <input id="inputPersonID" v-model="requestor.id" type="text" class="form-control" placeholder="Enter id">
      </div>
      <div class="form-group">
        <label>Name</label>
        <input id="inputMerchantName" v-model="requestor.name" type="text" class="form-control" placeholder="Enter name">
      </div>
      <div class="form-group">
        <label>Date</label>
        <input id="inputDate" v-model="requestor.date" type="text" class="form-control" placeholder="Enter name">
      </div>
      <div class="form-group">
        <label>Category</label>
        <input id="inputCategory" v-model="category" type="text" class="form-control" placeholder="Enter name">
      </div>
      <div class="form-group">
        <label>Warehouse</label>
        <input id="inputWarehouse" v-model="warehouse" type="text" class="form-control" placeholder="Enter name">
      </div>
      <div class="form-group">
        <input type="file" multiple="false" id="fileToUpload" @change="onChange"/>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary">SUBMIT</button>
        <div id="out-table"></div>
      </div>
    </form>
    <div class="sembarang">
      <h6 id="json-excel"></h6>
    </div>
  </div>
</template>

<script>
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
      category: '',
      warehouse: '',
      goods: [],
      jsonFromSheet: []
    }
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
        /* update table */
        this.jsonFromSheet = XLSX.utils.sheet_to_json(ws)
      }

      reader.readAsArrayBuffer(file)
    },
    onClick: function (evt) {
      /* generate workbook object from table */
      // var wb = XLSX.utils.table_to_sheet(document.getElementById('out-table'))
      // var ws = XLSX.utils.sheet_to_json(wb)
      // // console.log(ws)
      // document.getElementById('json-excel').innerHTML = JSON.stringify(ws)
      // var self = this
      // $.getJSON(ws, function (data) {
      //   self.goods = data
      // })
      /* generate file and force a download */
      // XLSX.writeFile(wb, 'sheetjs.xlsx')
    },
    postMerchant: function () {
      for (var i = 0; i < this.jsonFromSheet.length; i++) {
        this.goods[i] = this.jsonFromSheet[i]
      }
      axios.post(
        '/api/cff', {
          requestor: {
            id: this.requestor.id,
            date: this.requestor.date,
            name: this.requestor.name
          },
          category: this.category,
          warehouse: this.warehouse,
          goods: this.goods
        }, {
          headers: {
            'Content-type': 'application/json'
          }
        })
        .then(response => {
          this.$store.commit('cff/postCff', response.data)
        })
        .catch(error => {
          console.log(error.response.data.errors)
        })
      this.requestor = {
        id: '',
        date: '',
        name: ''
      }
      this.category = ''
      this.warehouse = ''
      this.goods = []
      this.jsonFromSheet = []
    }
  }
}
</script>

<style scoped>
</style>
