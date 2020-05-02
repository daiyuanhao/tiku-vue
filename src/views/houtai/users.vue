<template>
  <div class="users">
    <el-table :data="usersData">
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="用户名" prop="loginname"></el-table-column>
      <el-table-column label="管理员">
        <template slot-scope="scope">
          <!-- <el-switch v-model="scope.row.is_admin"></el-switch> -->
          <span>{{scope.row.is_admin?'是':'否'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="昵称" prop="nickname"></el-table-column>
      <el-table-column label="头像">
        <template slot-scope="scope">
          <img :src="`${baseURL}`+scope.row.avatar" alt="" :style="{'width':'40px'}">
        </template>
      </el-table-column>
      <el-table-column label="积分" prop="point"></el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <span v-if="scope.row.create_time">{{scope.row.create_time | formatTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <!-- <template slot-scope="scope">
          <el-button v-if="scope.row.id!==1" size="mini" type="danger" @click="delUser(scope.row.id)">删除</el-button>
        </template> -->
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        usersData: null
      }
    },
    methods:{
      getUsers(){
        this.axios.get(`${this.baseURL}/users/get`).then(res=>this.usersData=res.data.rows)
      },
      delUser(id){
        this.axios.post(`${this.baseURL}/users/delete`,{id}).then(res=>{
          if(res.data.success){
            this.$message(res.data.message)
            this.getUsers()
          }
        })
      }
    },
    created(){
      this.getUsers()
    }
  }
</script>

<style scoped lang="stylus">

</style>