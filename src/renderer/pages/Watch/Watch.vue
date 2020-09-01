<template>
  <div>
    <div class="custom-box">
      <el-button type="info"
                 class="clear-btn"
                 @click="clear">
        清空视频
      </el-button>

      <div class="slider-box">
        <span>设置宽高</span>
        <el-slider v-model="sliderModel"
                   class="slider" />
      </div>
    </div>

    <div class="play-box">
      <el-card v-for="item of watchList"
               :key="item.id">
        <div slot="header"
             class="play-header">
          <span>{{ item.title }}</span>
          <el-button icon="el-icon-close"
                     type="text"
                     class="close-icon" />
        </div>
        <div>
          <video class="player"
                 :style="{ height: playHeight + 'px' }"
                 :src="item.file"
                 controls />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sliderModel: 40
    }
  },
  computed: {
    watchList() {
      return this.$store.getters['watch/getWatchList']
    },
    playHeight() {
      return this.sliderModel * 10
    }
  },
  methods: {
    clear() {
      this.$store.dispatch('watch/setWatchList', [])
    }
  }
}
</script>

<style scoped lang="stylus">
.close-icon
  float right

.play-box
  display flex
  justify-content space-around
  flex-wrap wrap

.custom-box
  overflow auto
  margin 10px

.slider
  float left
  width 70%

.slider-box
  {$flexDefault}

.slider-box span
  padding 5px
  color $color-text

.clear-btn
  float right
</style>
