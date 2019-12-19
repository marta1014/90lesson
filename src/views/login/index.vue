<template>
  <div class="login">
    <el-card class="login-card">
      <div class="title"><img src="../../assets/img/logo_index.png" alt=""></div>
      <el-form :model=formLogin :rules="rules" ref="myLogin">
        <el-form-item prop="personID">
          <el-input placsholder="请输入号码" v-model="formLogin.personID"></el-input>
        </el-form-item>
        <el-form-item prop="verify">
          <el-input placsholder="请输入验证码" style="width:65%" v-model="formLogin.verify"></el-input><el-button plain style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="formLogin.agree">同意相关条款以及协议</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="sbmLogin">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 绑定表单数据对象
      formLogin: {
        personID: '',
        verify: '',
        agree: ''
      },
      rules: {
        personID: [{ required: true, message: '请输入正确号码' }, { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请正确输入身份证号' }],
        verify: [ { required: true, message: '请输入正确验证码号码' }, { pattern: /^\d{6}$/, message: '格式为6位数字' } ],
        // 是否勾选协议规则 使用一个自定义校验函数
        agree: [{ validator: function (rules, value, callback) {
          // if (value) { // 勾选
          //   callback()// 当前校验通过
          // } else {
          //   callback(new Error('请确认勾选条款'))
          //   // new Error 实例化了一个错误对象并传出 里面输入提示msg
          // }
          value ? callback() : callback(new Error('您必须同意才能登陆'))
        } }]
      }
    }
  },
  methods: {
    sbmLogin () {
      // 点击登陆 激活手动校验
      // 获取到当前dom实例 使用校验整个表单 validate方法
      this.$refs.myLogin.validate(function (isOK) {
        if (isOK) {
          console.log('OK')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  background-image: url('../../assets/img/background.jpg');
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 400px;
    height: 360px;
    opacity: .7;
    .title {
      margin-bottom: 30px;
      text-align: center;
      img {
        height: 30px;
      }
    }
  }
}

</style>
