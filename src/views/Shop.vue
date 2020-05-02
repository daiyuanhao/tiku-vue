<template>
  <div class="shop">
    <el-container>
      <el-header>免费兑换礼品 <span>我的积分<span class="point">20</span></span></el-header>
      <el-main>
        <el-card :body-style="{ padding: '10px' }" v-for="g in shopData" :key="g.id">
          <img :src="`${baseURL}`+g.img" class="image">
          <div class="name">{{ g.name }}</div>
          <div class="bottom"><el-tag size="mini">{{g.price}}</el-tag><el-tag size="mini" class="duihuan">兑换</el-tag></div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        shopData: null
      }
    },
    created(){
      this.axios.get(`${this.baseURL}/shop/get`).then(res=>{
        this.shopData = res.data.rows
      })
    }
  }
</script>

<style scoped lang="stylus">
.shop
  padding 10px 0
  background #f4f4f5
  min-height calc(100vh - 61px)
  box-sizing border-box
  .el-container
    width 1000px
    margin 0 auto
    .el-header
      padding-right 40px
      display flex
      justify-content space-between
      line-height 60px
      font-size 20px
      color #fff
      background #606266
      .point
        color yellow
        margin-left 8px
  .el-main
    background #fff
    box-sizing content-box
    font-size 0
    .el-card
      width 200px
      display inline-block
      margin 19px
      img
        width 100%
        vertical-align top
      .name
        margin-top 5px
        height 40px
        line-height 20px
        overflow hidden
        text-overflow: ellipsis;
        display: -webkit-box; /* 将对象作为弹性伸缩盒子模型显示 */      
        -webkit-line-clamp: 2; /* 控制最多显示几行 */      
        -webkit-box-orient: vertical; /* 设置或检索伸缩盒对象的子元素的排列方式 */   
      .bottom
        margin-top 6px
        display flex
        justify-content space-between
        .duihuan
          cursor pointer
</style>