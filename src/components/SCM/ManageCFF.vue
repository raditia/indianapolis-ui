<template>
  <div class="container">
    <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col">Merchant Name</th>
        <th scope="col">Pickup Point</th>
        <th scope="col">CBM total</th>
        <th scope="col">Pickup Date</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td>Larry</td>
        <td>the Bird</td>
        <td>@twitter</td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'ManageCFF',
  data () {
    return {
      scheduling: {}
    }
  },
  computed: {
    ...mapGetters({
      schedulingList: 'scheduling/schedulingList'
    })
  },
  mounted () {
    this.getAllScheduling()
  },
  methods: {
    getAllScheduling: function () {
      this.$store.dispatch('scheduling/doGetAllScheduling')
    }
  }
}
</script>

<style scoped>

</style>
