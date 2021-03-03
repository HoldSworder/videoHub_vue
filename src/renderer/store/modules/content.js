/**
 * @Date         : 2020-08-13 10:25:33
 * @Description  : 视频基本信息
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-03-02 16:35:11
 */

export default {
  namespaced: true,
  state: {
    videoList: [],
    videoCount: 0,
    wallpaperCount: 0
  },
  getters: {
    getVideoList: state => state.videoList,
    getVideoCount: state => state.videoCount,
    getWallpaperCount: state => state.wallpaperCount
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
    },
    SET_VIDEOCOUNT(state, num) {
      state.videoCount = num
    },
    SET_WALLAPAPERCOUNT(state, num) {
      state.wallpaperCount = num
    },
    CHANGE_FILEINFO(state, info) {
      state.videoList.forEach(item => {
        if (item.id === info.id) {
          for (const key in info) {
            if (Object.hasOwnProperty.call(info, key)) {
              const it = info[key]
              item[key] = it
            }
          }
          return
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
    },

    setVideoInfo({ commit }, info) {
      const { videoCount, wallpaperCount } = info

      commit('SET_VIDEOCOUNT', videoCount)
      commit('SET_WALLAPAPERCOUNT', wallpaperCount)
    },

    changeFileInfo({ commit }, info) {
      commit('CHANGE_FILEINFO', info)
    }
  }
}
