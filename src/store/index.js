import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playing: false,
    fullScreen: false,
    playSongId: 0,
    playlist: [],
    songUrl: ''
  }
})
