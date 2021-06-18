<template>
  <div class="app-container">
    <el-form
      ref="form"
      :model="form"
      status-icon
      :rules="rules"
      label-width="120px"
      target="iframe"
      method="POST"
      action="http://localhost:80/upload"
      enctype="multipart/form-data"
    >
      <el-form-item label="姓名" prop="salerName">
        <el-input v-model="form.salerName" />
      </el-form-item>
      <el-form-item label="手机号" prop="salerPhone">
        <el-input v-model="form.salerPhone" />
      </el-form-item>

      <el-form-item label="性别" prop="salerSex">
        <el-radio-group v-model="form.salerSex">
          <el-radio label="男" value="男" />
          <el-radio label="女" value="女" />
        </el-radio-group>
        <!-- <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type"/>
          <el-checkbox label="Promotion activities" name="type"/>
          <el-checkbox label="Offline activities" name="type"/>
          <el-checkbox label="Simple brand exposure" name="type"/>
        </el-checkbox-group> -->
      </el-form-item>
      <el-form-item label="身份证" prop="salerIdnumber">
        <!-- <el-input v-model="form.salerIdentity"/> -->
        <!-- <form method="POST" action="http://localhost:80/upload" enctype="multipart/form-data"> -->
        <input type="file" name="file1" required />
      </el-form-item>
      <el-form-item label="银行账号" prop="salerBank">
        <el-input v-model="form.salerBank" />
      </el-form-item>
      <el-form-item label="营业执照" prop="salerIdentity">
        <!-- <el-input v-model="form.salerIdentity"/> -->
        <!-- <form method="POST" action="http://localhost:80/upload" enctype="multipart/form-data"> -->
        <input type="file" name="file" required />
        <!-- <input type="submit" value="Submit" /> -->

        <!-- </form> -->

        <!-- <el-upload
  class="upload-demo"
  method="POST"
  action="http://localhost:80/upload"
  enctype="multipart/form-data"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload> -->
      </el-form-item>
      <el-form-item label="密码" prop="salerPsd">
        <el-input v-model="form.salerPsd" />
      </el-form-item>
      <el-form-item>
        <button
          class="el-button el-button--default"
          style="background-color: #00ccff"
          :disabled="saveBtnDisabled"
          type="submit"
          @click="registerSaler"
        >
          Register
        </button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>

    <iframe id="frame" name="iframe" style="display: none"></iframe>
  </div>
</template>

<script>
import saler from "@/api/manage/saler";
export default {
  data() {
    var isMobileNumber = (rule, value, callback) => {
      if (!value) {
        return new Error("请输入电话号码");
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        const isPhone = reg.test(value);
        value = Number(value); //转换为数字
        if (typeof value === "number" && !isNaN(value)) {
          //判断是否为数字
          value = value.toString(); //转换成字符串
          if (value.length < 0 || value.length > 12 || !isPhone) {
            //判断是否为11位手机号
            callback(new Error("手机号码格式如:138xxxx8754"));
          } else {
            callback();
          }
        } else {
          callback(new Error("请输入电话号码"));
        }
      }
    };
    return {
      // targetAction: '',

      fileList: [],
      rules: {
        salerPhone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: isMobileNumber, trigger: "blur" },
        ],
        salerName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        salerBank: [
          { required: true, message: "请输入银行卡账号", trigger: "blur" },
        ],
        salerPsd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        salerSex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        // salerIdentity: [
        //   { required: true, message: "请上传营业执照" ,trigger: "blur" },
        // ]
      },
      form: {
        salerName: "",
        salerPhone: "",
        salerSex: "",
        salerBank: "",
        salerIdentity: "",
        salerIdnumber: "",
        salerPsd: "",
      },
      saveBtnDisabled: false,
    };
  },
  created() {
    //     let baseUrl = process.env.NODE_ENV === 'production'?'':'/apiurl';
    // this.targetAction =  `${window.location.origin}/api/configurationController/loadConfig`
    //     // 这里的window.location.origin 即 http://localhost:8020
  },

  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },

    registerSaler() {
      this.$refs.form.validate((valid) => {
        console.log(valid);
        if (valid) {
          // console.log(this.form.salerSex)
          saler
            .registerSaler(this.form)

            .then((response) => {
              //console.log("get~"+response.data.user+this.user+this.userlist)
              this.$message({
                type: "success",
                massage: "修改成功!",
              });
            });
          this.$router.replace({ path: "/login" });
        }
      });
    },
    onCancel() {
      this.$router.replace({ path: "/login" });
      this.$message({
        message: "已取消注册",
        type: "warning",
      });
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

