<!--
 * @Date         : 2021-03-02 16:13:15
 * @Description  :  更改wallpaper文件夹名
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-03-04 17:06:07
-->
<template>
  <div>
    <el-button type="primary"
          style="margin-bottom: 10px"
          @click="changeWallpaperName">
      更改wallpaper名字
    </el-button>
    <el-progress v-if="showChangeProgress" :text-inside="true" :stroke-width="20" :percentage="changeProgress"></el-progress>
  </div>
</template>

<script>
const fs = require('fs')

export default {
  data() {
    return {
      showChangeProgress: false,
      changeProgress: 0
    }
  },
  computed: {
    videoList() {
      return this.$store.getters['content/getVideoList']
    }
  },
  methods: {
    changeWallpaperName() {
      const { videoList } = this
      const length = videoList.length
      this.showChangeProgress = true
      videoList.forEach((item, index) => {
        if (!item.wallpaper) {
          this.changeProgress = Math.floor(((index + 1) / length) * 100)
          return true
        }

        let newName = item.menu.split('\\')
        let oldName = newName.splice(-1, 1, item.title).join('\\')
        newName = newName.join('\\')

        fs.renameSync(item.menu, newName)

        this.changeProgress = ((index + 1) / length) * 100
        this.$store.dispatch('content/changeFileInfo', {
          id: item.id,
          file: item.file.replace(oldName, item.title),
          menu: item.menu.replace(oldName, item.title),
          img: item.img.replace(oldName, item.title)
        })
      })
    }
  }
}
</script>

<style scoped lang='stylus'>

</style>

