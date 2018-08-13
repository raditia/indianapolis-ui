import axios from 'axios'

const doGetAllLogisticVendor = ({commit}) => {
  axios.get(
    '/api/logistic-vendor')
    .then(response => {
      commit('getAllLogisticVendor', response.data.data)
    })
    .catch(error => {
      console.log('Error : ' + error)
    })
}

export default {
  doGetAllLogisticVendor
}
