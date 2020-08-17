import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/pages/home/Home'
import Singer from '@/pages/singer/Singer'
import Rank from '@/pages/rank/Rank'
import Recommend from '@/pages/Recommend/Recommend'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    }, {
      path: '/recommend',
      component: Recommend
    }, {
      path: '/rank',
      component: Rank
    }, {
      path: '/singer',
      component: Singer
    }
  ]
})
