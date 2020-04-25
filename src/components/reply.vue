<template>
  <div class="reply">
    <el-main>
      <div class="quillWrapper">
        <quill-editor 
          v-model="replyValue"
          class="quill"
        />
      </div>
      <div class="header" v-if="replyData">{{replyData.length}}条回复<el-button type="primary" size="small" @click="addReply">发布回复</el-button></div>
      <div class="main">
        <div class="rowWrapper" v-for="(r) in replyData" :key="r.id">
          <div class="user">
            <img :src="'/api'+r.avatar">
            <a>{{r.nickname}}</a>
            <a class="toUser">@{{r.toUser_nickname}}</a>
          </div>
          <div class="content" v-html="r.content"></div>
          <div class="bottom"><span class="time">{{r.create_time | formatTime}}</span>
            <div class="extra">
              <a><i class="el-icon-thumb"></i>赞</a>
              <a><i class="el-icon-chat-dot-square"></i>回复</a>
              <a><i class="el-icon-warning-outline"></i>举报</a>
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
  export default {
    props:{
      comment_id: Number,
      toUser_id: Number
    },
    data(){
      return{
        replyValue: '',
        replyData: null
      }
    },
    methods:{
      addReply(){
        let user_id = JSON.parse(localStorage.getItem('logininfo')).id
        let create_time = new Date().getTime()
        this.axios.post('/api/reply/addReply',{user_id,comment_id:this.comment_id,toUser_id:this.toUser_id,content:this.replyValue,create_time}).then(res=>{
          this.$message(res.data.message)
          this.replyValue = ''
          this.getReply()
        })
      },
      getReply(){
        if(this.comment_id!==0){
          this.axios.post('/api/reply/getByCommentId',{id:this.comment_id}).then(res=>{
            this.replyData = res.data.rows
            // this.commentData.forEach(c=>{
            //   this.$set(c,'replyShow',false)
            // })
            window.console.log(this.replyData)
          })
          window.console.log(this.comment_id)
        }
      }
    },
    created(){
      this.getReply()
    }
  }
</script>

<style scoped lang="stylus">
.reply
  background #f4f4f5
  margin-top 10px
  .quillWrapper
    height 226px
    .quill
      height 160px
  .header
    font-size 18px
    display flex
    justify-content space-between
    padding 10px 0
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
        .toUser
          margin-left 10px
          font-size 12px
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