<template>
  <div id="app">
    <Home></Home>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Player></Player>
  </div>
</template>

<script>
import Home from './pages/home/Home'
import Player from './pages/player/player'
export default {
  name: 'App',
  components: {
    Home,
    Player
  }
}
</script>

<style>

</style>
