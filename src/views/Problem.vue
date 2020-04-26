<template>
  <div class="problem">
    <el-container>
      <el-header>
        科目分类
        <el-input placeholder="关键词搜索" v-model="searchValue" size="medium"></el-input>
        <el-button type="primary" size="small" @click="testDialog=true">组卷测试</el-button>
      </el-header>
      <el-main>
        <div class="subjectWrapper">
          <ul>
            <li :class="!active?'active':''" @click="changeSubject(0)">全部</li>
            <li :class="active==s.id?'active':''" v-for="s in subjectData" :key="s.id" @click="changeSubject(s.id)">{{s.subject_name}}</li>
          </ul>
        </div>
        <div class="rowWrapper" v-for="(q,i) in filterQues" :key="q.id">
          <div class="name">{{i+1}}、<a @click="$router.push(`/question/${q.id}`)" v-html="q.question_name"></a></div>
          <div class="tags">
            <el-tag type="info" size="mini">{{q.nickname}}</el-tag>
            <el-tag size="mini">{{q.subject_name}}</el-tag>
            <el-tag type="warning" size="mini">{{$store.state.types[q.type]}}</el-tag>
            <el-popover
              placement="left"
              width="190"
              trigger="click">
              <el-select v-model="selectTag" placeholder="请选择标签" size="small">
                <el-option v-for="(t,ti) in tagData" :key="ti" :label="t.tag_name" :value="t.tag_name"></el-option>
              </el-select>
              <el-button type="primary" size="small" @click="addQues(q.id)">确定</el-button>
              <el-tag type="info" size="small" effect="dark" class="add" slot="reference">加入题库</el-tag>
            </el-popover>
          </div>
        </div>
      </el-main>
    </el-container>
    <el-dialog :visible.sync="testDialog" title="测试设置" width="600px">
      <el-form label-width="80px">
        <el-form-item label="选择科目">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-checkbox-group v-model="checkedSubject" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="s in subjectData" :label="s.id" :key="s.id">{{s.subject_name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="时长/分钟">
          <el-input-number v-model="time" :min="1" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="题目数量">
          <el-input-number v-model="count" :min="3" :max="10"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="testDialog = false">取 消</el-button>
        <el-button type="primary" @click="toTest()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        subjectData: null,
        questionData: null,
        //搜索后的试题数据
        searchQues: null,
        searchValue: '',
        //科目分类下的试题数据
        filterQues: null,
        //科目的active
        active: 0,
        loginname: '',
        tagData: null,
        selectTag: '默认',
        //测试设置对话框
        testDialog: false,
        checkAll: false,
        checkedSubject: [],
        isIndeterminate: false,
        count: 5,
        time: 3,
      }
    },
    methods:{
      changeSubject(id){
        this.active = id;
        if(!id){
          this.filterQues = this.searchQues;
        }else{
          this.filterQues = this.searchQues.filter(q=>q.subject_id==id)
        }
      },
      addQues(id){
        this.axios.post('/api/myproblem/addQuestion',{loginname:this.loginname,tag_name:this.selectTag,id}).then(res=>{
          this.$message(res.data.message)
        })
      },
      //测试设置里的方法
      handleCheckAllChange(val) {
        let idList = this.subjectData.map(item=>item.id)
        this.checkedSubject = val ? idList : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.subjectData.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.subjectData.length;
      },
      toTest(){
        if(!this.checkedSubject.length){
          this.$message("至少选择一个科目")
        }else{
          this.$router.push({
            name: 'test',
            params: {data:{idList:this.checkedSubject,count:this.count,time:this.time}}
          }) 
        }
      }
    },
    created(){
      this.axios.get('/api/subject/get').then(res=>{
        this.subjectData = res.data.rows
      })
      this.axios.get('/api/question/get').then(res=>{
        this.questionData = res.data.rows.filter(q=>q.is_admin==1)
        this.searchQues = this.questionData;
        this.changeSubject(this.active);
      })
      this.loginname = JSON.parse(localStorage.getItem('logininfo')).loginname
      this.axios.post('/api/myproblem/getTags',{loginname: this.loginname}).then(res=>{
        this.tagData = res.data.rows
      })
    },
    watch:{
      searchValue(){
        if(!this.searchValue){
          this.searchQues = this.questionData
        }else{
          this.searchQues = this.questionData.filter(q=>q.question_name.indexOf(this.searchValue)!==-1)
        }
        this.changeSubject(this.active);
      }
    }
  }
</script>

<style scoped lang="stylus">
  .problem
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
        .el-input
          width 50%
          margin-left 20px
          vertical-align top
        .el-button
          float right
          margin-top 30px
          transform translateY(-50%)
      .el-main
        .subjectWrapper
          li
            display inline-block
            font-size 14px
            padding 6px 15px
            margin 0 20px 15px 0
            cursor pointer
            border-radius 20px
            &.active
              background #aaa
              color #fff
            &:hover
              background #909399
              color #fff
        .rowWrapper
          border-bottom 1px solid #dcdfe6
          padding 10px 0
          >>> p
            margin 0
          .tags
            margin-top 15px
            .el-tag
              margin-right 10px
              &.add
                float right
                margin-top -3px
                cursor pointer
                &:hover
                  background #aaa
  .el-select
    width 120px
    margin-right 10px
</style>