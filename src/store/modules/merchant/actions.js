import axios from 'axios'

const doGetAllMerchants = ({commit}) => {
  axios.get('/api/cff')
    .then(response => {
      commit('getAllMerchants', response.data.content)
    })
    .catch(error => {
      console.log(error)
    })
}

const doGetOneMerchant = ({commit, merchantId}) => {
  axios.get('/api/merchant/' + merchantId)
    .then(response => {
      commit('getOneMerchant', response.data)
    })
    .catch(error => {
      console.log(error)
    })
}

const doPostMerchant = ({commit}, merchantData) => {
  axios.post(
    '/api/cff', {
      requestor: {
        id: merchantData.id,
        name: merchantData.name,
        date: merchantData.date
      },
      category: merchantData.category,
      warehouse_destination: merchantData.warehouse_destination,
      goods: [
        {
          goods_id: merchantData.goods_id,
          sku: merchantData.sku,
          cbm: merchantData.cbm,
          quantity: merchantData.quantity
        }
      ]
    }, {
      headers: {
        'Content-type': 'application/json'
      }
    }
  )
    .then(response => {
      commit('postMerchant', response.data)
    })
    .catch(error => {
      console.log(error)
    })
}

export default {
  doGetAllMerchants,
  doGetOneMerchant,
  doPostMerchant
}
