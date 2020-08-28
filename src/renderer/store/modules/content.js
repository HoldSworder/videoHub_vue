import { getFiles, fixVideoInfo, saveVideoData } from '@/script/getProgram'

export default {
  namespaced: true,
  state: {
    videoList: [],
    loadVal: {
      isLoading: false,
      title: '',
    }
  },
  getters: {
    getVideoList: state => state.videoList
  },
  mutations: {
    SET_VIDEOLIST(state, videoList) {
      state.videoList = videoList
    },
    SET_LOADING(state, isLoading) {
      state.loadVal.isLoading = isLoading
    }
  },
  actions: {
    setVideoList({commit}, list) {
      commit('SET_VIDEOLIST', list)
    },

    loadConfig() {
      console.log('asdfasdfas')
    }
  }
}