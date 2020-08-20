<template>
  <div class="banner">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(item, index) of bannerList" :key="index">
        <img :src="item.pic" class="batter-img">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import {getBanner} from '../../../api/recommend'

export default {
  name: 'Banner',
  data () {
    return {
      bannerList: [],
      swiperOption: {
        looo: true,
        autoplay: {
          delay: 3000
        },
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  created () {
    this._getBanner()
  },
  methods: {
    _getBanner () {
      getBanner().then((res) => {
        this.bannerList = res.data.banners
      })
    }
  }
}
</script>

<style lang="stylus" scpoed>
  .banner
    width 100%
    .batter-img
      width 100%
      border-radius 10px
    .swiper-pagination-bullet-active
      background-color red
</style>
