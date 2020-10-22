<template>
  <div>
    <div class="content" ref="wrapper">
      <div class="box">
        <Banner></Banner>
        <v-touch v-on:swipeleft="swipeleft" class="recommend">
          <RecommendSongList></RecommendSongList>
        </v-touch>
      </div>
    </div>
    <div class="none" v-show="this.$store.state.duration"></div>
    <router-view></router-view>
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
  .none
    height 100px
    width 100vw
    background #fff
</style>
