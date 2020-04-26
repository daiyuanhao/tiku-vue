<template>
  <div class="circle">
    <el-container>
      <el-main>
        <div class="topicWrapper">
          <ul>
            <li :class="active=='全部话题'?'active':''" @click="changeTopic(-1)">全部话题</li>
            <li v-for="(t,ti) in topics" :key="ti" :class="active==t?'active':''" @click="changeTopic(ti)">{{t}}</li>
          </ul>
        </div>
        <div class="articleWrapper">
          <div class="rowWrapper" v-for="a in filterArticle" :key="a.id">
            <div class="title"><img :src="'/api'+a.avatar"><a @click="$router.push(`/article/${a.id}`)">{{a.title}}</a></div>
            <div class="meta"><a class="nickname">{{a.nickname}}</a>在<a class="topic">{{topics[a.topic]}}</a>发布了文章</div>
            <div class="content" v-html="a.content"></div>
            <div class="extra">
              <span><i class="el-icon-view"></i>999</span>
              <a><i class="el-icon-chat-dot-square"></i>查看评论</a>
              <a><i class="el-icon-star-off"></i>收藏</a>
              <a><i class="el-icon-share"></i>分享</a>
              <a><i class="el-icon-more"></i></a>
            </div>
          </div>
        </div>
      </el-main>
      <el-aside>
        <div class="topWrapper">
          <div class="top">
            <a><i class="el-icon-chat-round"></i><div>参与的文章</div></a>
            <a><i class="el-icon-document-copy"></i><div>我的文章</div></a>
            <a><i class="el-icon-star-off"></i><div>我的收藏</div></a>
          </div>
          <div class="middle">
            <el-button type="primary" size="small" icon="el-icon-plus" @click="drawer = true">发布文章</el-button>
            <el-button size="small" icon="el-icon-edit">我的草稿</el-button>
          </div>
          <div class="bottom">
            <div class="row"><div class="label"><i class="el-icon-thumb"></i>获得点赞数</div>0</div>
            <div class="row"><div class="label"><i class="el-icon-star-on"></i>获得收藏数</div>0</div>
            <div class="row"><div class="label"><i class="el-icon-user-solid"></i>被关注人数</div>1</div>
            <div class="row"><div class="label"><i class="el-icon-view"></i>被浏览次数</div>11</div>
          </div>
        </div>
      </el-aside>
    </el-container>
    <el-drawer
      :visible.sync="drawer"
      direction="btt"
      :show-close="false"
      size="50%"
    >
      <div slot="title">
        <el-input v-model="article.title" placeholder="此处输入标题..." class="title"></el-input>
        <el-select v-model="article.topic" placeholder="请选择话题">
          <el-option v-for="(t,ti) in topics" :key="ti" :label="t" :value="ti"></el-option>
        </el-select>
        <el-button type="info" @click="drawer=false">取消</el-button>
        <el-button type="primary" @click="addArticle">发布文章</el-button>
      </div>
      <quill-editor 
        v-model="article.content"
        class="quill"
      />
    </el-drawer>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        topics: ['题目交流','综合讨论','问题反馈','设计建议'],
        active: '全部话题',
        articleData: null,
        filterArticle: null,
        drawer: false,
        article:{
          title: '',
          topic:'',
          content: '',
        }
      }
    },
    methods:{
      changeTopic(ti){
        if(ti==-1){
          this.active="全部话题"
          this.filterArticle = this.articleData
        }else{
          this.active = this.topics[ti]
          this.filterArticle = this.articleData.filter(a=>a.topic==ti)
        }
      },
      addArticle(){
        let user_id = JSON.parse(localStorage.getItem('logininfo')).id
        let create_time = new Date().getTime()
        this.axios.post('/api/article/add',{user_id,topic:this.article.topic,title:this.article.title,content:this.article.content,create_time}).then(res=>{
          this.$message(res.data.message)
          if(res.data.success){
            this.drawer = false
          }
        })
      }
    },
    created(){
      this.axios.get('/api/article/get').then(res=>{
        this.articleData = res.data.rows
        this.filterArticle = this.articleData
      })
    }
  }
</script>

<style scoped lang="stylus">
.circle
  padding 10px 0
  background #f4f4f5
  min-height calc(100vh - 61px)
  box-sizing border-box
  .el-container
    width 1200px
    margin 0 auto
    .el-main
      padding 0 20px
      .topicWrapper
        padding 20px 0
        li
          display inline-block
          padding 25px 30px
          background #fff
          margin 0 30px 0 0
          cursor pointer
          &.active
            border 1px solid #909399
      .articleWrapper
        background #fff
        margin-top 10px
        min-height 100px
        .rowWrapper
          padding 20px 20px 0 20px
          border-bottom 1px solid #dcdfe6
          .title
            font-size 14px
            line-height 40px
            img
              width 40px
              vertical-align top
              margin-right 10px
            a
              color #303133
              font-size 16px
              &:hover
                color: #909399
          .meta
            margin-top 5px
            .nickname
              margin-right 5px
              font-size 12px
            .topic
              margin 0 5px
              font-size 12px
          .content
            max-height 200px 
            overflow hidden
          .extra
            padding 10px 0
            a,span
              margin-right 15px
              i
                font-size 16px
                margin-right 3px
    .el-aside
      padding 20px 0
      .topWrapper
        background #fff
        min-height 100px
        .top
          display flex
          border-bottom 1px solid #dcdfe6
          padding 20px 10px
          a
            flex 1
            text-align center
            i
              font-size 24px
        .middle
          display flex
          border-bottom 1px solid #dcdfe6
          padding 20px
          .el-button
            flex 1
          .el-button + .el-button
            margin-left 20px
        .bottom
          padding 10px 20px
          .row
            padding 10px 0
            display flex
            justify-content space-between
            i
              font-size 20px
              vertical-align top
              margin-right 10px
  >>> .el-drawer
    padding 20px
    header
      padding 10px 0
      margin 0
      .title
        width 70%
        margin-right 30px
        .el-input__inner
          font-size 16px
          font-weight bold
          color #303133
          border-top none
          border-left none
          border-right none
          padding 0
          border-radius 0
          // &::placeholder
          //   font-weight bold
          //   font-size 16px
          &:focus
            border-bottom 1px solid #909399
      .el-select
        margin-right 19px
    section 
      padding 10px 0
      .quill
        height 200px
</style>