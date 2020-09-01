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
    },
    ADD_WATCHLIST(state, item) {
      state.watchList.push(item)
    }
  },
  actions: {
    setWatchList({ commit }, list) {
      commit('SET_WATCHLIST', list)
    },

    addWatch({ state, commit }, item) {
      for (const items of state.watchList) {
        if (items.id === item.id) {
          console.log('重复添加')
          return
        }
      }
      commit('ADD_WATCHLIST', item)
    }
  }
}
