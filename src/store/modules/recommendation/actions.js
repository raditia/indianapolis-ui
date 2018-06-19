import axios from 'axios'

const doGetRecommendation = ({commit}) => {
  axios.get('/api/recommendation/result')
    .then(response => {
      commit('getRecommendation', response.data.data)
      console.log(response.data.data)
    })
    .catch(error => {
      console.log(error)
    })
}

export default {
  doGetRecommendation
}
