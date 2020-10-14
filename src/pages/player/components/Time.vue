<template>
  <div class="time">
    <div class="pargress-box">
      <span class="time time-left">{{format(this.$store.state.currentTime)}}</span>
      <div class="pargress-bar" ref="progressBar">
        <div class="bar-box">
          <div class="progress" ref="progress"></div>
          <div class="progress-btn-box" ref="progressBtn">
            <!-- <div class="progress-btn"></div> -->
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
  methods: {
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
      if (this.$store.state.percent) {
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
