<template>
  <div class="question">
    <el-table :data="questionData">
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="类型" prop="type">
        <template slot-scope="scope">
          <span>{{$store.state.types[scope.row.type]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="题目">
        <template slot-scope="scope">
          <div class="hidden" v-html="scope.row.question_name"></div>
        </template>
      </el-table-column>
      <el-table-column label="科目" prop="subject_name"></el-table-column>
      <el-table-column label="A" prop="a"></el-table-column>
      <el-table-column label="B" prop="b"></el-table-column>
      <el-table-column label="C" prop="c"></el-table-column>
      <el-table-column label="D" prop="d"></el-table-column>
      <el-table-column label="答案" prop="answer"></el-table-column>
      <el-table-column label="发布用户" prop="nickname"></el-table-column>
      <el-table-column label="发布时间" prop="create_time"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" @click="$router.push(`/houtai/editQuestion/${scope.row.id}`)">编辑</el-button>
          <el-button size="mini" type="danger" @click="delQuestion(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" size="small" style="margin-top:10px" @click="$router.push('/houtai/addQuestion')">添加</el-button>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        questionData: null
      }
    },
    methods:{
      getQuestion(){
        this.axios.get('/api/question/get').then(res=>this.questionData=res.data.rows)
      },
      delQuestion(id){
        this.axios.post('/api/question/delete',{id}).then(res=>{
          if(res.data.success){
            this.$message(res.data.message)
            this.getQuestion()
          }
        })
      }
    },
    created(){
      this.getQuestion()
    }
  }
</script>

<style scoped lang="stylus">
.hidden
  height 80px
  line-height 20px
  overflow hidden
  text-overflow: ellipsis;
  display: -webkit-box; /* 将对象作为弹性伸缩盒子模型显示 */      
  -webkit-line-clamp: 4; /* 控制最多显示几行 */      
  -webkit-box-orient: vertical; /* 设置或检索伸缩盒对象的子元素的排列方式 */
  >>> p 
    margin 0
</style>