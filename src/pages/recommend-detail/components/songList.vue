<template>
  <div class="allList" ref="wrapper">
    <div>
      <div class="header">
        <div class="header-icon iconfont">&#xe624;</div>
        <div class="header-text">
          播放全部
          <span>(共{{songList.length}}首)</span>
        </div>
      </div>
      <ul>
        <li class="list" v-for="(item, index) of songList" :key="item.id" @click="playClick(item.id)">
          <div class="list-index">{{index + 1}}</div>
          <div class="list-content">
            <div class="song-name">{{item.name}}</div>
            <div class="songer">{{songer(item.ar)}}&nbsp;-&nbsp;{{item.al.name}}</div>
          </div>
        </li>
        <li class="none" v-show="this.$store.state.duration"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'songList',
  props: {
    songList: Array
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true
    })
  },
  methods: {
    playClick (id) {
      this.$store.state.router = this.$route.path
      this.$router.push({
        path: '/player/' + id
      })
    },
    songer (arr) {
      var songer
      if (arr.length === 1) {
        return arr[0].name
      }
      switch (arr.length) {
        case 2:
          songer = arr[0].name + '/' + arr[1].name
          break
        case 3:
          songer = arr[0].name + '/' + arr[1].name + '/' + arr[2].name
          break
        case 4:
          songer = arr[0].name + '/' + arr[1].name + '/' + arr[2].name + '/' + arr[3].name
          break
        case 5:
          songer = arr[0].name + '/' + arr[1].name + '/' + arr[2].name + '/' + arr[3].name + '/' + arr[4].name
          break
        default:
          songer = arr[0].name + '/' + arr[1].name + '/' + arr[2].name + '/' + arr[3].name + '/' + arr[4].name + '...'
      }
      return songer
    }
  }
}
</script>

<style lang="stylus" scpoed>
  .allList
    width 100%
    height 100%
    .header
      display flex
      height 60px
      line-height 60px
      border-top-left-radius 30px
      border-top-right-radius 30px
      background #fff
      .header-icon
        width 12%
        text-align center
      .header-text
        flex 1
        font-size 16px
      .header-text span
        font-size 13px
        color #666
    .list
      display flex
      height 60px
      background #fff
      .list-index
        width 12%
        text-align center
        line-height 60px
      .list-content
        width 88%
        height 40px
        margin-top 10px
        .song-name
          width 95%
          height 25px
          line-height 25px
          font-size 14.5px
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
        .songer
          width 95%
          height 15px
          line-height 15px
          font-size 12px
          color #666
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
    .none
      height 60px
      width 100vw
      background #fff
</style>
