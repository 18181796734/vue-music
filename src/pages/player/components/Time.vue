<template>
  <div class="time" @click="progressClick">
    <div class="pargress-box">
      <span class="time time-left">{{format(this.$store.state.currentTime)}}</span>
      <div class="pargress-bar" ref="progressBar">
        <div class="bar-box">
          <div class="progress" ref="progress"></div>
          <div class="progress-btn-box" ref="progressBtn" @touchstart="progressTouchStart" @touchmove="progressTouchMove" @touchend="progressTouchEnd">
          </div>
        </div>
      </div>
      <span class="time time-right">{{format(this.$store.state.duration)}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Time',
  data () {
    return {
      touch: {}
    }
  },
  methods: {
    progressClick (e) {
      this.$refs.progress.style.width = `${e.offsetX}px`
      this.$refs.progressBtn.style.transform = `translate3D(${e.offsetX}px, 0, 0)`
      const barWidth = this.$refs.progressBar.clientWidth
      this.$store.state.percentClick = this.$refs.progress.clientWidth / barWidth
    },
    progressTouchStart (e) {
      this.touch.status = true
      this.touch.startX = e.touches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth
    },
    progressTouchMove (e) {
      if (this.touch.status) {
        const deltax = e.touches[0].pageX - this.touch.startX
        const offsetWidth = Math.min(this.$refs.progressBar.clientWidth, Math.max(0, this.touch.left + deltax))
        this.$refs.progress.style.width = `${offsetWidth}px`
        this.$refs.progressBtn.style.transform = `translate3D(${offsetWidth}px, 0, 0)`
      }
    },
    progressTouchEnd () {
      this.touch.status = false
      const barWidth = this.$refs.progressBar.clientWidth
      this.$store.state.percentClick = this.$refs.progress.clientWidth / barWidth
    },
    format (time) {
      time = time | 0
      let minute = time / 60 | 0
      let second = time % 60
      minute = minute < 10 ? '0' + minute : minute
      second = second < 10 ? '0' + second : second
      return minute + ':' + second
    }
  },
  watch: {
    '$store.state.percent' () {
      if (this.$store.state.percent > 0) {
        const barWidth = this.$refs.progressBar.clientWidth
        const offsetWidth = barWidth * this.$store.state.percent
        this.$refs.progress.style.width = `${offsetWidth}px`
        this.$refs.progressBtn.style.transform = `translate3D(${offsetWidth}px, 0, 0)`
      }
    }
  }
}

</script>
<style lang="stylus" scoped>
  .time
    width 100vw
    height 50px
    .pargress-box
      display flex
      width 90vw
      margin-left 5vw
      .time
        width 15%
        font-size 13px
        line-height 50px
        text-align center
      .pargress-bar
        width 70%
        height 50px
        .bar-box
          position relative
          top 24px
          height 2px
          background rgba(0, 0, 0, 0.3)
          .progress
            position absolute
            height 100%
            background rgb(198, 47, 47)
          .progress-btn-box
            position absolute
            left -3px
            top -3px
            width 8px
            height 8px
            background rgb(198, 47, 47)
            border 2px solid #fff
            border-radius 50%
            box-sizing border-box
</style>
