const getRecommendation = (state, response) => {
  state.recommendation = response
}

const getWarehouse = (state, response) => {
  state.warehouse = response
}

const postRecommendation = (state, response) => {
  state.recommendation.push(response)
}

export default {
  getRecommendation,
  getWarehouse,
  postRecommendation
}
