<template>
  <div class="nav">
    <el-menu class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1"><router-link to="/">首页</router-link></el-menu-item>
      <el-submenu index="2">
        <template slot="title">题库</template>
        <el-menu-item index="2-1"><router-link to="/share">分享试题</router-link></el-menu-item>
        <el-menu-item index="2-2"><router-link to="/problem">公用题库</router-link></el-menu-item>
        <el-menu-item index="2-3"><router-link to="/myProblem">个人题库</router-link></el-menu-item>
      </el-submenu>
      <el-menu-item index="3"><router-link to="/circle">圈子</router-link></el-menu-item>
      <el-menu-item index="4"><router-link to="/shop">商城</router-link></el-menu-item>
      <el-menu-item index="5" v-if="is_admin"><router-link to="/shop">后台管理</router-link></el-menu-item>
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
      a
        display block
        padding 0 20px
        font-size 16px
  .loginWrapper
    position absolute
    right 70px
    top 0
    height 60px
    line-height 60px
</style>