<template>
  <div>
    <el-drawer title="关于"
               size="30%"
               :with-header="false"
               :visible.sync="show">

      <el-form label-width="80px">
        <el-from-item class="avatar-box">
          <el-avatar size="large" :src="circleUrl"></el-avatar>
        </el-from-item>

        <el-form-item label="作者">
          <span>Qzr</span>
        </el-form-item>

        <el-form-item label="github">
          <el-link href="https://github.com/HoldSworder/videoHub_vue"
                   target="_blank">https://github.com/HoldSworder/videoHub_vue</el-link>
        </el-form-item>

        <el-form-item>
          <span>欢迎大家来github提意见</span>
        </el-form-item>
      </el-form>

    </el-drawer>
  </div>
</template>

<script>
const ipc = require('electron').ipcRenderer

export default {
  data() {
    return {
      show: false,
      circleUrl: require('@/assets/avatar.jpg')
    }
  },
  methods: {
    setIpc() {
      const THAT = this
      ipc.on('showAbout', function(event, arg) {
        THAT.show = true
      })
    }
  },
  mounted() {
    this.setIpc()
  }
}
</script>

<style scoped lang='stylus'>
.avatar-box
  {$flexDefault}
</style>