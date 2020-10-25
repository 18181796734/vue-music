<template>
  <div>
    <div class="sign" v-show="!inputStatus">
      <div class="logo iconfont">
        <div class="box">&#xe611;</div>
      </div>
      <div class="choose">
        <div class="sign-button" @click="choosePasswordClick">账号密码登入</div>
        <div class="sign-button" @click="chooseCodeClick">手机号登入</div>
        <div class="sign-button" @click="NoSignClick">立即体验</div>
      </div>
      <div class="input-box" v-show="inputStatus">
        <div class="input">
          <input type="text" placeholder="请输入账号" v-model="userPhone">
        </div>
        <div class="input">
          <input type="password" placeholder="请输入密码" v-model="password">
        </div>
        <div class="sign-button">登入</div>
        <div class="sign-button more">其它方式登入</div>
      </div>
    </div>
    <div class="content" v-show="inputStatus">
      <div class="input-box">
        <div class="input">
          <input type="text" placeholder="请输入账号" v-model="userPhone">
          <div class="code"></div>
        </div>
        <div class="input">
          <input type="password" placeholder="请输入密码" v-model="password">
        </div>
        <div class="sign-button">登入</div>
        <div class="sign-button more">其它方式登入</div>
      </div>
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
      password: '',
      code: '',
      inputStatus: false,
      codeStatus: true
    }
  },
  methods: {
    choosePasswordClick () {
      this.inputStatus = true
    },
    chooseCodeClick () {
      this.inputStatus = true
    },
    NoSignClick () {
      this.inputStatus = false
      this.$router.push({
        'path': '/recommend'
      })
    }
    // handleSignClick () {
    //   getPhoneSign(this.userPhone, this.password).then((res) => {
    //     console.log(res.data)
    //     if (res.data.code === 502) {
    //       alert('密码错误')
    //     } else if (res.data.code === 200) {
    //       this.$router.push({
    //         'path': '/recommend'
    //       })
    //       window.localStorage.setItem('登入令牌', res.data.cookie)
    //       window.localStorage.setItem('用户ID', res.data.account.id)
    //       this.$store.state.userId = res.data.account.id
    //       this.$store.state.cookie = res.data.cookie
    //       // this.$store.state.userID = localStorage.getItem('用户ID')
    //     }
    //   })
    // }
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
    .choose
      width 100%
      .sign-button
        width 70%
        margin 30px 15%
        height 40px
        line-height 40px
        text-align center
        background #ffffff
        border-radius 40px
  .content
    position absolute
    top 0
    left 0
    width 100vw
    height 100vh
    background #fff
    .input-box
      width 100%
      .input
        display flex
        width 80%
        margin 20px 10%
        height 40px
        background #fff
        border-radius 40px
        border 2px solid rgb(220, 44, 31)
      .input input
        width 60%
        height 30px
        margin 5px 5%
        outline none
        border none
        font-size 20px
      .code
        width 60px
        height 40px
        border 2px solid rgb(220, 44, 31)
      .sign-button
        width 50%
        margin 20px 25%
        height 50px
        background #fff
        border-radius 50px
        line-height 50px
        text-align center
        font-size 20px
      .more
        font-size 16px
</style>
