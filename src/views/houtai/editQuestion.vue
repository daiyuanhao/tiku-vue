<template>
  <div class="edit">
    <el-main v-if="question">
      <el-form :model="question" label-width="80px" ref="question">
        <el-form-item label="科目">
          <el-select v-model="question.subject_id" placeholder="请选择科目">
            <el-option v-for="s in subjectData" :key="s.id" :label="s.subject_name" :value="s.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="question.type" placeholder="请选择科目">
            <el-radio v-for="(t,i) in $store.state.types" :key="i" :label="i">{{t}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="题目" class="quillWrapper">
          <quill-editor 
            v-model="question.question_name"
            class="quill"
          />
        </el-form-item>
        <el-form-item label="选项A">
          <el-input type="textarea" v-model="question.a" resize="none" :autosize="{minRows:2}"></el-input>
        </el-form-item>
        <el-form-item label="选项B">
          <el-input type="textarea" v-model="question.b" resize="none" :autosize="{minRows:2}"></el-input>
        </el-form-item>
        <el-form-item label="选项C">
          <el-input type="textarea" v-model="question.c" resize="none" :autosize="{minRows:2}"></el-input>
        </el-form-item>
        <el-form-item label="选项D">
          <el-input type="textarea" v-model="question.d" resize="none" :autosize="{minRows:2}"></el-input>
        </el-form-item>
        <el-form-item label="答案">
          <el-input type="textarea" v-model="question.answer" resize="none" :autosize="{minRows:2}"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editQuestion">编辑试题</el-button>
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
        question: null,
      }
    },
    methods:{
      editQuestion(){
        this.axios.post(`${this.baseURL}/question/update`,this.question).then(res=>{
          if(res.data.success){
            this.$message(res.data.message)
            setTimeout(() => {
              this.$router.push('/houtai/question')
            }, 2000);
          }
        })
      }
    },
    created(){
      this.axios.get(`${this.baseURL}/subject/get`).then(res=>{
        this.subjectData = res.data.rows
      })
      let id = this.$route.params.id;
      this.axios.post(`${this.baseURL}/question/getById`,{id}).then(res=>{
        this.question = res.data.rows
      })
    }
  }
</script>

<style scoped lang="stylus">
.el-main
  width 1000px
  .quillWrapper
    height 300px
    .quill
      height 200px
</style>