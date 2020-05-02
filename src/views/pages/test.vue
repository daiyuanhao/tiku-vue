<template>
  <div class="test">
    <el-container>
      <el-header>组卷测试（公用题库）<span class="time">{{getTime}}</span></el-header>
      <el-main>
        <div class="rowWrapper" v-for="(q,qi) in selectQues" :key="qi">
          <div class="header">{{qi+1}}、{{$store.state.types[q.type]}}<span>({{q.subject_name}})</span></div>
          <div class="main">
            <div class="title" v-html="q.question_name"></div>
            <el-checkbox-group v-model="q.select" v-if="q.type==2" :disabled="finish">
              <el-checkbox label="a" border>{{q.a}}</el-checkbox>
              <el-checkbox label="b" border>{{q.b}}</el-checkbox>
              <el-checkbox label="c" border>{{q.c}}</el-checkbox>
              <el-checkbox label="d" border>{{q.d}}</el-checkbox>
            </el-checkbox-group>
            <el-radio-group v-model="q.select" v-if="q.type==1" :disabled="finish">
              <el-radio label="a" border>{{q.a}}</el-radio>
              <el-radio label="b" border>{{q.b}}</el-radio>
              <el-radio label="c" border>{{q.c}}</el-radio>
              <el-radio label="d" border>{{q.d}}</el-radio>
            </el-radio-group>
            <div class="bottom" v-if="finish">
              <div class="answer">正确答案: {{q.answer}}</div>
              <div class="select" v-if="q.type==1">你的答案: {{q.select?q.select:'空'}}
                <span class="correct" v-if="q.answer===q.select">(正确)</span>
                <span class="error" v-else>(错误)</span>
              </div>
              <div class="select" v-if="q.type==2">你的答案: {{select_toString(q.select)}}
                <span class="correct" v-if="q.answer===select_toString(q.select)">(正确)</span>
                <span class="error" v-else>(错误)</span>
              </div>
            </div>
          </div>
        </div>
      </el-main>
      <el-footer>
        <el-button v-if="!finish" type="primary" @click="submitTest">提交试卷</el-button>
        <el-button v-else type="success" @click="resultDialog = true">查看结果</el-button>
      </el-footer>
    </el-container>
    <el-dialog :visible.sync="resultDialog" title="测试结果">
      <el-form v-if="selectQues" label-width="80px" label-position="left">
        <el-form-item label="正确题数:">{{correctCount}}/{{selectQues.length}}</el-form-item>
        <el-form-item label="错误题目:">
          <div class="errorName" v-for="(err,erri) in errorList" :key="erri">{{err.index}}、<a @click="$router.push(`/question/${err.id}`)" v-html="err.name"></a></div>
        </el-form-item>
        <el-form-item label="得分:">{{(correctCount*100/selectQues.length).toFixed(1)}}</el-form-item>
        <el-form-item label="用时:">{{getTime}}</el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="resultDialog = false">取 消</el-button>
        <el-button type="primary" @click="$router.push('/problem')">再练一次</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        testData: null,
        questionData: null,
        selectQues: null,
        finish: false,
        resultDialog: false,
        correctCount: 0,
        errorList: [],
        time: 0
      }
    },
    methods:{
      select_toString(select){
        let arr = [...select]
        if(arr.length){
          return arr.sort().join('')
        }else{
          return '空'
        }
      },
      submitTest(){
        //统计正确题数
        this.selectQues.forEach((q,i)=>{
          if(q.type===1){
            if(q.answer===q.select){
              this.correctCount++
            }else{
              let obj = {id: q.id,index: i+1,name: `${q.question_name}`}
              this.errorList.push(obj)
            }
          }else if(q.type===2){
            if(q.answer===this.select_toString(q.select)){
              this.correctCount++
            }else{
              let obj = {id: q.id,index: i+1,name: `${q.question_name}`}
              this.errorList.push(obj)
            }
          }
        })
        this.finish = true
      }
    },
    computed:{
      getTime(){
        let minute = ('0'+parseInt(this.time/60)).slice(-2)
        let second = ('0'+this.time%60).slice(-2)
        return minute+':'+second
      }
    },
    created(){
      this.testData = this.$route.params.data
      if(!this.testData){
        this.$router.push('/problem')
        return false
      }else{
        this.axios.post(`${this.baseURL}/question/getBySomeId`,{idList:this.testData.idList}).then(res=>{
          this.questionData = res.data.rows
          //拷贝一份试题
          let ques = [...this.questionData]
          let len;
          if(ques.length<this.testData.count){
            len = ques.length
          }else{
            len = this.testData.count
          }
          let list = []
          for(let i=0;i<len;i++){
            //随机获得试题的索引
            let index = Math.floor(Math.random()*ques.length)
            //添加到测试的试题数组
            list.push(ques.splice(index,1)[0]);
          }
          this.selectQues = list
          this.selectQues.forEach(q=>{
            if(q.type==1){
              this.$set(q,'select','')
            }else if(q.type==2){
              this.$set(q,'select',[])
            }
          })
        })
      }
      setInterval(() => {
        if(this.finish){
          return false
        }
        this.time = this.time+1
      }, 1000);
    }
  }
</script>

<style scoped lang="stylus">
.test
  padding 10px 0
  background #ecf5ff
  min-height calc(100vh - 61px)
  box-sizing border-box
  .el-container
    width 1000px
    margin 0 auto
    background #fff
    .el-header
      line-height 60px
      font-size 20px
      border-bottom 1px solid #dcdfe6
      .time
        float right
        color #E6A23C
        font-size 24px
    .el-main
      padding 0 20px
      .rowWrapper
        border-bottom 1px solid #dcdfe6
        padding 20px 0 0
        .header
          font-size 16px
          span
            margin-left 10px
            color #909399
        .main
          padding 0 20px
          .title
            margin 14px 0
          .el-checkbox-group,.el-radio-group
            width 100%
            .el-checkbox,.el-radio
              display block
              margin 0 0 20px
          .bottom
            margin-bottom 20px
            display flex
            .answer
              margin-right 20px
            .select
              .correct
                color #67C23A
              .error
                color #F56C6C
    .el-footer
      line-height 60px
      text-align right
  .el-dialog
    >>> .el-form-item__label
      font-weight bold !important
    .errorName
      display table
      a
        color #303133
        display table-cell
        &:hover
          color #909399
      >>> p
        margin 0
        &:hover *
          color #909399 !important
</style>