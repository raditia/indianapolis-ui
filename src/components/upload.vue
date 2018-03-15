<template>
  <div>
    <input type="file" multiple="false" id="fileToUpload"  @change="onChange"/>
    <br/>
    <button type="button" id="upload" @click="onClick">Submit</button>
    <div id="out-table"></div>
  </div>
</template>

<script>
import XLSX from 'xlsx'

// var SheetJSFT = [
//   'xlsx', 'xlsb', 'xlsm', 'xls', 'xml', 'csv', 'txt', 'ods', 'fods', 'uos', 'sylk', 'dif', 'dbf', 'prn', 'qpw',
//   '123', 'wb*', 'wq*', 'html', 'htm'
// ].map(function (x) { return '.' + x }).join(',')

export default {
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
        /* show export button */
        // document.getElementById('export-table').style.visibility = 'visible'
      }

      reader.readAsArrayBuffer(file)
    },
    onClick: function (evt) {
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_sheet(document.getElementById('out-table'))
      var ws = XLSX.utils.sheet_to_json(wb)
      console.log(ws)
      /* generate file and force a download */
      // XLSX.writeFile(wb, 'sheetjs.xlsx')
    }
  }
}

</script>
