<template>
  <div class="sign">
    <div class="logo iconfont">
      <div class="box">&#xe611;</div>
    </div>
    <div class="enter">
      <div class="input"><input type="text" placeholder="请输入账号" v-model="userPhone"></div>
      <div class="input"><input type="password" placeholder="请输入密码" v-model="password"></div>
      <div class="sign-button" @click="handleSignClick">登入</div>
    </div>
  </div>
</template>

<script>
import {getPhoneSign} from '@/api/sign'
export default {
  name: 'sign',
  data () {
    return {
      userPhone: '',
      password: ''
    }
  },
  methods: {
    handleSignClick () {
      getPhoneSign(this.userPhone, this.password).then((res) => {
        console.log(res.data)
        if (res.data.code === 502) {
          alert('密码错误')
        } else if (res.data.code === 200) {
          this.$router.push({
            'path': '/recommend'
          })
          window.localStorage.setItem('登入令牌', res.data.cookie)
          window.localStorage.setItem('用户ID', res.data.account.id)
          this.$store.state.userId = res.data.account.id
          this.$store.state.cookie = res.data.cookie
          // this.$store.state.userID = localStorage.getItem('用户ID')
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  .sign
    position absolute
    top 0
    left 0
    width 100vw
    height 100vh
    background rgb(220, 44, 31)
    z-index 501
    .logo
      width 100%
      height 50vh
      display flex
      justify-content center
      align-items center
      .box
        height 80px
        width 80px
        background rgb(241, 41, 36)
        border-radius 50%
        line-height 80px
        text-align center
        color #ffffff
        font-size 50px
    .enter
      width 100%
      .input
        width 80%
        margin 30px 10%
        height 50px
        background #fff
        border-radius 50px
      .input input
        width 80%
        height 30px
        margin 10px 10%
        outline none
        border none
        font-size 20px
      .sign-button
        width 80%
        margin 30px 10%
        height 40px
        line-height 40px
        text-align center
        background #ffffff
        border-radius 40px
</style>
