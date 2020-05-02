<template>
  <div class="user">
    <el-container>
      <el-header>个人信息</el-header>
      <el-main v-if="userinfo">
        <el-form label-position="left" label-width="100px">
          <el-form-item label="用户名">
            <div>{{userinfo.loginname}}</div>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="userinfo.nickname" class="nickname"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <div class="avatar">
              <img :src="`${baseURL}`+userinfo.avatar">
              <el-upload 
                :action="`${this.baseURL}/users/upload`"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
              >
                <el-button size="medium">上传新头像</el-button>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" @click="saveInfo">保存资料</el-button>
            <el-button>还原</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        userinfo:null,
      }
    },
    methods:{
      //图片上传成功后执行的方法
      handleAvatarSuccess(res){
        this.$message(res.message)
        this.userinfo.avatar = "/uploads/"+res.filename
      },
      saveInfo(){
        window.console.log(this.userinfo)
        this.axios.post(`${this.baseURL}/users/saveInfo`,this.userinfo).then(res=>{
          if(res.data.success){
            this.$message(res.data.message)
            let logininfo = JSON.parse(localStorage.getItem('logininfo'))
            logininfo.avatar = this.userinfo.avatar
            localStorage.setItem('logininfo', JSON.stringify(logininfo))
            this.$router.go(0)
          }
        })
      }
    },
    created(){
      let id = this.$route.params.id
      this.axios.post(`${this.baseURL}/users/getUserByI,{id}).then(res=>{
        this.userinfo = res.data.rows
      })
    }
  }
</script>

<style scoped lang="stylus">
.user
  background #ecf5ff
  min-height calc(100vh - 61px)
  .el-container
    width 1000px
    margin 0 auto
    .el-header
      line-height 60px
      font-size 24px
    .el-main
      background #fff
      .el-form
        padding 0 10px
        .nickname
          width 300px
        .avatar
          display flex
          img
            width 100px
            margin-right 20px
</style>