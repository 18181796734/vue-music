<template>
  <div class="content" ref="wrapper">
    <div class="box">
      <Banner></Banner>
      <v-touch v-on:swipeleft="swipeleft" class="recommend">
        <RecommendSongList></RecommendSongList>
      </v-touch>
    </div>
  </div>
</template>

<script>
import Banner from './components/Banner'
import RecommendSongList from './components/RecommendSongList'
import BScroll from 'better-scroll'

export default {
  name: 'Recommend',
  components: {
    Banner,
    RecommendSongList
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true
    })
  },
  methods: {
    swipeleft () {
      this.$router.push({
        'path': '/rank'
      })
    }
  }
}

</script>

<style lang="stylus" scoped>
  .content
    position absolute
    top 5.7rem
    left 0
    height calc(100vh - 5.7rem)
    overflow hidden
    .box
      width 100vw
      .recommend
        width 100%
</style>
