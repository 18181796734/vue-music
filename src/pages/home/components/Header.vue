<template>
  <div class="header">
    <router-link tag="div" to="/mine" class="left iconfont">&#xe61c;</router-link>
    <div class="log">网抑云音乐</div>
    <router-link tag="div" to="/search" class="right iconfont">&#xe60f;</router-link>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="stylus" scoped>
  .header
    display flex
    height 3.2rem
    line-height 3.2rem
    font-size 1.5rem
    text-align center
    background rgb(198,47,47)
    color #fff
    .left
      width 15%
    .log
      flex 1
      font-weight  bold
      letter-spacing 3px
    .right
      width 15%
      font-size 25px
</style>
