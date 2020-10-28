<template>
  <div class="recommend-detail">
    <header>
      <div class="back iconfont" @click="handleBackClick">&#xe606;</div>
      <div class="header-text">歌单</div>
    </header>
    <div class="content">
      <div class="box">
        <div class="content-img">
          <img :src="playlist.coverImgUrl" class="background-img" alt="">
          <div class="title">
            <div class="left">
              <img v-lazy="playlist.coverImgUrl" alt="">
              <div class="count iconfont">&#xe77e;{{count(playlist.playCount)}}</div>
            </div>
            <div class="right">
              <div class="right-top">{{playlist.name}}</div>
              <div class="right-bottom">{{playlist.description}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="playlist">
      <songList :songList="songList"></songList>
    </div>
  </div>
</template>

<script>
// import BScroll from 'better-scroll'
import {getPlayList} from '@/api/playlist'
import songList from './components/songList'

export default {
  name: 'RecommendDetail',
  components: {
    songList
  },
  data () {
    return {
      playlist: [],
      songList: [],
      playingList: []
    }
  },
  created () {
    this._getPlayList()
  },
  methods: {
    handleBackClick () {
      this.$router.push({
        path: '/recommend'
      })
    },
    count (n) {
      if (n < 10000) {
        return n
      } else if (n < 100000000) {
        return Math.round(n / 10000) + '万'
      } else {
        return Math.round(n / 100000000) + '亿'
      }
    },
    _getPlayList () {
      this.$store.state.cookie = localStorage.getItem('登入令牌')
      getPlayList(this.$route.params.id, this.$store.state.cookie).then((res) => {
        this.playlist = res.data.playlist
        this.songList = res.data.playlist.tracks
        for (let i = 0; i < this.songList.length; i++) {
          this.playingList.push(res.data.playlist.trackIds[i].id)
        }
        this.$store.state.playingList = this.playingList
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .recommend-detail
    width 100vw
    height 100vh
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    background #fff
    z-index 100
    header
      z-index 400
      position fixed
      top 0
      display flex
      height 50px
      line-height 50px
      font-size 18px
      color #fff
      .back
        width 60px
        text-align center
        font-size 25px
      .header-text
        width calc(100vw - 60px)
    .content
      z-index 100
      // position absolute
      // top 0
      // height 100vh
      // overflow hidden
      .box
        width 100%
        .content-img
          border-bottom-left-radius 20px
          border-bottom-right-radius 20px
          height 250px
          .background-img
            z-index 100
            width 100%
            height 110%
            filter: invert(10%) blur(25px)
          .title
            z-index 300
            display flex
            width 100vw
            position absolute
            top 60px
            height 130px
            .left
              width 140px
              margin 0 15px
              .count
                position absolute
                top 0
                left 15px
                width 130px
                height 25px
                line-height 25px
                font-size 12px
                text-align right
                border-radius 5px
                background linear-gradient(to bottom,rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))
                color #fff
            .left img
              width 130px
              border-radius 5px
            .right
              flex 1
              padding-right 10px
              .right-top
                font-size 18px
                color #fff
                font-weight bold
                height 75px
                line-height 25px
                text-overflow ellipsis
                display -webkit-box /** 对象作为伸缩盒子模型显示 **/
                -webkit-box-orient vertical /** 设置或检索伸缩盒对象的子元素的排列方式 **/
                -webkit-line-clamp 3 /** 显示的行数 **/
                overflow hidden  /** 隐藏超出的内容 **/
              .right-bottom
                font-size 14px
                color #eee
                height 55px
                line-height 18.33px
                text-overflow ellipsis
                display -webkit-box /** 对象作为伸缩盒子模型显示 **/
                -webkit-box-orient vertical /** 设置或检索伸缩盒对象的子元素的排列方式 **/
                -webkit-line-clamp 3 /** 显示的行数 **/
                overflow hidden  /** 隐藏超出的内容 **/
    .playlist
      height calc(100vh - 50px)
      overflow hidden
</style>
