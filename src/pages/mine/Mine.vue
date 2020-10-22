<template>
  <transition>
    <div class="mine">
      <div class="no-sign" v-show="!$store.state.userId">
        <div class="buttom" @click="handleOutClick">登入发现更多精彩</div>
        <div class="buttom" @click="handleBackClick">返回</div>
      </div>
      <div class="sign" v-show="$store.state.userId">
        <div class="user-data">
        <div class="avatar"><img class="img" v-lazy="avatar" alt=""></div>
        <div class="user-name">
          <div class="name">{{userName}}</div>
          <div class="vip" v-show="vipType"><img src="@/common/image/vip.png" alt=""></div>
          <div class="no-vip" v-show="!vipType">开通黑胶会员享尊享特权</div>
        </div>
        </div>
        <div class="like">
          <div class="text iconfont">
            喜欢的音乐
            <span>共{{likeList.length}}首</span>
            &#xe60b;
          </div>
        </div>
        <div class="bottom">
          <div class="back" @click="handleOutClick">退出登入</div>
          <div class="back" @click="handleBackClick">返回</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {getUserData, getUserLikeList} from '@/api/mine'
export default {
  name: 'Mine',
  data () {
    return {
      avatar: '',
      userName: '',
      likeList: '',
      vipType: 0,
      signStatus: ''
    }
  },
  created () {
    this._getUserData()
    this._getUserLikeList()
  },
  methods: {
    handleOutClick () {
      window.localStorage.setItem('登入令牌', '')
      window.localStorage.setItem('用户ID', '')
      this.$router.push({
        path: '/sign'
      })
    },
    handleBackClick () {
      this.$router.go(-1)
    },
    _getUserData () {
      this.$store.state.cookie = localStorage.getItem('登入令牌')
      this.$store.state.userId = localStorage.getItem('用户ID')
      getUserData(this.$store.state.userId, this.$store.state.cookie).then((res) => {
        this.avatar = res.data.profile.avatarUrl
        this.userName = res.data.profile.nickname
        this.vipType = res.data.profile.vipType
      })
    },
    _getUserLikeList () {
      getUserLikeList(this.$store.state.userId, this.$store.state.cookie).then((res) => {
        this.likeList = res.data.ids
        console.log(res.data)
      })
    }
  },
  watch: {
    '$store.state.userId' () {
      this._getUserData()
      this._getUserLikeList()
    }
  }
}
</script>
<style lang="stylus" scoped>
  .v-enter-active, .v-leave-.v-enter-active
    transition  all 0.5s
  .v-enter, .v-leave-active
    transform translate3d(-50%, 0, 0)
    opacity 0
  .no-sign
    width 100vw
    height 100vh
    position absolute
    top 0
    left 0
    z-index 501
    background #fff
    .buttom
      width 50%
      height 40px
      background #ccc
      line-height 40px
      text-align center
      border-radius 40px
      color rgb(220, 44, 31)
      margin 40% 25%
  .mine
    width 100vw
    height 100vh
    position absolute
    top 0
    left 0
    z-index 501
    background #fff
    .user-data
      width 100%
      height 100px
      display flex
      .avatar
        width 100px
        height 100px
        .img
          height 70px
          width 70px
          border-radius 50%
          margin 15px
      .user-name
        height 100px
        width 100%
        .name
          margin-top 25px
          font-weight bold
          font-size 18px
          height 30px
          line-height 30px
        .vip
          height 20px
        .vip img
          height 16px
          margin-top 2px
          border-radius 4px
        .no-vip
          height 20px
          line-height 20px
          color #666
          font-size 12px
    .like
      width 100%
      height calc(100vh - 150px)
      .text
        height 40px
        line-height 40px
        background rgb(241, 241, 241)
        padding-left 20px
      .text span
        font-size 12px
    .bottom
      height 50px
      display flex
      .back
        width 50%
        line-height 50px
        text-align center
</style>
