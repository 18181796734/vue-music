<template>
  <div>
    <div class="sign" v-show="!inputStatus">
      <div class="logo iconfont">
        <div class="box">&#xe611;</div>
      </div>
      <div class="choose">
        <div class="sign-button" @click="PasswordSignClick">账号密码登入</div>
        <div class="sign-button" @click="CodeSignClick">手机验证码登入</div>
        <div class="sign-button" @click="NoSignClick">立即体验</div>
      </div>
    </div>
    <div class="content" v-show="inputStatus">
      <div class="back iconfont" @click="backClick">&#xe606;</div>
      <div class="input-box">
        <div class="input">
          <input type="text" placeholder="请输入账号" v-model="userPhone">
          <div class="code" v-show="codeStatus" @click="getCodeClick">{{time > 0 ? time : '获取'}}</div>
        </div>
        <div class="error" v-show="this.errors.phone">!{{this.errors.phone}}</div>
        <div class="error" v-show="this.errors.code">!{{this.errors.code}}</div>
        <div class="input">
          <input type="password" :placeholder="prompt" v-model="password">
        </div>
        <div class="error" v-show="errors.password">!{{this.errors.password}}</div>
        <div class="sign-button" @click="SignClick">登入</div>
      </div>
    </div>
  </div>
</template>

<script>
import {getPhoneSign, getCode, getVerifyCode} from '@/api/sign'
export default {
  name: 'sign',
  data () {
    return {
      userPhone: '',
      password: '',
      code: '',
      inputStatus: false,
      codeStatus: true,
      time: 0,
      prompt: '',
      errors: {
        phone: '',
        code: '',
        password: ''
      }
    }
  },
  methods: {
    backClick () {
      this.inputStatus = false
    },
    PasswordSignClick () {
      this.inputStatus = true
      this.codeStatus = false
      this.prompt = '请输入密码'
    },
    CodeSignClick () {
      this.inputStatus = true
      this.codeStatus = true
      this.prompt = '请输入验证码'
    },
    NoSignClick () {
      this.inputStatus = false
      this.$router.push({
        'path': '/recommend'
      })
    },
    getCodeClick () {
      this.errors.code = ''
      this.errors.phone = ''
      if (this.phone(this.userPhone)) {
        if (this.time === 0) {
          getCode(this.userPhone).then((res) => {
            if (res.data.code === 200) {
              alert('验证码发送成功，请注意查收')
              this.timeFunction()
            } else if (res.data.code === 400) {
              alert('今日获取验证码超过上限，请明天再试')
            }
          })
        } else {
          this.errors.code = '请稍后再获取验证码'
        }
      } else {
        this.errors.phone = '手机号输入错误，请重新输入'
      }
    },
    SignClick () {
      this.errors.phone = ''
      this.errors.password = ''
      this.errors.code = ''
      if (this.phone(this.userPhone)) {
        if (!this.codeStatus) {
          getPhoneSign(this.userPhone, this.password).then((res) => {
            if (res.data.code === 502) {
              this.errors.password = '密码错误'
            } else if (res.data.code === 501) {
              this.errors.password = '账号不存在'
            } else if (res.data.code === 200) {
              this.$store.state.userId = res.data.account.id
              this.$store.state.cookie = res.data.cookie
              window.localStorage.setItem('登入令牌', this.$store.state.cookie)
              window.localStorage.setItem('用户ID', this.$store.state.userId)
              this.$router.push({
                'path': '/recommend'
              })
            }
          })
        } else {
          getVerifyCode(this.userPhone, this.password).then((res) => {
            console.log(res.data.code)
            if (res.data.code === 503) {
              this.errors.password = '验证码错误'
            } else if (res.data.code === 200) {
              alert('验证码错误')
            }
          })
        }
      } else {
        this.errors.phone = '手机号输入错误，请重新输入'
      }
    },
    phone (phone) {
      if ((/^[1][3,4,5,7,8][0-9]{9}$/.test(phone))) {
        return true
      }
    },
    timeFunction () {
      this.time = 60
      if (!this.timer) {
        this.timer = setInterval(() => {
          if (this.time > 0 && this.time <= 60) {
            this.time--
          } else {
            this.errors.code = ''
          }
        }, 1000)
      }
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
    .back
      width 60px
      height 50px
      line-height 50px
      text-align center
      font-size 30px
    .input-box
      width 100%
      .input
        display flex
        width 80%
        margin-left 10%
        margin-top 30px
        height 40px
        background #fff
        border-radius 40px
        border 2px solid rgb(220, 44, 31)
      .input input
        width 75%
        height 30px
        margin 5px 5%
        outline none
        border none
        font-size 20px
      .error
        margin-left 10%
        color rgb(220, 44, 31)
        margin-top 5px
      .code
        width 25%
        height 40px
        line-height 40px
        text-align center
      .sign-button
        width 50%
        margin 20px 25%
        height 50px
        background red
        border-radius 50px
        line-height 50px
        text-align center
        font-size 20px
</style>
