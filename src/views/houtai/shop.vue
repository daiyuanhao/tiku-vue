<template>
  <div class="shop">
    <el-table :data="shopData">
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="`${baseURL}`+scope.row.img" alt="" :style="{'width':'40px'}">
        </template>
      </el-table-column>
      <el-table-column label="价格" prop="price"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" @click="edited(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="delGoods(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" size="small" style="margin-top:10px" @click="dialogAdd=true">添加</el-button>
    <el-dialog :visible.sync="dialogAdd" title="添加" width="30%">
      <el-form>
        <el-form-item label="商品名称" label-width="80px">
          <el-input v-model="add.name"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="80px">
          <img v-if="add.img" :src="`${baseURL}`+add.img" :style="{'width':'40px'}">
          <el-upload 
            :action="`${baseURL}`+'/shop/upload'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <el-button size="medium">上传图片</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="价格" label-width="80px">
          <el-input v-model="add.price"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogAdd = false">取 消</el-button>
        <el-button type="primary" @click="addGoods">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogEdit" title="编辑" width="30%">
      <el-form>
        <el-form-item label="商品名称" label-width="80px">
          <el-input v-model="edit.name"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="80px">
          <img v-if="edit.img" :src="`${baseURL}`+edit.img" :style="{'width':'40px'}">
          <el-upload 
            :action="`${baseURL}`+'/shop/upload'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <el-button size="medium">上传图片</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="价格" label-width="80px">
          <el-input v-model="edit.price"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogEdit = false">取 消</el-button>
        <el-button type="primary" @click="editGoods">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        shopData: null,
        dialogAdd: false,
        add: {
          name: '',
          img: '',
          price: ''
        },
        dialogEdit: false,
        edit:{
          id: '',
          name: '',
          img: '',
          price: ''
        }
      }
    },
    methods:{
      getGoods(){
        this.axios.get(`${this.baseURL}/shop/get`).then(res=>this.shopData=res.data.rows)
      },
      delGoods(id){
        this.axios.post(`${this.baseURL}/shop/delete`,{id}).then(res=>{
          if(res.data.success){
            this.$message(res.data.message)
            this.getGoods()
          }
        })
      },
      addGoods(){
        this.axios.post(`${this.baseURL}/shop/add`,this.add).then(res=>{
          this.$message(res.data.message)
          if(res.data.success){
            this.dialogAdd = false
            this.getGoods()
          }
        })
      },
      edited(row){
        this.dialogEdit=true;
        this.edit.id=row.id
        this.edit.name=row.name
        this.edit.img=row.img
        this.edit.price=row.price
      },
      editGoods(){
        this.axios.post(`${this.baseURL}/shop/edit`,this.edit).then(res=>{
          this.$message(res.data.message)
          if(res.data.success){
            this.dialogEdit = false
            this.getGoods()
          }
        })
      },
      //图片上传成功后执行的方法
      handleAvatarSuccess(res){
        this.$message(res.message)
        this.add.img = "/uploads/"+res.filename
      },
    },
    created(){
      this.getGoods()
    }
  }
</script>

<style scoped lang="stylus">

</style>