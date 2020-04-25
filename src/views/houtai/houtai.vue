<template>
  <el-container>
    <el-aside>
      <el-menu default-active="1">
        <router-link to="/houtai/users"><el-menu-item index="1">用户管理</el-menu-item></router-link>
        <router-link to="/houtai/subject"><el-menu-item index="2">科目管理</el-menu-item></router-link>
        <router-link to="/houtai/question"><el-menu-item index="3">试题管理</el-menu-item></router-link>
        <router-link to="/houtai/shop"><el-menu-item index="4">商城管理</el-menu-item></router-link>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
  export default {}
</script>

<style scoped lang="stylus">
.el-aside
  width 240px !important
  .el-menu
    min-height calc(100vh - 61px)
    
</style>