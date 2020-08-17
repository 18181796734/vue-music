<template>
  <div>
    <v-touch v-on:swipeleft="swipeleft" v-on:swiperight="swiperight" class="swipe">
      排行榜
    </v-touch>
  </div>
</template>

<script>
export default {
  name: 'Rank',
  methods: {
    swipeleft () {
      this.$router.push({
        'path': '/singer'
      })
    },
    swiperight () {
      this.$router.push({
        'path': '/recommend'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .swipe
    height 20rem
</style>
