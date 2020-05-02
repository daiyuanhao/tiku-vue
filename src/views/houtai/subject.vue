<template>
  <div class="subject">
    <el-table :data="subjectData">
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="科目" prop="subject_name"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" @click="edited(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="delSubject(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" size="small" style="margin-top:10px" @click="dialogAdd=true">添加</el-button>
    <el-dialog :visible.sync="dialogAdd" title="添加" width="30%">
      <el-form>
        <el-form-item label="科目名称" label-width="80px">
          <el-input v-model="add.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogAdd = false">取 消</el-button>
        <el-button type="primary" @click="addSubject">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogEdit" title="编辑" width="30%">
      <el-form>
        <el-form-item label="科目名称" label-width="80px">
          <el-input v-model="edit.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogEdit = false">取 消</el-button>
        <el-button type="primary" @click="editSubject">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        subjectData: null,
        dialogAdd: false,
        add: {
          name: ''
        },
        dialogEdit: false,
        edit:{
          id: '',
          name: ''
        }
      }
    },
    methods:{
      getSubject(){
        this.axios.get(`${this.baseURL}/subject/get`).then(res=>this.subjectData=res.data.rows)
      },
      delSubject(id){
        this.axios.post(`${this.baseURL}/subject/delete`,{id}).then(res=>{
          if(res.data.success){
            this.$message(res.data.message)
            this.getSubject()
          }
        })
      },
      addSubject(){
        this.axios.post(`${this.baseURL}/subject/add`,{name:this.add.name}).then(res=>{
          this.$message(res.data.message)
          if(res.data.success){
            this.dialogAdd = false
            this.getSubject()
          }
        })
      },
      edited(row){
        this.dialogEdit=true;
        this.edit.id=row.id
        this.edit.name=row.subject_name
      },
      editSubject(){
        this.axios.post(`${this.baseURL}/subject/edit`,this.edit).then(res=>{
          this.$message(res.data.message)
          if(res.data.success){
            this.dialogEdit = false
            this.getSubject()
          }
        })
      }
    },
    created(){
      this.getSubject()
    }
  }
</script>

<style scoped lang="stylus">

</style>