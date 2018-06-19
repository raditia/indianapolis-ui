import axios from 'axios'

const doGetAllWarehouseCategory = ({commit}) => {
  axios.get(
    '/api/warehouse-category')
    .then(response => {
      commit('getAllWarehouseCategory', response.data.data)
    })
    .catch(error => {
      console.log('Error : ' + error)
    })
}

export default {
  doGetAllWarehouseCategory
}
