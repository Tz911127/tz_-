<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <!-- @change="change" -->
    <el-checkbox v-model="checked"  class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
import { requestLogin } from "../api/api";
//import NProgress from 'nprogress'
export default {
  data() {
    return {
      logining: false,
      ruleForm2: {
        account: "admin",
        checkPass: "123456"
      },
      rules2: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" }
          //{ validator: validaePass }
        ],
        checkPass: [
          { required: true, message: "请输入密码", trigger: "blur" }
          //{ validator: validaePass2 }
        ]
      },
      checked: true
    };
  },
  methods: {
    handleReset2() {
      this.$refs.ruleForm2.resetFields();
    },
    handleSubmit2(ev) {
      var _this = this;
      if (_this.checked == true) {
        window.localStorage.setItem("userName", _this.ruleForm2.account);
        window.localStorage.setItem("userPwd", _this.ruleForm2.checkPass);
      } else {
        _this.clearCookie();
      }

      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          this.logining = true;
          var loginParams = {
            userLoginname: this.ruleForm2.account,
            userPassword: this.ruleForm2.checkPass
          };
          window.localStorage.setItem("token", null);
          requestLogin(loginParams).then(token => {
            this.logining = false;
            let { msg, status, data } = token;
            this.$store.commit("TOKEN", data.data);
            if (status !== 200) {
              this.$message({
                message: msg,
                type: "error"
              });
            } else {
              window.localStorage.setItem("token", JSON.stringify(data.data));
              this.$router.push({ path: "/state" });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date();
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
      document.cookie =
        "userName=" + c_name + ";path=/;expires=" + exdate.toLocaleString();
      document.cookie =
        "userPwd=" + c_pwd + ";path=/;expires=" + exdate.toLocaleString();
    },
    getCookie(userName) {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; ");
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("=");
          if (arr2[0] == "userName") {
            this.account = arr2[1];
          } else if (arr2[0] == "userPwd") {
            this.checkPass = arr2[1];
          }
        }
      }
    },
    clearCookie: function() {
      this.setCookie("", "", -1);
    },
    change() {
      if (this.checked == true) {
        this.ruleForm2.account = window.localStorage.getItem("userName");
        this.ruleForm2.checkPass = window.localStorage.getItem("userPwd");
      } else {
        this.ruleForm2.account = "";
        this.ruleForm2.checkPass = "";
      }
    }
  },
  mounted() {
    this.getCookie();
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>