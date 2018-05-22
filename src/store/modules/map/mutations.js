const getMap = (state, response) => {
  state.map = response
}

const postMap = (state, response) => {
  // state.map.push(response)
  state.map = response
}

export default {
  getMap,
  postMap
}
