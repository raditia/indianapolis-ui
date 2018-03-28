import axios from 'axios'

const doGetAllWarehouse = ({commit}) => {
  axios.get(
    '/api/warehouse')
    .then(response => {
      commit('getAllWarehouse', response.data)
      console.log(response.data)
    })
    .catch(error => {
      console.log('Error : ' + error)
    })
}

export default {
  doGetAllWarehouse
}
