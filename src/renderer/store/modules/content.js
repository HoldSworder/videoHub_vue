export default {
  namespaced: true,
  state: {
    videoList: []
  },
  getters: {
    getVideoList: state => state.videoList
  },
  mutations: {
    SET_VIDEOLIST(state, videoList) {
      state.videoList = videoList
    },
    DEL_VIDEO(state, id) {
      state.videoList.forEach((item, index) => {
        if (item.id === id) {
          state.videoList.splice(index, 1)
        }
      })
    }
  },
  actions: {
    setVideoList({ commit }, list) {
      commit('SET_VIDEOLIST', list)
    },

    delVideo({ commit }, id) {
      commit('DEL_VIDEO', id)
    }
  }
}
