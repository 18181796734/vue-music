<template>
  <div class="lyric" ref="wrapper">
    <ul v-show="this.lyric">
      <li class="list" :class="{'current': currentLineNum === index}" v-for="(item, index) of lyricList.lines" :key="index" ref="lyricLine">
        {{item.txt}}
      </li>
    </ul>
    <p class="text" v-show="!this.lyric">该歌曲为纯音乐</p>
  </div>
</template>

<script>
import {getLyric} from '@/api/player'
import Lyric from 'lyric-parser'
import BScroll from 'better-scroll'

export default {
  name: 'Lyric',
  data () {
    return {
      lyric: '',
      lyricList: {},
      currentLineNum: 0
    }
  },
  created () {
    this._getLyric()
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true
    })
  },
  methods: {
    _getLyric () {
      getLyric(this.$store.state.playSongId).then((res) => {
        this.lyric = res.data.lrc
        if (this.lyric) {
          this.lyricList = new Lyric(res.data.lrc.lyric, this.handleLyric)
          if (this.$store.state.playing) {
            this.lyricList.play()
          }
        }
      })
    },
    handleLyric ({lineNum, txt}) {
      this.currentLineNum = lineNum
      let lineTagrget = this.$refs.lyricLine[lineNum - 4]
      this.scroll.scrollToElement(lineTagrget, 1000)
    }
  },
  watch: {
    '$store.state.currentTime' () {
      if (this.$store.state.currentTime === this.$store.state.duration && this.$store.state.loop === 1) {
        this.lyricList.seek(0)
      }
    },
    '$store.state.songUrl' () {
      if (this.lyric) {
        this.lyricList.stop()
      }
      this._getLyric()
    },
    '$store.state.playing' () {
      if (this.lyric) {
        this.lyricList.togglePlay()
      }
    },
    '$store.state.percentClick' () {
      this.lyricList.seek(this.$store.state.percentClick * this.$store.state.duration * 1000)
      if (this.lyric && this.$store.state.playing === false) {
        this.lyricList.togglePlay()
      }
    }
  }
}

</script>
<style lang="stylus" scoped>
  .lyric
    height calc(100vh - 200px)
    width 100vw
    overflow hidden
    .list
      width 80%
      height 30px
      margin 20px 10%
      text-align center
      &.current
        color red
    .text
      height calc(100vh - 200px)
      line-height calc(100vh - 200px)
      text-align center
</style>
