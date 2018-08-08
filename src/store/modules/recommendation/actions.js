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

const doPostRecommendation = ({commit}, recommendationResultId) => {
  axios.post(
    '/api/recommendation/pickup', {
      recommendationResultId: recommendationResultId
    }, {
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
  doPostRecommendation
}
