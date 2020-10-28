<template>
  <div class="min-player" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
    <div class="image" @click="handleRouteClick">
      <img v-lazy="this.imageUrl" alt="">
    </div>
    <div class="song">
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
        {{this.$store.state.playing === true ? '&#xe663;' : '&#xe624;'}}
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
      dashArray: Math.PI * 100,
      touch: {}
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
      this.$store.state.router = this.$route.path
      this.$router.push({
        path: '/player/' + this.$store.state.playSongId
      })
    },
    handlePauseClick () {
      this.$store.state.playing = !this.$store.state.playing
    },
    touchStart (e) {
      this.touch.status = true
      this.touch.startX = e.touches[0].pageX
      console.log(this.touch.startX)
    },
    touchMove (e) {
      if (this.touch.status) {
        // const deltax = e.touches[0].pageX - this.touch.startX
        // if (deltax > 50) {
        //   console.log('测试')
        //   this.changeSong('on')
        // } else if (deltax < -50) {
        //   alert('下一曲')
        // }
      }
    },
    touchEnd (e) {
      this.touch.status = false
      console.log(e.changedTouches[0].pageX)
      const deltax = e.changedTouches[0].pageX - this.touch.startX
      console.log(deltax)
      if (deltax > 100) {
        console.log('测试')
        this.changeSong('on')
      } else if (deltax < -100) {
        this.changeSong('under')
      } else if (deltax === 0) {
        this.handleRouteClick()
      }
    },
    changeSong (change) {
      let playingList = this.$store.state.playingList
      let id = Number(this.$store.state.playSongId)
      console.log(playingList)
      console.log(id)
      if (change === 'on') {
        if (playingList.indexOf(id) > -1) {
          let n = playingList.indexOf(id) === 0 ? playingList.length - 1 : -1
          this.$store.state.playSongId = playingList[playingList.indexOf(id) + n]
        } else {
          this.$store.state.playSongId = playingList[0]
        }
      } else {
        if (playingList.indexOf(id) > -1) {
          let n = playingList.indexOf(id) === playingList.length - 1 ? playingList.length - 1 : -1
          this.$store.state.playSongId = playingList[playingList.indexOf(id) - n]
        }
      }
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
    },
    '$store.state.playSongId' () {
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
        font-size 20px
</style>
