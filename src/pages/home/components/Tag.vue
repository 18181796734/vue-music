<template>
  <nav>
    <router-link tag="div" class="item" to="/recommend">
      推荐
    </router-link>
    <router-link tag="div" class="item" to="/rank">
      排行
    </router-link>
    <router-link tag="div" class="item" to="/singer">
      歌手
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'Tag'
}
</script>

<style lang="stylus" scoped>
  nav
    display flex
    width 100%
    height 2.5rem
    line-height 2.5rem
    background rgb(198,47,47)
    .item
      flex 1
      text-align center
      color #fff
    .router-link-active
      font-weight bold
</style>
