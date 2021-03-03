<!--
 * @Date         : 2021-03-02 11:02:02
 * @Description  : more
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-03-02 16:15:58
-->

<template>
  <div>
     <el-button type="primary"
                 @click="showMoreHandler">
        More
      </el-button>

      <el-drawer
        title="更多功能"
        :visible.sync="showMore"
        direction="rtl">
        <div class="content">
          
          <change-name></change-name>

          <div class="total-box">
            <div>统计:</div>
            <div>
              <div>所有视频数量：{{videoCount}}</div>
              <div>wallpaper数量：{{wallpaperCount}}</div>
            </div>
          </div>

        </div>
      </el-drawer>
  </div>
</template>

<script>
import changeName from './changeName'

export default {
  components: {
    changeName
  },
  data() {
    return {
      showMore: false
    }
  },
  computed: {
    videoCount() {
      return this.$store.getters['content/getVideoCount']
    },
    wallpaperCount() {
      return this.$store.getters['content/getWallpaperCount']
    },
    videoList() {
      return this.$store.getters['content/getVideoList']
    }
  },
  methods: {
    showMoreHandler() {
      this.showMore = true
    }
  }
}
</script>

<style scoped lang='stylus'>
.content
  padding 0 15px
  > div
    margin-bottom 10px

.total-box
  > div:first-child
    margin-bottom 5px
  > div:last-child
    padding-left 10px
</style>