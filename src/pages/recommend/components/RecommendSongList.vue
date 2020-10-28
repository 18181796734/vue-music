<template>
  <div>
    <header class="header">推荐歌单</header>
    <ul class="content">
      <li class="box" @click="handleEnterClick(item.id)" v-for="item of recommendSongList" :key="item.id">
        <div class="top iconfont">&#xe77e;{{count(item.playCount)}}</div>
        <div class="image">
          <img v-lazy="item.picUrl" alt="">
        </div>
        <div class="bottom">
          {{item.name}}
        </div>
      </li>
    </ul>
    <div class="none" v-show="this.$store.state.duration"></div>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import {getRecommendList} from '@/api/recommend'
export default {
  name: 'RecommendSongList',
  data () {
    return {
      recommendSongList: []
    }
  },
  created () {
    this._getRecommendList()
  },
  methods: {
    count (n) {
      if (n < 10000) {
        return n
      } else if (n < 100000000) {
        return Math.round(n / 10000) + '万'
      } else {
        return Math.round(n / 100000000) + '亿'
      }
    },
    handleEnterClick (id) {
      this.$router.push({
        path: '/recommend/' + id
      })
    },
    _getRecommendList () {
      getRecommendList().then((res) => {
        this.recommendSongList = res.data.result
      })
    }
  }
}
</script>

<style lang="stylus" spoced>
  .header
    height 40px
    line-height 40px
  .content
    width 100vw
    display flex
    flex-wrap wrap
    justify-content space-around
    .box
      position relative
      width 31.5%
      .top
        position absolute
        height 20px
        line-height 20px
        width 100%
        font-size 12px
        color #fff
        background black
        border-radius 5px
        background linear-gradient(to bottom,rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))
        text-align right
      .image img
        margin 0 auto
        width 100%
        border-radius 5px
      .bottom
        width 100%
        font-size 12px
        height 30px
        line-height 15px
        text-overflow: ellipsis
        display: -webkit-box /** 对象作为伸缩盒子模型显示 **/
        -webkit-box-orient: vertical /** 设置或检索伸缩盒对象的子元素的排列方式 **/
        -webkit-line-clamp: 2 /** 显示的行数 **/
        overflow: hidden  /** 隐藏超出的内容 **/
  .none
    height 60px
    width 100vw
    background #fff
</style>
