const getAllMerchants = (state, response) => {
  state.merchantList = response
}

const getOneMerchant = (state, response) => {
  state.merchant = response
}

const postMerchant = (state, response) => {
  state.merchantList.push(response)
}

const updateMerchant = (state, response) => {
  let index = state.merchantList.findIndex(object => object.id === response.id)
  state.merchantList.splice(index,1)
  state.merchantList.unshift(response)
}

const deleteMerchant = (state, response) => {
  var merchantList = state.merchantList
  merchantList.splice(merchantList.indexOf(response), 1)
}

export default {
  getAllMerchants,
  getOneMerchant,
  postMerchant,
  updateMerchant,
  deleteMerchant
}
