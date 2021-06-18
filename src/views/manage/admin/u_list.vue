<template>
  <div class="app-container">
      用户注册列表
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

      <el-table-column prop="userName" label="姓名" width="80" />

      <el-table-column prop="userPhone" label="手机号" width="120" />

      <el-table-column prop="userEmail" label="邮箱" width="160" />

      <el-table-column prop="userCity" label="城市" width="80"/>

      <el-table-column prop="userSex" label="性别" width="60" />
      <el-table-column prop="userBank" label="银行账号" width="160" />
      <el-table-column prop="userCredit" label="积分"  />
      
      <el-table-column prop="userMoney" label="账户余额"  />


      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
         
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="disableById(scope.row.userId)">通过</el-button>
   
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.userId)">注销</el-button>
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
            userlist.getPageListUserRegister(this.page,this.limit)
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
          userlist.disableUser(id)
          
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
                    userlist.deleteUserId(id)
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