<template>
  <div>
    <audio v-show="songUrl" :src="this.$store.state.songUrl" autoplay>
    </audio>
    <Header></Header>
    <Tag></Tag>
  </div>
</template>

<script>
import Header from './components/Header'
import Tag from './components/Tag'

export default {
  name: 'Home',
  components: {
    Header,
    Tag
  },
  data () {
    return {
      songUrl: ''
    }
  },
  created () {
    this.songUrl = 'http://m8.music.126.net/20201006141236/9a09ef5bc353cdcfb57eea30da1300bc/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/4124751486/9d68/e2d1/b40c/2da1c3edacbc04f91b61e10ed0c17bf0.mp3'
  }
}
</script>

<style>

</style>
