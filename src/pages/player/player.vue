<template>
  <div class="player">
    <div class="background">
      <img class="background-img" :src="imageUrl" alt="">
    </div>
    <div class="content">
      <div class="header">
      <div class="back iconfont" @click="handleBack">&#xe606;</div>
        <div class="name" v-if="songData[0]">
          <div class="song-name">{{songData[0].name}}</div>
          <div class="songer-name">{{songData[0].ar[0].name}}</div>
          <!-- <audio :src="songUrl" autoplay> -->
          <!-- </audio> -->
        </div>
      </div>
      <div class="image">
        <img class="image1" src="@/common/image/disc-ip6.png" alt="">
        <img class="image2" v-lazy="imageUrl" alt="">
      </div>
      <div class="time"></div>
      <div class="icon"></div>
    </div>
  </div>
</template>

<script>

import {getSongDetail, getSongUrl} from '@/api/player'

export default {
  name: 'Player',
  data () {
    return {
      songData: [],
      songUrl: '',
      imageUrl: ''
    }
  },
  created () {
    this._getSongDetail()
    this._getSongUrl()
  },
  methods: {
    handleBack () {
      this.$router.go(-1)
    },
    _getSongDetail () {
      getSongDetail(this.$route.params.id).then((res) => {
        this.songData = res.data.songs
        this.imageUrl = res.data.songs[0].al.picUrl
        console.log(this.songData)
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
    '$route' () {
      this._getSongDetail()
      this._getSongUrl()
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
        filter invert(10%) blur(40px)
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
        height calc(100vh - 150px)
        width 100vw
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
          position absolute
          top 50%
          left 50%
          transform translateX(-50%) translateY(-50%)
          border-radius 50%
</style>
