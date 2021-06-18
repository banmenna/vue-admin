<template>
  <div class="app-container">
      商家注册列表
       <!-- <el-popover placement="right" trigger="hover">
       <img src="http://localhost:80/image/world.jpg" style="width: 500px;height: 400px">
       <img slot="reference" src="http://localhost:80/image/world.jpg" style="width: 300px;height: 200px">
 </el-popover> -->

        <!-- 表格 -->
        <el-table
      
      :data="list"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="salerName" label="姓名" width="80" />

      <el-table-column prop="salerPhone" label="手机号" width="120" />

      <el-table-column prop="salerSex" label="性别" width="60" />
      <el-table-column prop="salerIdnumber" label="身份证件"  >
        <template  slot-scope="scope" >            
          <el-popover placement="left" trigger="hover">
            <img v-bind:src="URL+scope.row.salerIdnumber" min-width="700" height="500" />
            <img slot="reference" v-bind:src="URL+scope.row.salerIdnumber" style="width: 70px;height:70px">
          </el-popover>
        </template> 
      </el-table-column>
      <el-table-column prop="salerBank" label="银行账号" width="160" />
      <el-table-column prop="salerIdentity" label="营业执照"  >
        <!-- <template   slot-scope="scope">            
                    <img :src="scope.row.image"  min-width="70" height="70" />
                 </template>  -->
                 <template  slot-scope="scope" >            
                   <el-popover placement="left" trigger="hover">
                    <img v-bind:src="URL+scope.row.salerIdentity" min-width="700" height="500" />
                     <img slot="reference" v-bind:src="URL+scope.row.salerIdentity" style="width: 70px;height:70px">
                     </el-popover>
                 </template> 
                 <!-- <el-popover placement="right" trigger="hover">
       <img src="http://localhost:80/image/world.jpg" style="width: 500px;height: 400px">
       <img slot="reference" src="http://localhost:80/image/world.jpg" style="width: 300px;height: 200px">
 </el-popover> -->
        </el-table-column>

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
         
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="disableById(scope.row.salerId)">通过</el-button>
   
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.salerId)">注销</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import userlist from '@/api/manage/userlist'
export default {
  
   inject:['reload'],
    data(){//定义变量和初始值
        return {
          URL:"http://localhost:80/image/",
            list:null,
            page:1,
            limit:10,
            total:0,
           
        }
    },
    created(){//一般调用methods中方法
    

        this.getList()
    },
    methods:{//调用userlist.js定义的方法
    //用户列表的方法
        getList(){
            userlist.getPageListSalerRegister(this.page,this.limit)
                .then(response=>{//请求成功
                //response接口返回的数据
                    //console.log(response)
                    this.list=response.data.rows
                    this.total=response.data.total
                    console.log(this.list)
                    console.log(this.total)
                })
                .catch(error=>{
                    console.log(error)
                })
        },
        disableById(id){
          userlist.disableSaler(id)
          
             
          .then(response=>{
                    this.$message({
                    type: 'success',
                    message: '操作成功!'
                    });
              })
              this.reload() 
 //location. reload()
 //this.$router.go(0)
        },
        removeDataById(id){
            //alert(id)
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    userlist.deleteSalerId(id)
                    .then(response=>{
                    this.$message({
                    type: 'success',
                    message: '删除成功!'
                    });
                //回到列表页面
                    this.getList()
                })
               
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }
    }
}
</script>