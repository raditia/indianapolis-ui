import axios from 'axios'

const doGetAllCategory = ({commit}) => {
  axios.get(
    '/api/category')
    .then(response => {
      commit('getAllCategory', response.data.data)
      console.log(response.data.data)
    })
    .catch(error => {
      console.log('Error : ' + error)
    })
}

export default {
  doGetAllCategory
}
