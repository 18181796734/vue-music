<template>
  <div>
    <v-touch v-on:swiperight="swiperight" class="singer">
    <div class="box" ref="wrapper">
      <ul>
        <li v-for="(item, index) of initial" :key="index" class="list">
          <div class="label">{{item}}</div>
          <ul>
            <li class="singer-title" v-for="data of singerList[index]" :key="data.id" @click="handleSingerClick(data.id)">
              <img class="image" v-lazy="data.img1v1Url" alt="">
              <div class="singer-name">{{data.name}}</div>
            </li>
          </ul>
        </li>
        <li class="none" v-show="this.$store.state.duration"></li>
      </ul>
    </div>
  </v-touch>
  <router-view></router-view>
  </div>
</template>

<script>
import {getSingerList} from '@/api/singer'
import BScroll from 'better-scroll'

export default {
  name: 'Singer',
  data () {
    return {
      initial: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'W', 'X', 'Y', 'Z'],
      singerList: []
    }
  },
  created () {
    this._getSingerList()
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true
    })
  },
  methods: {
    handleSingerClick (id) {
      this.$router.push({
        path: '/singer/' + id
      })
    },
    swiperight () {
      this.$router.push({
        'path': '/rank'
      })
    },
    _getSingerList () {
      for (let i = 0; i < this.initial.length; i++) {
        getSingerList(this.initial[i]).then((res) => {
          this.singerList.push(res.data.artists)
        })
      }
    }
  }
}
</script>

<style lang="stylus" scpoed>
  .singer
    width 100%
    .box
      position absolute
      top 5.7rem
      left 0
      height calc(100vh - 5.7rem)
      overflow hidden
      .list
        width 100vw
        .label
          width 100%
          height 25px
          line-height 25px
          background rgb(243,243,243)
          font-size 12px
          padding-left 10px
        .singer-title
          display flex
          height 60px
          .image
            width 50px
            height 50px
            border-radius 50%
            margin 5px 10px
          .singer-name
            line-height 60px
            font-size 15px
      .none
        height 60px
        width 100vw
        background #fff
</style>
