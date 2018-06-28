const getRecommendation = (state, response) => {
  state.recommendation = response
}

const postRecommendation = (state, response) => {
  state.recommendation.push(response)
}

export default {
  getRecommendation,
  postRecommendation
}
