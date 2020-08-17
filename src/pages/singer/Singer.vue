<template>
  <v-touch v-on:swiperight="swiperight" class="singer">
    歌手详情页
  </v-touch>
</template>

<script>
export default {
  name: 'Singer',
  methods: {
    swiperight () {
      this.$router.push({
        'path': '/rank'
      })
    }
  }
}
</script>

<style lang="stylus" scpoed>
  .singer
    height 20rem
</style>
