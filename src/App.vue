<template>
  <div id="app">
    <Home></Home>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Home from './pages/home/Home'
export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style>

</style>
