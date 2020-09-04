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
      <span>加载中.......</span>
    </div>
  </div>
</template>

<script>
import { shuffle } from '@/common/tool.js'
export default {
  data() {
    return {
      nowPlay: '',
      showNum: 5,
      showIndex: 1
    }
  },
  computed: {
    shuffleArr() {
      return shuffle(this.$store.getters['content/getVideoList'])
    },
    showArr() {
      return this.shuffleArr.slice(0, this.showIndex * this.showNum)
    }
  },
  methods: {
    setIntersection(e) {
      const target = e.target
      const videoH = document.querySelector('.video-item').offsetHeight
      const windwH = document.body.clientHeight
      const THAT = this
      const { nowPlay } = this
      console.log(target)

      const margin = (windwH - videoH - 10) / 2

      const option = {
        root: document.querySelector('#videoBox'),
        threshold: [0.5],
        rootMargin: `-${margin}px 0px`
      }

      const callback = function(entries) {
        const target = entries[0].target

        if (entries[0].isIntersecting) {
          console.log('playyyyyyyyyyyyyyy')
          if (nowPlay) nowPlay.pause()
          THAT.nowPlay = target
          target.play()
          console.log(nowPlay)
        } else {
          if (target !== nowPlay) target.pause()
        }
      }

      const io = new IntersectionObserver(callback, option)

      io.observe(target)
    },
    loadMore() {
      const io = new IntersectionObserver(
        function(entries) {
          if (entries[0].isIntersecting) {
            this.showIndex++
            console.log('loadddddddddddddd')
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
    console.log(this.showArr)
  }
}
</script>

<style>
</style>