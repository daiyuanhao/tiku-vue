<template>
  <div id="app">
    <Nav :is_admin="is_admin"></Nav>
    <div class="loginWrapper">
      <div class="login" v-if="!logined">
        <a @click="signVisible=true;active='注册'">注册</a>
        <el-divider direction="vertical"></el-divider>
        <a @click="signVisible=true;active='登录'">登录</a>
      </div>
      <div class="logined" v-else>
        <router-link :to="'/user/'+id"><el-avatar :src="'/api'+avatar" alt=""></el-avatar></router-link>
        <el-divider direction="vertical"></el-divider>
        <a @click="signOut">登出</a>
      </div>
    </div>
    <router-view/>
    <el-dialog :visible.sync="signVisible" width="400px">
      <el-tabs v-model="active" :stretch='true'>
        <el-tab-pane label="注册" name="注册">
          <el-form :model="register">
            <el-form-item>
              <el-input v-model="register.loginname" placeholder="用户名" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="register.password" placeholder="密码" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="register.confirm" placeholder="确认密码" show-password></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="登录" name="登录">
          <el-form :model="register">
            <el-form-item>
              <el-input v-model="login.loginname" placeholder="用户名" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="login.password" placeholder="密码" type="password" show-password></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <el-button type="primary" @click="handleSign()">{{active}}</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import Nav from "./components/nav"

  export default {
    data(){
      return {
        active: '注册',
        signVisible: false,
        register:{
          loginname: '',
          password: '',
          confirm: ''
        },
        login:{
          loginname: '',
          password: ''
        },
        logined: false,
        avatar: '',
        is_admin: 0,
        id: 0
      }
    },
    methods:{
      handleSign(){
        if(this.active=="注册"){
          this.axios.post('/api/register',this.register).then(res=>{
            this.$message(res.data.message)
            if(res.data.success){
              this.login.loginname = this.register.loginname
              this.login.password = this.register.password
              this.active = "登录"
            }
            this.register = {
              loginname: '',
              password: '',
              confirm: ''
            }
          })
        }else{
          this.axios.post('/api/login',this.login).then(res=>{
            this.$message(res.data.message)
            this.login.password = ""
            if(res.data.success){
              this.signVisible = false
              //存储登录信息
              let logininfo = res.data.rows;
              localStorage.setItem("logininfo",JSON.stringify(logininfo))
              this.logined = true;
              this.avatar = logininfo.avatar
              this.is_admin = logininfo.is_admin
              this.id = logininfo.id
            }
          })
        }
      },
      signOut(){
        localStorage.removeItem("logininfo")
        this.logined = false;
      }
    },
    components:{
      Nav
    },
    created(){
      if(localStorage.getItem('logininfo')){
        this.logined = true
        let logininfo = JSON.parse(localStorage.getItem('logininfo'))
        this.avatar = logininfo.avatar
        this.is_admin = logininfo.is_admin
        this.id = logininfo.id
        window.console.log(logininfo)
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import url('./assets/reset.css');
  #app
    .loginWrapper
      position absolute
      top 0
      right 70px
      line-height 60px
      a
        font-size 16px
        .el-avatar
          vertical-align top
          margin-top 8px
      .el-divider
        margin 0 12px
    >>> .el-tabs__header
      margin-bottom 20px
    .el-button
      width 100%
</style>
