<template>
  <div id="app">
    <router-view />
    <about />
    <sponsor />
  </div>
</template>

<script>
import about from '@/components/common/about'
import sponsor from '@/components/common/sponsor'

export default {
  name: 'VideoHub',
  components: {
    about,
    sponsor
  }
}
</script>

<style lang="stylus">
@import './stylus/index'
</style>
