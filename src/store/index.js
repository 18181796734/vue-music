import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playing: true,
    playSongId: 0,
    playingList: [],
    songUrl: '',
    loop: 0, // 0为列表循环、1为单曲循环
    router: '',
    currentTime: 0,
    duration: 0,
    percent: 0,
    userId: 0,
    cookie: '',
    percentClick: 0
  }
})
