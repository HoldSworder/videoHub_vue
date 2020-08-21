<template>
  <div className="container">
    <div :style="{ display: fileArr.length === 0 ? 'block' : 'none' }">
      <el-button type="primary" @click="chooseFile">选择文件夹开始</el-button>
    </div>

    <div :style="{ display: fileArr.length === 0 ? 'none' : 'block' }">
      <div className="header">

        <el-input
          @change="searchVideo"
          placeholder="输入关键字进行搜索"
          style="width: 200px"></el-input>

        <el-select @change="sortFiles" v-model="sortType">
          <el-option value="default" label="默认排序">默认排序</el-option>
          <el-option value="TIME POSITIVE" label="日期升序">日期升序</el-option>
          <el-option value="TIME NEGATIVE" label="日期降序">日期降序</el-option>
          <el-option value="DURATION POSITIVE" label="时长升序">时长升序</el-option>
          <el-option value="DURATION NEGATIVE" label="时长降序">时长降序</el-option>
          <el-option value="CAN NOT PLAY" label="特殊文件">特殊文件</el-option>
          <el-option value="ERROR" label="错误文件">错误文件</el-option>
        </el-select>
      </div>

      <div class="videoBox">
        <el-card v-for="(item, index) in showArr" :key="index" shadow="hover">
          <img :src="item.img" />
          <div>
            <span>{{ item.title }}</span>
            <div class="clearfix">
              <time>{{ item.duration }}</time>
            </div>    
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { saveConfig } from '@/script/handleData/handleConfig.js'
import { getFiles, fixVideoInfo, saveVideoData } from '@/script/getProgram'

const { remote } = require('electron')
const { shell, Menu, webContents, dialog } = remote 
const ipc = window.require('electron').ipcRenderer

export default {
  data() {
    return {
      sortType: 'default',
    }
  },
  computed: {
    fileArr() {
      return this.$store.getters['content/getVideoList']
    },
    showArr() {
      return this.fileArr
    }
  },
  methods: {
    chooseFile() {
      dialog.showOpenDialog({
        title: '选择视频文件夹',
        properties: ['openFile', 'openDirectory']
      }).then(res => {
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
      await this.$store.dispatch('content/loadFile', document)
    },

    setIpc() {
      const THAT = this
      ipc.on('resetFile', function(event, arg) {
        THAT.$store.dispatch('content/setVideoList', [])
      })

      ipc.on('setVideoFile', function(event, arg) {
        THAT.$store.dispatch('content/setVideoList', [])
        THAT.loadVideo()
      })
    }
  },
  mounted() {
    console.log(this.$store)
    this.setIpc()
    console.log(this.sortType)
  }
}
</script>

<style scoped>
</style>
