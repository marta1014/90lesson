<template>
  <div class="login">
    <el-card class="login-card">
      <div class="title"><img src="../../assets/img/logo_index.png" alt=""></div>
      <el-form>
        <el-form-item>
          <el-input placsholder="请输入号码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placsholder="请输入验证码" style="width:65%"></el-input><el-button plain style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">同意相关条款以及协议</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {

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
