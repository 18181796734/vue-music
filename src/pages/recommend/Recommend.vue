<template>
  <v-touch v-on:swipeleft="swipeleft" class="recommend">
    推荐
  </v-touch>
</template>

<script>
export default {
  name: 'Recommend',
  methods: {
    swipeleft () {
      this.$router.push({
        'path': '/rank'
      })
    }
  }
}

</script>

<style lang="stylus" scoped>
  .recommend
    height 20rem
</style>
