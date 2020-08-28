<template>
  <div>
    <el-slider v-model="playerHeight"></el-slider>
    <el-card v-for="item of watchList"
             :key="item.id">
      <div slot="header">{{item.title}}</div>
      <div>
        <video class="player"
               :style="{height: playerHeight + 'px'}"
               :src="item.file"
               controls></video>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playerHeight: 100
    }
  },
  computed: {
    watchList() {
      return this.$store.getters['watch/getWatchList']
    }
  }
}
</script>

<style>
</style>