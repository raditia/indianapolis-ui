import axios from 'axios'

const doGetAllCff = ({commit}) => {
  axios.get('/api/cff')
    .then(response => {
      commit('getAllCff', response.data.content)
    })
    .catch(error => {
      console.log(error)
    })
}

export default {
  doGetAllCff
}
