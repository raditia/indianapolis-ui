import axios from 'axios'

const doGetRecommendation = ({commit}, warehouseId) => {
  axios.get('/api/recommendation/result?warehouseId=' + warehouseId)
    .then(response => {
      commit('getRecommendation', response.data.data)
      console.log(response.data.data)
    })
    .catch(error => {
      console.log(error)
    })
}

const doGetWarehouse = ({commit}) => {
  axios.get('/api/recommendation/warehouse')
    .then(response => {
      commit('getWarehouse', response.data.data)
    })
    .catch(error => {
      console.log(error)
    })
}

const doPostRecommendation = ({commit}, pickupChoiceRequest) => {
  console.log(pickupChoiceRequest)
  axios.post(
    '/api/recommendation/pickup', pickupChoiceRequest,
    {
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(response => {
      // commit('postRecommendation', response.data)
    })
    .catch(error => {
      console.log('Error: ' + error)
    })
}

export default {
  doGetRecommendation,
  doGetWarehouse,
  doPostRecommendation
}
