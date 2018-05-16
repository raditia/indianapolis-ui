import axios from 'axios'

const doGetAllScheduling = ({commit}) => {
  axios.get(
    '/api/recommendation/result')
    .then(response => {
      commit('getAllScheduling', response.data)
      console.log(response.data)
    })
    .catch(error => {
      console.log('Error : ' + error)
    })
}

export default {
  doGetAllScheduling
}
