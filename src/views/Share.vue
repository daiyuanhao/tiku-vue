<template>
  <div class="share">
    <el-main>
      <el-form :model="question" label-width="80px" ref="question">
        <el-form-item label="科目" prop="subject_id">
          <el-select v-model="question.subject_id" placeholder="请选择科目">
            <el-option v-for="s in subjectData" :key="s.id" :label="s.subject_name" :value="s.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="question.type" placeholder="请选择科目">
            <el-radio v-for="(t,i) in $store.state.types" :key="i" :label="i">{{t}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="题目" prop="name" class="quillWrapper">
          <quill-editor 
            v-model="question.name"
            class="quill"
          />
        </el-form-item>
        <el-form-item label="选项A" prop="ans_a">
          <el-input type="textarea" v-model="question.ans_a" resize="none" :autosize="{minRows:2}"></el-input>
        </el-form-item>
        <el-form-item label="选项B" prop="ans_b">
          <el-input type="textarea" v-model="question.ans_b" resize="none" :autosize="{minRows:2}"></el-input>
        </el-form-item>
        <el-form-item label="选项C" prop="ans_c">
          <el-input type="textarea" v-model="question.ans_c" resize="none" :autosize="{minRows:2}"></el-input>
        </el-form-item>
        <el-form-item label="选项D" prop="ans_d">
          <el-input type="textarea" v-model="question.ans_d" resize="none" :autosize="{minRows:2}"></el-input>
        </el-form-item>
        <el-form-item label="答案" prop="answer">
          <el-input type="textarea" v-model="question.answer" resize="none" :autosize="{minRows:2}"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addQuestion">分享试题</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        subjectData:null,
        question:{
          type: 1,
          name: '',
          subject_id: '',
          ans_a: '',
          ans_b: '',
          ans_c: '',
          ans_d: '',
          answer: ''
        }
      }
    },
    methods:{
      addQuestion(){
        let id = JSON.parse(localStorage.getItem("logininfo")).id
        let create_time = new Date().getTime();
        this.axios.post('/api/question/add',Object.assign({},this.question,{id,create_time})).then(res=>{
          this.$message(res.data.message)
        })
      },
      reset(){
        this.$refs.question.resetFields();
      }
    },
    created(){
      this.axios.get('/api/subject/get').then(res=>{
        this.subjectData = res.data.rows
      })
    }
  }
</script>

<style scoped lang="stylus">
.el-main
  width 1000px
  margin 0 auto
  .quillWrapper
    height 300px
    .quill
      height 200px
</style>