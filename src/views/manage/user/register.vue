<template>
  <div class="app-container">
    <el-form  :model="form" ref="form" status-icon :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="userName">
        <el-input v-model="form.userName"/>
      </el-form-item>
      <el-form-item label="手机号" prop="userPhone">
          <el-input v-model="form.userPhone"/>
      </el-form-item>
      <el-form-item label="邮箱" prop="userEmail">
        <el-input v-model="form.userEmail"/>
      </el-form-item>
      <el-form-item label="城市" prop="userCity">
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
      <el-form-item label="性别" prop="userSex">
          <el-radio-group v-model="form.userSex">
          <el-radio  label="男" value="男"/>
          <el-radio  label="女" value="女"/>
        </el-radio-group>
        <!-- <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type"/>
          <el-checkbox label="Promotion activities" name="type"/>
          <el-checkbox label="Offline activities" name="type"/>
          <el-checkbox label="Simple brand exposure" name="type"/>
        </el-checkbox-group> -->
      </el-form-item>
      <el-form-item label="银行账号" prop="userBank">
         <el-input v-model="form.userBank"/>
      </el-form-item>
      <el-form-item label="密码" prop="userPsd">
        <el-input v-model="form.userPsd"/>
      </el-form-item>

      <el-form-item   label="验证码" prop="userCode">
      
    <el-input  v-model="form.userCode" class="code" type="text" id="text" />
    <canvas  ref="canvas" id="canvas" width="120" height="40" @click="canclick"></canvas>
    <!-- <input  type="button" class="button" value="提交" id="bt" width="120" height="40"/> -->

      </el-form-item>



      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="registerUser">register</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

     

  
