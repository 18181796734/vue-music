<template>
  <transition>
    <v-touch v-on:swipeleft="swipeleft" v-on:swiperight="swiperight" class="swipe">
      <div ref="wrapper" class="wrapper">
        <ul>
          <li v-for="item of rankList" :key="item.id" class="item">
            <div class="left">
              <img v-lazy="item.playlist.coverImgUrl" alt="" class="left-img">
            </div>
            <div class="right">
              <ul>
                <li class="text" v-for="(title, index) of item.rank" :key="index">
                  {{index + 1}}.{{title.name}}&nbsp;-&nbsp;{{title.ar[0].name}}
                  </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </v-touch>
  </transition>
</template>

<script>
import {getRank} from '@/api/rank'
import BScroll from 'better-scroll'

const RANK_NUMBER = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
export default {
  name: 'Rank',
  data () {
    return {
      rankList: [],
      topThreeList: []
    }
  },
  created () {
    this._getRank()
    this._getRank2()
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true
    })
  },
  methods: {
    _getRank () {
      for (let i = 0; i < RANK_NUMBER.length; i++) {
        getRank(RANK_NUMBER[i]).then((res) => {
          let list = res.data
          this.rankList.push(list)
          list.rank = res.data.playlist.tracks.slice(0, 3)
        })
      }
    },
    swipeleft () {
      this.$router.push({
        'path': '/singer'
      })
    },
    swiperight () {
      this.$router.push({
        'path': '/recommend'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .v-enter-active, .v-leave-.v-enter-active
    transition  all 0.1s
  .v-enter, .v-leave-active
    transform translate3d(50%, 0, 0)
    opacity 0
  .swipe
    width 100vw
    .wrapper
      margin 0 10px
      height calc(100vh - 6rem)
      position absolute
      top 6rem
      left 0
      overflow hidden
      .item
        display flex
        width 100%
        margin 10px 0
        height 100px
        .left
          width 100px
          height 100px
          text-align center
          .left-img
            width 100px
            height 100px
            border-radius 5px
        .right
          height 100px
          flex 1
          margin 0 10px
          .text
            width calc(100vw - 130px)
            height 33.33px
            line-height 33.33px
            font-size 14px
            padding-right 10px
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
</style>
