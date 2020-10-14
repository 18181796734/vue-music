<template>
  <div class="player">
    <!-- <audio id="music" :src="songUrl" autoplay>
    </audio> -->
    <div class="background">
      <img class="background-img" :src="imageUrl" alt="">
    </div>
    <div class="content">
      <div class="header">
        <div class="back iconfont" @click="handleBack">&#xe606;</div>
        <div class="name" v-if="songData[0]">
          <div class="song-name">{{songData[0].name}}</div>
          <div class="songer-name">{{songData[0].ar[0].name}}</div>
        </div>
      </div>
      <div class="image-lyric" @click="handleLyricClick">
        <div class="image" v-show="!lyric">
          <img class="image1" src="@/common/image/disc-ip6.png" alt="">
          <img class="image2 autoRotate" :class="{imageTurn:this.$store.state.imageTurn}" v-lazy="imageUrl" alt="">
        </div>
        <Lyric v-show="lyric"></Lyric>
      </div>
      <Time></Time>
      <div class="icon iconfont">
        <div class="loop" @click="handLoopClick">{{this.$store.state.loop === 0 ? '&#xe66c;' : '&#xe66d;'}}</div>
        <div class="on" @click="handlechangeClick('on')">&#xe6e1;</div>
        <div class="playing" @click="handlePlaying">
          <div class="play-icon">
            {{this.$store.state.playing === true ? '&#xe663;' : '&#xe624;'}}
          </div>
        </div>
        <div class="under" @click="handlechangeClick('under')">&#xe718;</div>
        <div class="like">&#xe648;</div>
      </div>
    </div>
  </div>
</template>

<script>

import Time from './components/Time'
import Lyric from './components/Lyric'
import {getSongDetail, getSongUrl} from '@/api/player'

export default {
  name: 'Player',
  components: {
    Time,
    Lyric
  },
  data () {
    return {
      songData: [],
      songUrl: '',
      imageUrl: '',
      lyric: false
    }
  },
  created () {
    this._getSongDetail()
    this._getSongUrl()
  },
  methods: {
    handleLyricClick () {
      this.lyric = !this.lyric
    },
    handLoopClick () {
      this.$store.state.loop = this.$store.state.loop === 0 ? 1 : 0
    },
    handlechangeClick (change) {
      let playingList = this.$store.state.playingList
      let id = Number(this.$route.params.id)
      if (change === 'on') {
        if (playingList.indexOf(id) > -1) {
          let n = playingList.indexOf(id) === 0 ? playingList.length - 1 : (-1)
          this.$router.push({
            path: '/player/' + playingList[playingList.indexOf(id) + n]
          })
        } else {
          this.$router.push({
            path: '/player/' + playingList[0]
          })
        }
      } else {
        if (playingList.indexOf(id) > -1) {
          let n = playingList.indexOf(id) === playingList.length - 1 ? playingList.length - 1 : -1
          this.$router.push({
            path: '/player/' + playingList[playingList.indexOf(id) - n]
          })
        } else {
          this.$router.push({
            path: '/player/' + playingList[0]
          })
        }
      }
    },
    handlePlaying () {
      if (this.$store.state.playing === false) {
        this.$store.state.playing = true
        this.$store.state.imageTurn = false
      } else {
        this.$store.state.playing = false
        this.$store.state.imageTurn = true
      }
    },
    handleBack () {
      if (this.$store.state.router) {
        this.$router.push({
          path: this.$store.state.router
        })
      } else {
        this.$router.go(-1)
      }
    },
    // lyricStatus () {
    //   this.lyric = false
    // },
    _getSongDetail () {
      getSongDetail(this.$route.params.id).then((res) => {
        this.songData = res.data.songs
        this.imageUrl = res.data.songs[0].al.picUrl
      })
    },
    _getSongUrl () {
      getSongUrl(this.$route.params.id).then((res) => {
        this.songUrl = res.data.data[0].url
        this.$store.state.songUrl = this.songUrl
      })
    }
  },
  watch: {
    '$route.params.id' () {
      this._getSongDetail()
      this._getSongUrl()
    },
    '$store.state.currentTime' () {
      if (this.$store.state.currentTime === this.$store.state.duration && this.$store.state.loop === 0) {
        this.handlechangeClick('under')
      }
    }
  }
}
</script>

<style lang="stylus" scpoed>
  .player
    position absolute
    top 0
    left 0
    background #fff
    width 100vw
    height 100vh
    .background
      width 100vw
      height 100vh
      .background-img
        width 100vw
        height 100vh
        filter invert(25%) blur(40px)
    .content
      width 100vw
      height 100vh
      position fixed
      top 0
      left 0
      color #fff
      .header
        width 100%
        height 50px
        display flex
      .back
        width 60px
        height 50px
        line-height 50px
        text-align center
        font-size 24px
      .name
        flex 1
        .song-name
          width calc(100vw - 60px)
          height 30px
          line-height 30px
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
        .songer-name
          height 20px
          line-height 20px
          font-size 13px
          color #ccc
      .image
        position relative
        height calc(100vh - 200px)
        width 100vw
        text-align center
        .image1
          width 70vw
          height 70vw
          position absolute
          top 50%
          left 50%
          transform translateX(-50%) translateY(-50%)
        .image2
          width 44vw
          height 44vw
          position relative
          top 50%
          margin-top -22vw
          border-radius 50%
        @keyframes autoRotate{
          to{
            transform: rotateZ(360deg);
          }
        }
        .autoRotate{
          animation-name:autoRotate;
          animation-iteration-count:infinite;
          animation-timing-function: linear;
          animation-duration:20s;
          animation-play-state:running;
        }
        .imageTurn{
          animation-play-state:paused;
        }
      .icon
        width 100vw
        height 100px
        display flex
        font-size 23px
        text-align center
        line-height 100px
        .loop
          width 20%
        .on
          width 20%
        .playing
          width 20vw
          position relative
          .play-icon
            position absolute
            top 50%
            left 50%
            transform translateX(-50%) translateY(-50%)
            width 12vw
            height 12vw
            font-size 28px
            border-radius 50%
            border 2.5px solid #fff
            text-align center
            line-height 12vw
        .under
          width 20%
        .like
          width 20%
</style>
