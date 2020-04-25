<template>
  <div class="nav">
    <el-menu class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1"><router-link to="/">首页</router-link></el-menu-item>
      <el-submenu index="2">
        <template slot="title">题库</template>
        <router-link to="/share"><el-menu-item index="2-1">分享试题</el-menu-item></router-link>
        <router-link to="/problem"><el-menu-item index="2-2">公用题库</el-menu-item></router-link>
        <router-link to="/myProblem"><el-menu-item index="2-3">个人题库</el-menu-item></router-link>
      </el-submenu>
      <el-menu-item index="3"><router-link to="/circle">圈子</router-link></el-menu-item>
      <el-menu-item index="4"><router-link to="/shop">商城</router-link></el-menu-item>
      <el-menu-item index="5" v-if="is_admin"><router-link to="/houtai">后台管理</router-link></el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    props:{
      is_admin:Number
    }
  }
</script>

<style scoped lang="stylus">
.nav
  position relative
  .el-menu
    padding 0 50px
    li
      padding 0
      font-size 16px
      a
        display block
        padding 0 20px
      >>> .el-submenu__title
        font-size 16px
  .loginWrapper
    position absolute
    right 70px
    top 0
    height 60px
    line-height 60px
</style>