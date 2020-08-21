<template>
  <div>
    <h1>watch</h1>
    <div>{{fileArr}}</div>
  </div>
</template>

<script>
export default {
  computed: {
    fileArr() {
      return this.$store.getters['content/getVideoList']
    }
  }
}
</script>

<style>

</style>