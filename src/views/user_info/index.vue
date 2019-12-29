<template>
  <el-card v-loading="loading">
      <breadcrumb slot="header">
      <template slot="title">账户信息</template>
      </breadcrumb>
      <el-form style="" label-width="100px" class="msgUser" :rules="rules" :model="formData" ref="myForm">
          <!-- label-width 可使一行显示 -->
          <el-form-item label="用户名"  prop="name">
              <!-- 双向绑定 -->
              <el-input style="width:30%" v-model=formData.name></el-input>
          </el-form-item>
          <el-form-item label="简介" prop="intro">
              <el-input style="width:30%" type="textarea" :rows="5" v-model="formData.intro"></el-input>
          </el-form-item>
          <el-form-item label="手机号" >
              <el-input style="width:30%" disabled v-model="formData.mobile"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
              <el-input style="width:30%" v-model="formData.email"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="confirm">保存</el-button>
          </el-form-item>
      </el-form>
      <el-upload :show-file-list="false" action="" class="userPic" :http-request="upload">
          <img :src="formData.photo ? formData.photo: defaultImg" alt="">
      </el-upload>
  </el-card>
</template>

<script>
export default {
  // 校验三要素 :model prop rules
  data () {
    return {
      loading: false,
      defaultImg: require('../../assets/img/Apple_Music_logo_black.png'), // 图片缺失补充图
      formData: {// 接收请求的数据
        name: '',
        intro: '',
        email: '',
        mobile: ''
      },
      rules: {
        name: [{ required: true, message: '此处必填' }, { min: 2, max: 12, message: '大于5为且小于22位' }],
        intro: [{ required: true, message: '你至少应该说点啥' }, { max: 200, message: '长度不应多于2000自负' }],
        email: [{ required: true, message: '此处为必填项' }]
        // email: [{ required: true, message: '此处为必填项' }, { pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$ / }]
      }
    }
  },
  methods: {
    getUser () { // 获取信息
      this.$http({
        url: '/user/profile',
        method: 'get'
      }).then(res => {
        console.log(res)
        this.formData = res.data
      })
    },
    confirm () { // 手动校验表单
      this.$refs.myForm.validate(isOk => {
        if (isOk) {
          this.$http({
            url: '/user/profile',
            method: 'patch',
            data: this.formData
          }).then(res => {
            // 提示信息成功
            this.$message({
              type: 'success',
              message: '成功修改'
            })
          })
        }
      })
    },
    upload (params) { // 编辑用户头像
      let data = new FormData()
      data.append('photo', params.file)
      this.loading = true
      this.$http({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(res => {
        this.loading = false
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        this.formData.photo = res.data.photo
      })
    }
  },
  created () {
    this.getUser()
  }

}
</script>

<style lang="less" scoped>
.userPic {
     position: absolute;
     top: 200px;
     right: 300px;
     width: 200px;
     height: 200px;
    img{
    width: 100%;
    }
}
</style>
