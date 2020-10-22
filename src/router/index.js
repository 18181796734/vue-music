import Vue from 'vue'
import Router from 'vue-router'
import Rank from '@/pages/rank/Rank'
import Sign from '@/pages/sign/Sign'
import Mine from '@/pages/mine/Mine'
import Singer from '@/pages/singer/Singer'
import Player from '@/pages/player/Player'
import Search from '@/pages/search/Search'
import Recommend from '@/pages/Recommend/Recommend'
import SingerDetail from '@/pages/singer-detail/SingerDetail'
import RecommendDetail from '@/pages/recommend-detail/RecommendDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    }, {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: RecommendDetail
        }
      ]
    }, {
      path: '/rank',
      component: Rank
    }, {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    }, {
      path: '/search',
      component: Search
    }, {
      path: '/player/:id',
      component: Player
    }, {
      path: '/sign',
      component: Sign
    }, {
      path: '/mine',
      component: Mine
    }
  ]
})
