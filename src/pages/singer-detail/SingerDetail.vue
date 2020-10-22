<template>
  <div class="singer-detail">
    <div class="header">
      <div class="back iconfont" @click="handleBackClick">&#xe606;</div>
      <div class="name">{{singer}}</div>
    </div>
    <div class="content" ref="wrapper">
      <div>
        <div class="contrnt-header"></div>
        <div class="song">
          <ul>
            <li class="list" v-for="(item, index) of songList" :key="item.id" @click="handlePlayerClick(item.id)">
              <div class="index">{{index + 1}}</div>
              <div class="song-detail">
                <div class="song-name">{{item.name}}</div>
                <div class="singer-name">{{item.ar[0].name}} - {{item.al.name}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getSingerSong} from '@/api/singer'
import BScroll from 'better-scroll'

export default {
  name: 'SingerDetail',
  data () {
    return {
      songList: [],
      playingList: [],
      singer: ''
    }
  },
  created () {
    this._getSingerSong()
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true
    })
  },
  methods: {
    handleBackClick () {
      this.$router.push({
        path: '/singer'
      })
    },
    handlePlayerClick (id) {
      this.$store.state.router = this.$route.path
      this.$router.push({
        path: '/player/' + id
      })
    },
    _getSingerSong () {
      getSingerSong(this.$route.params.id).then((res) => {
        this.songList = res.data.songs
        this.singer = this.songList[0].ar[0].name
        for (let i = 0; i < this.songList.length; i++) {
          this.playingList.push(this.songList[i].id)
        }
        this.$store.state.playingList = this.playingList
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  .singer-detail
    height 100vh
    width 100vw
    position absolute
    top 0
    left 0
    bottom 0
    right 0
    background #fff
    .header
      display flex
      height 80px
      line-height 50px
      width 100%
      color #ffffff
      background rgba(198, 47, 47, 0.8)
      .back
        width 60px
        font-size 24px
        text-align center
      .name
        flex 1
        font-size 20px
    .content
      width 100vw
      height calc(100vh - 50px)
      position absolute
      top 50px
      background #fff
      border-top-left-radius 30px
      border-top-right-radius 30px
      overflow hidden
      .contrnt-header
        width 100vw
        height 30px
      .song
        width 100vw
        overflow hidden
        .list
          display flex
          width 100%
          height 60px
          .index
            width 12%
            line-height 60px
            text-align center
          .song-detail
            width 80%
            .song-name
              width 100%
              height 25px
              line-height 25px
              margin-top 10px
              overflow hidden
              white-space nowrap
              text-overflow ellipsis
            .singer-name
              width 100%
              height 15px
              line-height 15px
              font-size 12px
              overflow hidden
              white-space nowrap
              text-overflow ellipsis
</style>
