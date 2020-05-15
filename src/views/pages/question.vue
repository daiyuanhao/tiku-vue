<template>
  <div class="question">
    <el-container>
      <el-header>题目详情</el-header>
      <el-main v-if="question">
        <div class="infoWrapper">
          <div class="header">{{$store.state.types[question.type]}}<div>贡献者:<a>{{question.nickname}}</a></div></div>
          <div class="name" v-html="question.question_name"></div>
          <div class="select">A. {{question.a}}</div>
          <div class="select">B. {{question.b}}</div>
          <div class="select">C. {{question.c}}</div>
          <div class="select">D. {{question.d}}</div>
          <div class="answer">
            <div><span>正确答案</span>{{question.answer}}</div>
            <el-popover
              placement="left"
              width="190"
              trigger="click">
              <el-select v-model="selectTag" placeholder="请选择标签" size="small" :style="{'width':'120px','margin-right':'10px'}">
                <el-option v-for="(t,ti) in tagData" :key="ti" :label="t.tag_name" :value="t.tag_name"></el-option>
              </el-select>
              <el-button type="primary" size="small" @click="addQues(question.id)">确定</el-button>
              <el-button type="primary" size="small" slot="reference">加入题库</el-button>
            </el-popover>
          </div>
        </div>
        <div class="commentWrapper">
          <Comment :question_id='question.id'></Comment>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import Comment from "../../components/comment";
  export default {
    data(){
      return{
        question: null,
        selectTag: '默认',
        loginname: '',
        tagData: null
      }
    },
    components:{
      Comment
    },
    methods:{
      addQues(id){
        this.axios.post(`${this.baseURL}/myproblem/addQuestion`,{loginname:this.loginname,tag_name:this.selectTag,id}).then(res=>{
          this.$message(res.data.message)
        })
      }
    },
    created(){
      let id = this.$route.params.id
      this.axios.post(`${this.baseURL}/question/getById`,{id}).then(res=>{
        this.question = res.data.rows
      })
      this.loginname = JSON.parse(localStorage.getItem('logininfo')).loginname
      this.axios.post(`${this.baseURL}/myproblem/getTags`,{loginname: this.loginname}).then(res=>{
        this.tagData = res.data.rows
      })
    }
  }
</script>

<style scoped lang="stylus">
.question
  background #ecf5ff
  min-height calc(100vh - 61px)
  .el-container
    width 1000px
    margin 0 auto
    .el-header
      line-height 60px
      font-size 24px
    .el-main
      padding 0 20px 20px
      .infoWrapper
        background #fff
        padding 10px 20px
        .header
          padding 10px 0
          font-size 20px
          display flex
          justify-content space-between
          a
            font-size 18px
            margin-left 10px
        .name
          padding 10px 0
          font-size 16px
        .select
          padding 10px 25px
          color #606266
        .answer
          padding 10px 0
          margin-top 10px
          display flex
          justify-content space-between
          span
            font-size 16px
            color red
            margin-right 15px
      .commentWrapper
        margin-top 20px
        background #fff
</style>