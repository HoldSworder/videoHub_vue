<template>
  <div>
    <el-drawer title="资助作者"
               size="30%"
               :with-header="false"
               :visible.sync="show">

      <div class="content">
        <img :src="sponsorUrl"
             class="sponsor-img" />
        <div>你的打赏,是我更新的动力</div>
      </div>

    </el-drawer>
  </div>
</template>

<script>
const ipc = require('electron').ipcRenderer

export default {
  data() {
    return {
      show: false,
      sponsorUrl: require('@/assets/sponsor.jpg')
    }
  },
  methods: {
    setIpc() {
      const THAT = this
      ipc.on('showSponsor', function(event, arg) {
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

.sponsor-img
  width 80%

.content
  {$flexDefault}
  flex-direction column
</style>