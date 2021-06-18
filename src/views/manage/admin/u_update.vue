<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="姓名">
        <!-- <p>{{from.userName}}</p> -->
<!-- <div class="inputDeep"> -->
        <el-input v-model="form.userName"/>
        
        <!-- </div> -->
      </el-form-item>
      <el-form-item label="手机号" >
          <el-input v-model="form.userPhone"/>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.userEmail" id="email"/>
      </el-form-item>
      <el-form-item label="城市">
          <el-select v-model="form.userCity" placeholder="please select your zone">
          <el-option label="北京" value="北京"/>
          <el-option label="上海" value="上海"/>
          <el-option label="广州" value="广州"/>
          <el-option label="杭州" value="杭州"/>
          <el-option label="南京" value="南京"/>
          <el-option label="海南" value="海南"/>
        </el-select>
        <!-- <el-switch v-model="form.delivery"/> -->
      </el-form-item>
      <el-form-item label="性别">
          <el-radio-group v-model="form.userSex">
          <el-radio  label="男"/>
          <el-radio  label="女"/>
        </el-radio-group>
        <!-- <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type"/>
          <el-checkbox label="Promotion activities" name="type"/>
          <el-checkbox label="Offline activities" name="type"/>
          <el-checkbox label="Simple brand exposure" name="type"/>
        </el-checkbox-group> -->
      </el-form-item>
      <el-form-item label="银行账号">
         <el-input v-model="form.userBank"/>
      </el-form-item>
      <el-form-item label="积分">
        <el-input v-model="form.userCredit"/>
      </el-form-item>
      <el-form-item label="账户余额">
        <el-input v-model="form.userMoney"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="updateUser">update</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import userlist from '@/api/manage/userlist'
export default {
  data() {
     
    return {
      form: {
        userName: '',
        userPhone: '',
        userEmail: '',
        userCity: '',
        userSex: '',
        userBank: '',
        userCredit: '',
        userMoney:''
      },
     
      saveBtnDisabled:false
    }
    
  },
  created(){
    //console.log("get~")
    //获得路由上的id
    const userId=this.$route.params.id
    //console.log(userId)
    this.getInfo(userId)
  },

  methods: {
    
    getInfo(id){
      userlist.getUserInfo(id)
      .then(response=>{
        this.form=response.data.user
        //console.log("get~~~~"+response.data.user+this.user+this.userlist)
      })

    },
    updateUser(){
      //console.log("hello")
      userlist.updateUser(this.form)
      .then(response=>{
        //console.log("get~"+response.data.user+this.user+this.userlist)
        this.$message({
          type:'success',
          massage:'修改成功!'
        })
         this.$router.push({ path:  '/manage2/userlist'})
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
         this.$router.push({ path:  '/manage2/userlist'})
    }
  }
}

</script>

<style scoped>
.line{
  text-align: center;
}
/* 
.el-input {
      border: 0;
      border-radius: 0px;
      box-shadow: none;
      &:focus {
        border-bottom: 1px solid #409eff;
      }
    } */
    
  /* 利用穿透，设置input边框隐藏 */
  /* .inputDeep>>>.el-input__inner {
    border: 0;
  } */
  /* 如果你的 el-input type 设置成textarea ，就要用这个了 */
  /* .inputDeep>>>.el-textarea__inner {
    border: 0;
    resize: none;/* 这个是去掉 textarea 下面拉伸的那个标志，如下图 */
  /* } */
</style>

