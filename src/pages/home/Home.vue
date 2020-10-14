<template>
  <div>
    <audio id="music" v-show="songUrl" :src="this.$store.state.songUrl" @timeupdate="updateTime" :autoplay="this.$store.state.playing">
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
  methods: {
    updateTime (e) {
      this.$store.state.currentTime = e.target.currentTime
      this.$store.state.duration = e.target.duration
    }
  },
  created () {
    this.songUrl = ''
  },
  watch: {
    '$store.state.currentTime' () {
      this.$store.state.percent = this.$store.state.currentTime / this.$store.state.duration
    },
    '$store.state.playing' () {
      let music = document.getElementById('music')
      if (music.paused) {
        music.play()
      } else if (music.play()) {
        music.pause()
      }
    }
  }
}
</script>

<style>

</style>
