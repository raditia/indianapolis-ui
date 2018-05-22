import axios from 'axios'

const doGetAllScheduling = ({commit}) => {
  axios.get(
    '/api/cff')
    .then(response => {
      commit('getAllScheduling', response.data.data)
      console.log(response.data.data)
    })
    .catch(error => {
      console.log('Error : ' + error)
    })
}

export default {
  doGetAllScheduling
}
