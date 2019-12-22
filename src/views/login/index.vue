<template>
  <div class="login">
    <el-card class="login-card">
      <div class="title"><img src="../../assets/img/logo_index.png" alt=""></div>
      <el-form :model=formLogin :rules="rules" ref="myLogin">
        <el-form-item prop="mobile">
          <el-input placsholder="请输入号码" v-model="formLogin.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input placsholder="请输入验证码" style="width:65%" v-model="formLogin.code"></el-input><el-button plain style="float:right">发送验证码</el-button>
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
        mobile: '13911111111',
        code: '246810',
        agree: ''
      },
      rules: {
        mobile: [{ required: true, message: '请输入正确号码' }, { pattern: /^1[3456789]\d{9}$/, message: '请正确输入身份证号' }],
        code: [ { required: true, message: '请输入正确验证码号码' }, { pattern: /^\d{6}$/, message: '格式为6位数字' } ],
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
      this.$refs.myLogin.validate(isOK => {
        if (isOK) {
          // 验证通过 发送请求 成功结果中的token令牌保存至本地localStorage
          this.$http.post('authorizations', this.formLogin).then(res => {
            // console.log(res.data.data.token)
            window.localStorage.setItem('user-token', res.data.token)
            // 实现跳转 编程式导航
            this.$router.push('/home')
          }).catch(res => {
            // 输入错误提示信息 该方法来自ele
            this.$message({
              message: '输入错误请重新输入',
              type: 'warning'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  background-image: url('../../assets/img/sea.jpg');
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
