import axios from 'axios'

const doGetRecommendation = ({commit}) => {
  axios.get('/api/recommendation/result?warehouseId=warehouse_cawang')
    .then(response => {
      commit('getRecommendation', response.data.data)
      console.log(response.data.data)
    })
    .catch(error => {
      console.log(error)
    })
}

const doPostRecommendation = ({commit}, recommendationData) => {
  axios.post(
    '/api/recommendation/pickup', {
      recommendationResultId: recommendationData.recommendationResultId,
      pickupDate: recommendationData.pickupDate
    }, 
    {
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(response => {
      commit('postRecommendation', response.data)
    })
    .catch(error => {
      console.log('Error: ' + error)
    })
}



export default {
  doGetRecommendation,
  doPostRecommendation
}
