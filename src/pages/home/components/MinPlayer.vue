<template>
  <div class="min-player">
    <div class="image" @click="handleRouteClick">
      <img v-lazy="this.imageUrl" alt="">
    </div>
    <div class="song" @click="handleRouteClick">
      <div class="songname" v-if="songData[0]">
        {{songData[0].name}}
      </div>
      <div class="songer" v-if="songData[0]">
        <span>{{songData[0].ar[0].name}}</span> - {{songData[0].al.name}}
      </div>
    </div>
    <div class="time" @click="handlePauseClick">
      <svg width="50" height="50" viewBox="0 0 100 100" version="1.1">
        <circle class="progress-background" stroke-width="4" r="45" cx="50" cy="50" fill="transparent" :stroke-dasharray="dashArray"></circle>
        <circle class="progress-bar" stroke-width="4" r="45" cx="50" cy="50" fill="transparent" :stroke-dasharray="dashArray" :stroke-dashoffset="dashOffset"></circle>
      </svg>
      <div class="iconfont">
        {{this.$store.state.playing === true ? '&#xe6a9;' : '&#xe651;'}}
      </div>
    </div>
  </div>
</template>

<script>
import {getSongDetail} from '@/api/player'

export default {
  name: 'MinPlayer',
  data () {
    return {
      songData: [],
      imageUrl: '',
      dashArray: Math.PI * 100
    }
  },
  computed: {
    dashOffset () {
      return this.dashArray * (1 - this.$store.state.percent)
    }
  },
  created () {
    this._getSongDetail()
  },
  methods: {
    handleRouteClick () {
      this.$router.push({
        path: '/player/' + this.$store.state.playSongId
      })
    },
    handlePauseClick () {
      this.$store.state.playing = !this.$store.state.playing
    },
    _getSongDetail () {
      if (this.$store.state.playSongId) {
        getSongDetail(this.$store.state.playSongId).then((res) => {
          this.songData = res.data.songs
          this.imageUrl = res.data.songs[0].al.picUrl
        })
      }
    }
  },
  watch: {
    '$store.state.songUrl' () {
      this._getSongDetail()
    }
  }
}
</script>
<style lang="stylus" scoped>
  .min-player
    z-index 500
    width 100vw
    height 60px
    position fixed
    bottom 0
    left 0
    background #fff
    display flex
    box-sizing border-box
    border-top 1px solid #ccc
    .image
      width 70px
      height 60px
    .image img
      width 50px
      height 50px
      border-radius 50%
      margin-top 5px
      margin-left 10px
    .song
      width 60%
      margin-top 10px
      .songname
        font-size 15px
        line-height 25px
        width 100%
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
      .songer
        width 100%
        font-size 12px
        line-height 15px
        color #666
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
    .time
      flex 1
      text-align center
      position relative
      svg
        margin-top 5px
        .progress-background
          transform-origin center
          transform scale(0.9)
          stroke #ccc
        .progress-bar
          transform-origin center
          transform scale(0.9) rotate(-90deg)
          stroke rgb(198,47,47)
      .iconfont
        position absolute
        top 50%
        left 50%
        transform translateX(-50%) translateY(-50%)
        font-size 22px
</style>
