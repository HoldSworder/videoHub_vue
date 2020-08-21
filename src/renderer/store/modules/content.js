import { getFiles, fixVideoInfo, saveVideoData } from '@/script/getProgram'
import { getMeta } from '@/script/ffmpeg/test'

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
    async loadFile({state, getters, commit}) {
      commit('SET_LOADING', true)

      let files = await getFiles()
      // files = await fixVideoInfo(files)
      console.log(files[0].file)
      const test = await getMeta(files[0].file)
      console.log(test)
      commit('SET_VIDEOLIST', files)

      commit('SET_LOADING', false)
    },

    setVideoList({commit}, list) {
      commit('SET_VIDEOLIST', list)
    },

    loadConfig() {
      console.log('asdfasdfas')
    }
  }
}