export default {
  namespaced: true,
  state: {
    watchList: []
  },
  getters: {
    getWatchList: state => state.watchList
  },
  mutations: {
    SET_WATCHLIST(state, watchList) {
      state.watchList = watchList
    }
  },
  actions: {
    setWatchList({commit}, list) {
      commit('SET_WATCHLIST', list)
    }
  }
}