import axios from 'axios'

const doGetCheckStatus = ({commit}, cffId) => {
  axios.get('/api/cff/' + cffId)
    .then(response => {
      commit('getCheckStatus', response.data.data)
      console.log(response.data.data)
    })
    .catch(error => {
      console.log(error)
    })
}

export default {
  doGetCheckStatus
}
