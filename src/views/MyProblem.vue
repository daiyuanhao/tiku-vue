<template>
  <div class="myProblem">
    <el-container>
      <el-header>个人题库</el-header>
      <el-main>
        <div class="tagWrapper">
          <el-tag
            v-for="(tag,i) in tagData"
            :key="i"
            :closable="tag.tag_name!=='默认'"
            effect="plain"
            :class="active==tag.tag_name?'active':''"
            @click="changeTag(tag.tag_name)"
            @close="handleClose(tag.tag_name)">
            {{tag.tag_name}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </div>
        <div class="questionWrapper">
          <div class="rowWrapper" v-for="(q,i) in filterQues" :key="q.id">
            <div class="name">{{i+1}}、<span v-html="q.question_name"></span></div>
            <div class="tags">
              <el-tag size="mini">{{q.subject_name}}</el-tag>
              <el-tag type="warning" size="mini">{{$store.state.types[q.type]}}</el-tag>
              <el-tag type="danger" size="small" effect="dark" class="del" @click="delQues(q.question_id)">移出</el-tag>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loginname: '',
        tagData: null,
        inputVisible: false,
        inputValue: '',
        active: '默认',
        questionData: null,
        filterQues: null
      };
    },
    methods: {
      handleClose(tag) {
        this.axios.post(`${this.baseURL}/myproblem/delTag`,{loginname:this.loginname,tag_name:tag}).then(res=>{
          if(res.data.success){
            this.getTags()
            this.$message(res.data.message)
          }
        })
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(() => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.axios.post(`${this.baseURL}/myproblem/addTag`,{loginname:this.loginname,tag_name:inputValue}).then(res=>{
            if(res.data.success){
              this.$message(res.data.message)
              this.getTags()
            }
          })
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      getTags(){
        this.axios.post(`${this.baseURL}/myproblem/getTags`,{loginname: this.loginname}).then(res=>{
          this.tagData = res.data.rows
        })
      },
      getQues(){
        this.axios.post(`${this.baseURL}/myproblem/getQuestions`,{loginname: this.loginname}).then(res=>{
          this.questionData = res.data.rows
          window.console.log(this.questionData)
          this.filterQues = this.questionData.filter(q=>q.tag_name===this.active)
        })
      },
      changeTag(tag){
        this.active = tag
        this.filterQues = this.questionData.filter(q=>q.tag_name===tag)
      },
      delQues(question_id){
        this.axios.post(`${this.baseURL}/myproblem/delQuestion`,{loginname:this.loginname,tag_name:this.active,question_id}).then(res=>{
          this.$message(res.data.message)
          this.getQues()
        })
      }
    },
    created(){
      this.loginname = JSON.parse(localStorage.getItem('logininfo')).loginname
      this.getTags()
      this.getQues()
    }
  }
</script>

<style scoped lang="stylus">
.myProblem
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
      .el-main
        .tagWrapper
          .el-tag
            cursor pointer
            &.active
              background #ecf5ff
            &:hover
              background #d9ecff
          .el-tag + .el-tag {
            margin-left: 20px;
          }
          .button-new-tag {
            margin-left: 20px;
            height: 32px;
            line-height: 30px;
            padding-top: 0;
            padding-bottom: 0;
          }
          .input-new-tag {
            width: 90px;
            margin-left: 20px;
            vertical-align: bottom;
          }
        .questionWrapper
          padding-top 20px
          .rowWrapper
            border-bottom 1px solid #dcdfe6
            padding 10px 0
            .tags
              margin-top 15px
              .el-tag
                margin-right 10px
                &.del
                  float right
                  margin-top -3px
                  cursor pointer
                  &:hover
                    color #f56c6c
                    background #fef0f0
</style>