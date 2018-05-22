import axios from 'axios'

const doGetAllFleet = ({commit}) => {
  axios.get(
    '/api/fleet')
    .then(response => {
      commit('getAllFleet', response.data.data)
      console.log(response.data.data)
    })
    .catch(error => {
      console.log('Error : ' + error)
    })
}

export default {
  doGetAllFleet
}
