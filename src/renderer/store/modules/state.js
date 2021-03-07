/**
 * @Date         : 2021-03-04 15:36:04
 * @Description  : 全局状态
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-03-05 14:47:55
 */

export default {
  namespaced: true,
  state: {
    progress: 0
  },
  getters: {
    getProgress: state => state.progress
  },
  mutations: {
    SET_PROGRESS(state, progress) {
      state.progress = progress
    }
  },
  actions: {
    setProgress({ commit, state }, { now, all }) {
      const progress = Math.floor((now / all) * 100)
      const old = state.progress

      if (old === progress) return

      commit('SET_PROGRESS', progress)
    }
  }
}