import user from '@/api/manage/user'
export default {
  data() {
    
    var isMobileNumber= (rule, value, callback) => {
   if (!value) {
        return new Error("请输入电话号码");
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        const isPhone = reg.test(value);
        value = Number(value); //转换为数字
        if (typeof value === "number" && !isNaN(value)) {//判断是否为数字
        value = value.toString(); //转换成字符串
          if (value.length < 0 || value.length > 12 || !isPhone) { //判断是否为11位手机号
            callback(new Error("手机号码格式如:138xxxx8754"));
          } else {
            callback();
          }
        } else {
          callback(new Error("请输入电话号码"));
        }
      }
    };
    var isEmail = (rule, value, callback) => {
      if (!value) {
        callback(); 
      } else {
        const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        const email = reg.test(value);
        if (!email) {
          callback(new Error("邮箱格式如:admin@163.com"));
        } else {
          callback();
        }
      }
};var isCode = (rule, value, callback) => {
      if (!value) {
        callback(); 
      } else {
        var input = document.getElementById("text");
        var text = input.value //获取输入框的值
            if (text === this.num) {
                // alert('验证通过')
                  callback();
            } else  {
              //console.log(this.num2)
          callback(new Error("验证码有误，请重新验证"));
        } 
      }
};
    return {
      
      rules: {
        userPhone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
         { validator: isMobileNumber, trigger: "blur" }
        ],userEmail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {validator:isEmail, trigger: 'blur'}],
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        userBank: [
          { required: true, message: "请输入银行卡账号", trigger: "blur" },
        ],
        userPsd: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
        userSex: [
          { required: true, message: "请选择性别", trigger: "blur" },
        ],
        userCity: [
          { required: true, message: "请选择所在城市" ,trigger: "blur" },
        ],
        userCode: [
          { required: true, message: "请通过验证码验证" ,trigger: "blur" },
        {validator:isCode, trigger: 'blur'}],
     },
     form: {
        userName: '',
        userPhone: '',
        userEmail: '',
        userCity: '',
        userSex: '',
        userBank: '',
        userPsd: ''
          //
      }, 
      
       canvas : document.getElementById("canvas"),
num:'123',
      saveBtnDisabled:false
    }
    
  },
  created(){
    
    this.draw()
  },

  methods: {
   
        canclick () {
          this.$nextTick(()=>{
var context =this.$refs.canvas.getContext("2d")
context.clearRect(0, 0, 120, 40)
this.draw()
          //console.log(this.num)
         })
          // $(document).ready(function(){

          //  var context = this.canvas.getContext("2d");
          //this.  context.clearRect(0, 0, 120, 40);//在给定的矩形内清除指定的像素
            //console.log(this.context)
            //this.draw()
        
//})
},
          
getColor() {
            var r = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            return "rgb(" + r + "," + g + "," + b + ")";
        },
        draw() {
          this.$nextTick(()=>{
var context =this.$refs.canvas.getContext("2d")
          //console.log(this.num)
         // var canvas = document.getElementById("canvas");//演员
        //var context = canvas.getContext("2d");//舞台，getContext() 方法可返回一个对象，该对象提供了用于在画布上绘图的方法和属性。
        //var button = document.getElementById("bt");//获取按钮
       // var input = document.getElementById("text");//获取输入框
        //console.log(context)
            context.strokeRect(0, 0, 120, 40);//绘制矩形（无填充）
            var aCode = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
            // 绘制字母
            var arr = [] //定义一个数组用来接收产生的随机数
            //var num //定义容器接收验证码
            for (var i = 0; i < 4; i++) {
                var x = 20 + i * 20;//每个字母之间间隔20
                var y = 20 + 10 * Math.random();//y轴方向位置为20-30随机
                var index = Math.floor(Math.random() * aCode.length);//随机索引值
                var txt = aCode[index];
                context.font = "bold 20px 微软雅黑";//设置或返回文本内容的当前字体属性
                context.fillStyle=this.getColor();//设置或返回用于填充绘画的颜色、渐变或模式，随机
                context.translate(x,y);//重新映射画布上的 (0,0) 位置，字母不可以旋转移动，所以移动容器
                var deg=90*Math.random()*Math.PI/180;//0-90度随机旋转
                context.rotate(deg);//  旋转当前绘图
                context.fillText(txt, 0, 0);//在画布上绘制“被填充的”文本
                context.rotate(-deg);//将画布旋转回初始状态
                context.translate(-x,-y);//将画布移动回初始状态
                arr[i] = txt //接收产生的随机数
            }
            this.num = arr[0] + arr[1] + arr[2] + arr[3] //将产生的验证码放入num
            //console.log("hello~~"+this.num)
            // 绘制干扰线条
            for (var i = 0; i < 8; i++) {
                context.beginPath();//起始一条路径，或重置当前路径
                context.moveTo(Math.random() * 120, Math.random() * 40);//把路径移动到画布中的随机点，不创建线条
                context.lineTo(Math.random() * 120, Math.random() * 40);//添加一个新点，然后在画布中创建从该点到最后指定点的线条
                context.strokeStyle=this.getColor();//随机线条颜色
                context.stroke();//  绘制已定义的路径
            }
            // 绘制干扰点，和上述步骤一样，此处用长度为1的线代替点
            for (var i = 0; i < 20; i++) {
                context.beginPath();
                var x = Math.random() * 120;
                var y = Math.random() * 40;
                context.moveTo(x, y);
                context.lineTo(x + 1, y + 1);
                context.strokeStyle=this.getColor();
                context.stroke();
            }
// var num2=this.num
//             //点击按钮验证
//             button.onclick = function () { 
//             var text = input.value //获取输入框的值
//             if (text === num2) {
//                 alert('验证通过')
//             } else {
//                 alert('验证失败')
//             }
 //        }
        })    
        },

    registerUser(){
      this.$refs.form.validate(valid => {
        console.log(valid)
        if (valid) {
             user.registerUser(this.form)
      
      .then(response=>{
        //console.log("get~"+response.data.user+this.user+this.userlist)
        this.$message({
          type:'success',
          massage:'修改成功!'
        })
      })
      this.$router.replace({ path:  '/login'  })
        } else {
          console.log('error submit!!')
          return false
        }
      })
      
    },
    onCancel() {
      this.$router.replace({ path:  '/login'  })
      this.$message({
        message: '已取消注册',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.divIdentifyingCode {
 position: absolute;
 top: 0;
 right: 0;
 z-index: 5;
 width: 102px; /*设置图片显示的宽*/
 height: 40px; /*图片显示的高*/
 background: #e2e2e2;
 margin: 0;
 }
 .button {
    background-color: #29b4cc;
    border: none;
    color: white;
    
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    cursor: pointer;
}

.code{
    width:120px
  
}
 
canvas{
  vertical-align: bottom;
}

</style>

