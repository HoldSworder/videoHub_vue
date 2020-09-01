<template>
  <div id="flowBox">
    <div id="videoBox">
      <el-card v-for="item in showArr"
               :key="item.id">

        <div slot="header">
          <span>{{ item.title }}</span>
        </div>

        <video :src="item.file"
               controls
               class="video-item"
               @canplay="setIntersection"></video>
      </el-card>
    </div>
    
    <div id="loadMore">
      <Spin tip="没有更多了" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    setIntersection(e) {
      e.persist()
      const target = e.target
      const videoH = document.querySelector('.videoItem').offsetHeight
      const windwH = document.body.clientHeight

      const margin = (windwH - videoH - 10) / 2

      const option = {
        root: document.querySelector('#showBox'),
        threshold: [0.5],
        rootMargin: `-${margin}px 0px`
      }

      const callback = function(entries) {
        const target = entries[0].target

        if (entries[0].isIntersecting) {
          if (nowPlay) nowPlay.pause()
          setNowPlay(target)
          target.play()
          console.log(nowPlay)
        } else {
          if (target !== nowPlay) target.pause()
        }
      }

      const io = new IntersectionObserver(callback, option)

      io.observe(target)
    }
  }
}
</script>

<style>
</style>