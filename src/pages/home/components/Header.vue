<template>
  <div class="header">
    <div class="left">=</div>
    <div class="log">小可爱音乐</div>
    <div class="right">Q</div>
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
</style>
