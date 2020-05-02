<template>
  <div class="article">
    <el-container v-if="article">
      <el-header>返回 /{{topics[article.topic]}}/{{article.title}}</el-header>
      <el-main>
        <div class="header">
          <img :src="`${baseURL}`+article.avatar" alt="">
          {{article.title}}
        </div>
        <div class="meta"><a>{{article.nickname}}</a>发布于 {{article.create_time | formatTime}}</div>
        <div class="content" v-html="article.content"></div>
      </el-main>
      <div class="footer">
        <Comment :article_id='article.id'></Comment>
      </div>
    </el-container>
  </div>
</template>

<script>
  import Comment from "../../components/comment";

  export default {
    data(){
      return{
        article: null,
        topics: ['题目交流','综合讨论','问题反馈','设计建议']
      }
    },
    components:{
      Comment
    },
    created(){
      let id = this.$route.params.id
      this.axios.post(`${this.baseURL}/article/getById`,{id}).then(res=>{
        this.article = res.data.rows
      })
    }
  }
</script>

<style scoped lang="stylus">
.article
  background #f4f4f5
  min-height calc(100vh - 61px)
  .el-container
    width 1000px
    margin 0 auto
    padding 0 20px 20px
    .el-header
      line-height 60px
      font-size 24px
      padding 0
    .el-main
      background #fff
      .header
        height 50px
        line-height 50px
        font-size 16px
        img
          height 50px
          vertical-align top
          margin-right 10px
      .meta
        margin-top 10px
        color #606266
        a
          margin-right 5px
    .footer
      background #fff
      margin-top 20px
      height auto !important
</style>