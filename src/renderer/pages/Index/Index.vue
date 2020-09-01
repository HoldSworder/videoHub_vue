<template>
  <div class="container">
    <div :style="{ display: fileArr.length === 0 ? 'block' : 'none' }">
      <el-button type="primary"
                 @click="chooseFile">
        选择文件夹开始
      </el-button>
    </div>

    <div :style="{ display: fileArr.length === 0 ? 'none' : 'block' }">
      <div class="header">
        <el-input placeholder="输入关键字进行搜索"
                  style="width: 200px"
                  @change="searchVideo" />

        <el-select v-model="sortType"
                   @change="sortFiles">
          <el-option value="default"
                     label="默认排序">
            默认排序
          </el-option>
          <el-option value="TIME POSITIVE"
                     label="日期升序">
            日期升序
          </el-option>
          <el-option value="TIME NEGATIVE"
                     label="日期降序">
            日期降序
          </el-option>
          <el-option value="DURATION POSITIVE"
                     label="时长升序">
            时长升序
          </el-option>
          <el-option value="DURATION NEGATIVE"
                     label="时长降序">
            时长降序
          </el-option>
          <el-option value="CAN NOT PLAY"
                     label="特殊文件">
            特殊文件
          </el-option>
          <el-option value="ERROR"
                     label="错误文件">
            错误文件
          </el-option>
        </el-select>
      </div>

      <div class="videoBox">
        <card v-for="(item, index) in showArr"
              :key="index"
              :card-data="item"
              @contextmenu.native.prevent="setRightTemplateHandler(item)" />
      </div>
    </div>
  </div>
</template>

<script>
import { saveConfig } from '@/script/handleData/handleConfig.js'
import { getFiles, fixVideoInfo, saveVideoData } from '@/script/getProgram'
import { setIpc, setRightTemplate } from './script/electron'

import card from '@/components/common/card'

const { remote } = require('electron')
const { shell, Menu, webContents, dialog } = remote
const ipc = window.require('electron').ipcRenderer

export default {
  components: {
    card
  },

  data() {
    return {
      sortType: 'default',
      fileArr: []
    }
  },

  computed: {
    showArr() {
      return this.fileArr
    }
  },

  mounted() {
    setIpc.call(this)
  },

  methods: {
    chooseFile() {
      dialog
        .showOpenDialog({
          title: '选择视频文件夹',
          properties: ['openFile', 'openDirectory']
        })
        .then(res => {
          saveConfig({
            dirPath: res.filePaths[0]
          })
          this.loadVideo()
        })
    },

    sortFiles() {
      console.log(this.sortType)
    },

    searchVideo() {},

    async loadVideo() {
      const files = await getFiles()

      this.fileArr = files

      const getNotify = this.$notify({
        title: '获取视频信息中...',
        message: '获取视频时长及缩略图片',
        duration: 0
      })

      const fixFiles = await fixVideoInfo(files)

      getNotify.close()

      this.$notify({
        title: '获取视频信息成功',
        message: '成功获取视频时长及缩略图片',
        type: 'success'
      })

      this.fileArr = fixFiles
    },

    setRightTemplateHandler(info) {
      setRightTemplate.call(this, info)
    }
  }
}
</script>

<style lang="stylus" scoped>
.videoBox
  display flex
  align-items center
  justify-content space-between
</style>
