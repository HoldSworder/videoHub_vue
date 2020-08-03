const state = {
  videoList: [],
  normalList: []
}

const getters = {
  getVideoList: state => state.videoList,
  getNormalList: state => state.normalList
}

const mutations = {
  SET_VIDEOLIST (state, newList) {
    state.videoList = newList
  },
  SET_NORMALLIST (state, newList) {
    state.normalList = newList
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
