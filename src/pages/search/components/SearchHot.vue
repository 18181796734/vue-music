<template>
  <div class="hot">
    <div class="header">
      <div class="text">热搜榜</div>
      <div class="iconfont">&#xe624;播放全部</div>
    </div>
    <div class="hot-list" v-for="(item, index) of hotSearchList" :key="index">
      <ul>
        <li class="song">
          <div class="index">{{index + 1}}</div>
          <div>{{item.first}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {getSearchHotList} from '@/api/search'
export default {
  name: 'SearchHot',
  data () {
    return {
      hotSearchList: []
    }
  },
  created () {
    this._getSearchHotList()
  },
  methods: {
    _getSearchHotList () {
      getSearchHotList(this.$route.params.id).then((res) => {
        this.hotSearchList = res.data.result.hots
        console.log(this.hotSearchList)
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  .header
    // display flex
    width 90%
    height 50px
    margin-left 5%
    border-bottom 1px solid #ccc
    .text
      line-height 50px
      float left
      font-weight bold
      font-size 14px
    .iconfont
      font-size 14px
      height 26px
      line-height 30px
      margin-top 12px
      float right
      border 1px solid #ccc
      border-radius 50px
  .hot-list
    width 100vw
    .song
      display flex
      width 50vw
      float left
      height 40px
      line-height 40px
      .index
        width 15%
        text-align center
        color #666
</style>
