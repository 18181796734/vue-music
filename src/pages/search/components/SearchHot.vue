<template>
  <div class="hot">
    <div class="header">
      <div class="text">热搜榜</div>
    </div>
    <div class="hot-list" v-for="(item, index) of hotSearchList" :key="index">
      <ul>
        <li class="song"  @click="handleSearchClick(item.first)">
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
    handleSearchClick (key) {
      this.$emit('getHotSong', key)
    },
    _getSearchHotList () {
      getSearchHotList(this.$route.params.id).then((res) => {
        this.hotSearchList = res.data.result.hots
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
      font-weight bold
      font-size 14px
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
