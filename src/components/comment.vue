<template>
  <div class="comment">
    <el-main>
      <div class="quillWrapper">
        <quill-editor 
          v-model="commentValue"
          class="quill"
        />
      </div>
      <div class="header">
        <span><span v-if="commentData">{{commentData.length}}</span><span v-else>0</span>条评论</span>
        <el-button type="primary" size="small" @click="addComment">发布评论</el-button></div>
      <div class="main">
        <div class="rowWrapper" v-for="(c,ci) in commentData" :key="c.id">
          <div class="user">
            <img :src="'/api'+c.avatar">
            <a>{{c.nickname}}</a>
          </div>
          <div class="content" v-html="c.content"></div>
          <div class="bottom"><span class="time">{{c.create_time | formatTime}}</span>
            <div class="extra">
              <a><i class="el-icon-thumb"></i>赞</a>
              <a @click="showReply(ci)"><i class="el-icon-chat-dot-square"></i>回复</a>
              <a><i class="el-icon-warning-outline"></i>举报</a>
            </div>
          </div>
          <Reply v-if="c.replyShow" :comment_id='c.id' :toUser_id="c.user_id"></Reply>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
  import Reply from "./reply";

  export default {
    props:{
      question_id: {
        type: Number,
        default: 0
      },
      article_id: {
        type: Number,
        default: 0
      }
    },
    data(){
      return{
        commentValue: '',
        commentData: null,
        replysCount: 0
      }
    },
    components:{
      Reply
    },
    methods:{
      addComment(){
        let user_id = JSON.parse(localStorage.getItem('logininfo')).id
        let create_time = new Date().getTime()
        if(this.question_id!==0){
          this.axios.post('/api/comment/addComment',{user_id,question_id:this.question_id,content:this.commentValue,create_time}).then(res=>{
            this.$message(res.data.message)
            this.commentValue = ''
            this.getComment()
          })
        }else{
          this.axios.post('/api/comment/addComment',{user_id,article_id:this.article_id,content:this.commentValue,create_time}).then(res=>{
            this.$message(res.data.message)
            this.commentValue = ''
            this.getComment()
          })
        }
      },
      getComment(){
        if(this.question_id!==0){
          this.axios.post('/api/comment/getByQuestionId',{id:this.question_id}).then(res=>{
            this.commentData = res.data.rows
            this.commentData.forEach(c=>{
              this.$set(c,'replyShow',false)
            })
          })
          window.console.log(111)
        }else{
          this.axios.post('/api/comment/getByArticleId',{id:this.article_id}).then(res=>{
            this.commentData = res.data.rows
            this.commentData.forEach(c=>{
              this.$set(c,'replyShow',false)
            })
          })
          window.console.log(222)
        }
      },
      showReply(index){
        let b = this.commentData[index].replyShow
        this.$set(this.commentData[index],'replyShow',!b)
      }
    },
    created(){
      this.getComment()
    }
  }
</script>

<style scoped lang="stylus">
.comment
  min-height 550px
  .quillWrapper
    height 226px
    .quill
      height 160px
  .header
    display flex
    justify-content space-between
    padding 10px 0
    span
      font-size 18px
  .main
    padding 0 20px
    .rowWrapper
      padding 10px 0
      border-bottom 1px #DCDFE6 solid
      .user
        height 40px
        line-height 40px
        img
          height 40px
          vertical-align top
          margin-right 8px
      .bottom
        display flex
        justify-content space-between
        .time
          color #909399
        a
          margin-left 12px
          i
            margin-right 3px
</style>