import Vue from 'vue'
import Router from 'vue-router'
import Singer from '@/pages/singer/Singer'
import Rank from '@/pages/rank/Rank'
import Recommend from '@/pages/Recommend/Recommend'
import RecommendDetail from '@/pages/recommend-detail/RecommendDetail'
import Player from '@/pages/player/Player'

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
      component: Singer
    }, {
      path: '/player/:id',
      component: Player
    }
  ]
})
