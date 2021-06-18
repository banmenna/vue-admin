<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm"  class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">Welcome to Login</h3>
      <el-form-item prop="userName">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.userName" name="userName" type="text" auto-complete="on" placeholder="username" />
      </el-form-item>
      <el-form-item prop="userPsd">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.userPsd"
          name="userPsd"
          auto-complete="on"
          placeholder="password"
          @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      <div class="tips">
       
 <el-radio v-model="radio" label="1">用户</el-radio>
  <el-radio v-model="radio" label="2">管理员</el-radio>
  <el-radio v-model="radio" label="3">商家</el-radio>
   <span >
  <router-link v-if="this.radio==1" :to="'/register'">
           <link type="primary"   target="_blank">注册
          </router-link>
        <router-link v-else-if="this.radio==3" :to="'/register_saler'">
           <link  target="_blank"> 注册
          </router-link>
  
        </span>

      </div>
       
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          Sign in
        </el-button>
      </el-form-item>
      
    </el-form>
  </div>
</template>

<script>
import user from '@/api/manage/user'
import saler from '@/api/manage/saler'
import admin from '@/api/manage/userlist'
export default {
  name: 'Login',
  data() {
    
    return {
      radio: '1',
      loginForm: {
        
        userName: '',
        userPsd: ''
        
      },
      loginForm2:{
        adminName:'',
        adminPsd:''
      },loginForm3:{
        salerName:'',
        salerPsd:''
      },
      
      loading: false,
      pwdType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
        //console.log("1233"+this.redirect+"-"+route.query+route.query.redirect)
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.loading = true
      if(this.radio==1){
      user.loginUser(this.loginForm)
      .then(response=>{
        //console.log("get~"+response.data.user+this.user+this.userlist)
        
        
        var id = response.data.token
            this.loading = false
            //console.log("000"+this.redirect)
            this.$router.replace({ path:  '/shop/user',query:{userid:id}  })
            
        this.$message({
          type:'success',
          massage:'登录成功!'
        })
      })
      .catch(error=>{
          this.loading=false
        })
      }else if(this.radio==2){
        //console.log("get~"+this.loginForm+this.admin)
this.loginForm2.adminName=this.loginForm.userName
this.loginForm2.adminPsd=this.loginForm.userPsd
        admin.loginAdmin(this.loginForm2)
      .then(response=>{
        //console.log("get~"+response.data.user+this.user+this.userlist)
        
        
            this.loading = false
            //console.log("000"+this.redirect)
            this.$router.push({  path:  '/dashboard/dashboard'  })
            
        this.$message({
          type:'success',
          massage:'登录成功!'
        })
      }).catch(error=>{
          this.loading=false
        })
      }
      else if(this.radio==3){
this.loginForm3.salerName=this.loginForm.userName
this.loginForm3.salerPsd=this.loginForm.userPsd
        saler.loginSaler(this.loginForm3)
        //saler.getSalerId(this.loginForm3)
        
      .then(response=>{
        
        //console.log(response.data)
        
        var id = response.data.token
            this.loading = false
            //console.log("000"+id)
            
            this.$router.push({ path:  '/saler/saler',query:{salerid:id} })
            
// this.$router.push({path:'/selectCate',query:{userid:id}});

        this.$message({
          type:'success',
          massage:'登录成功!'
        })
      }).catch(error=>{
          this.loading=false
        })
      }
      
    }
      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {
      //     this.loading = true
      //     this.$store.dispatch('Login', this.loginForm).then(() => {
      //       this.loading = false
      //       this.$router.push({ path: this.redirect || '/' })
      //     }).catch(() => {
      //       this.loading = false
      //     })
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 15px;
    color: #fff;
    text-align:center;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-left:20px;
        color: #00CCFF;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
