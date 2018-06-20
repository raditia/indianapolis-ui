const doSetLoggedInUser = ({commit}, isLoggedIn) => {
  commit('setLoggedInUser', isLoggedIn)
}

export default {
  doSetLoggedInUser
}
