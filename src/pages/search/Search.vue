<template>
  <div class="search">
    <div class="header">
      <div class="back iconfont" @click="handleBack">&#xe606;</div>
      <input class="search-key" v-model="saerchKey">
      <div @click="handleDetale" class="detele">{{saerchKey==='' ? '' : 'X'}}</div>
    </div>
    <SearchHot></SearchHot>
  </div>
</template>

<script>
import SearchHot from './components/SearchHot'
export default {
  name: 'Search',
  components: {
    SearchHot
  },
  data () {
    return {
      saerchKey: ''
    }
  },
  created () {
    let _this = this
    document.onkeydown = function (e) { // 按下回车提交
      let key = window.event.keyCode // 事件中keycode=13为回车事件
      if (key === 13) {
        _this.enterSearch()
      }
    }
  },
  methods: {
    handleBack () {
      this.$router.go(-1)
    },
    handleDetale () {
      this.saerchKey = ''
    },
    enterSearch () {
      alert('123')
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
</style>
