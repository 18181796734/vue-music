<template>
  <div class="search">
    <div class="header">
      <div class="back iconfont" @click="handleBack">&#xe606;</div>
      <input class="search-key" v-model="saerchKey">
      <div @click="handleDetale" class="detele iconfont">{{saerchKey==='' ? '' : '&#xe600;'}}</div>
    </div>
    <SearchHot v-show="!search" @getHotSong="getHotSong"></SearchHot>
    <div v-show="search" class="resuits" ref="wrapper">
      <ul>
        <li class="list" @click="playClick(item.id)" v-for="item of searchResuitsList" :key=item.id>
          <div class="song-name">{{item.name}}</div>
          <div class="more">
            <div class="songer"><span>{{item.artists[0].name}}</span> - {{item.album.name}}</div>
          </div>
        </li>
        <li class="none" v-show="this.$store.state.duration"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import {getSearch} from '@/api/search'
import SearchHot from './components/SearchHot'
import BScroll from 'better-scroll'

export default {
  name: 'Search',
  components: {
    SearchHot
  },
  data () {
    return {
      saerchKey: '',
      search: false,
      searchResuitsList: [],
      playingList: []
    }
  },
  created () {
    let _this = this
    document.onkeydown = function (e) { // 按下回车提交
      let key = window.event.keyCode // 事件中keycode=13为回车事件
      if (key === 13) {
        _this._getSearch()
      }
    }
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true
    })
  },
  methods: {
    handleBack () {
      this.$router.push({
        path: '/recommend'
      })
    },
    handleDetale () {
      this.saerchKey = ''
      this.search = !this.search
    },
    _getSearch () {
      this.search = !this.search
      getSearch(this.saerchKey).then((res) => {
        this.searchResuitsList = res.data.result.songs
        for (let i = 0; i < this.searchResuitsList.length; i++) {
          this.playingList.push(this.searchResuitsList[i].id)
        }
        this.$store.state.playingList = this.playingList
      })
    },
    getHotSong (key) {
      this.saerchKey = key
      this._getSearch()
    },
    playClick (id) {
      this.$store.state.router = this.$route.path
      this.$router.push({
        path: '/player/' + id
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  .search
    position absolute
    top 0
    left 0
    width 100vw
    height 100vh
    background #fff
    .header
      display flex
      height 50px
      margin-bottom 10px
      .back
        width 60px
        height 50px
        line-height 50px
        text-align center
        font-size 24px
      .search-key
        height 40px
        width calc(100vw - 130px)
        outline none
        border none
        border-bottom 1px solid #666
        font-size 17px
      .detele
        height 42px
        width 40px
        line-height 40px
        text-align center
        border-bottom 1px solid #666
    .resuits
      width 100%
      height calc(100vh - 60px)
      position absolute
      top 60px
      left 0
      overflow hidden
      .list
        width 92%
        height 50px
        margin-left 5%
        .song-name
          width 100%
          font-size 14.5px
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
        .more
          display flex
          width 100%
          line-height 20px
          font-size 12px
          color #666
        .more span
          color blue
      .none
        height 60px
        width 100vw
        background #fff
</style>
