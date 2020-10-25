<template>
  <div>
    <audio id="music" v-show="songUrl" :src="this.$store.state.songUrl" @timeupdate="updateTime" :autoplay="this.$store.state.playing" ref="audio">
    </audio>
    <Header></Header>
    <Tag></Tag>
    <MinPlayer v-show="this.$store.state.duration && this.$route.path.slice(1, 7) !== 'player'"></MinPlayer>
  </div>
</template>

<script>
import Header from './components/Header'
import Tag from './components/Tag'
import MinPlayer from './components/MinPlayer'

export default {
  name: 'Home',
  components: {
    Header,
    Tag,
    MinPlayer
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
  watch: {
    '$store.state.currentTime' () {
      this.$store.state.percent = this.$store.state.currentTime / this.$store.state.duration
      if (this.$store.state.currentTime === this.$store.state.duration && this.$store.state.loop === 1) {
        this.$refs.audio.currentTime = 0
        let music = document.getElementById('music')
        music.play()
      }
    },
    '$store.state.playing' () {
      let music = document.getElementById('music')
      if (music.paused) {
        music.play()
      } else if (music.play()) {
        music.pause()
      }
    },
    '$store.state.percentClick' () {
      this.$refs.audio.currentTime = this.$store.state.duration * this.$store.state.percentClick
    },
    '$store.state.songUrl' () {
      this.$store.state.currentTime = 0
    }
  }
}
</script>

<style>

</style>
