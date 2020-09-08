<template>
  <div id="flowBox">
    <div id="videoBox">
      <el-card v-for="item in showArr"
               class="video-card"
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

    <div id="loadMore"
         class="alert-text"
         v-if="showArr.length !== shuffleArr.length">
      <span>加载中.......</span>
    </div>

    <div class="alert-text"
         v-else>
      <span>没有更多了</span>
    </div>
  </div>
</template>

<script>
import { shuffle } from '@/common/tool.js'
export default {
  data() {
    return {
      nowPlay: '',
      loadNum: 5,
      showIndex: 0
    }
  },
  computed: {
    shuffleArr() {
      return shuffle(this.$store.getters['content/getVideoList'])
    },
    showArr() {
      return this.shuffleArr.slice(0, this.showIndex * this.loadNum)
    }
  },
  methods: {
    setIntersection(e) {
      const target = e.target
      const videoH = document.querySelector('.video-item').offsetHeight
      const windwH = document.body.clientHeight
      const THAT = this
      const { nowPlay } = this

      const margin = (windwH - videoH - 10) / 2

      const option = {
        threshold: [0.5],
        rootMargin: `-${margin}px 0px`
      }

      const callback = function(entries) {
        const target = entries[0].target

        if (entries[0].isIntersecting) {
          if (nowPlay) nowPlay.pause()
          THAT.nowPlay = target
          target.play()
        } else {
          if (target !== nowPlay) target.pause()
        }
      }

      const io = new IntersectionObserver(callback, option)

      io.observe(target)
    },

    loadMore() {
      const THAT = this
      const io = new IntersectionObserver(
        function(entries) {
          if (entries[0].isIntersecting) {
            THAT.showIndex++
            console.log(THAT.showIndex)
          }
        },
        {
          threshold: [0],
          rootMargin: `100px 0px`
        }
      )

      io.observe(document.querySelector('#loadMore'))
    }
  },

  mounted() {
    this.loadMore()
  }
}
</script>

<style scoped lang="stylus">
#flowBox
  width 100vw
  height 100vh

.video-item
  width 1024px
  height 576px

#videoBox
  display flex
  align-items center
  flex-direction column

.video-card
  margin 10px

.alert-text
  color $color-text
  margin 10px 0
  {$flexDefault}
</style>