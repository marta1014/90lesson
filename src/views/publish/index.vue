<template>
  <el-card v-loading="loading">
    <breadcrumb slot="header">
      <template slot="title">发布作品</template>
    </breadcrumb>
    <el-card>
      <el-form :model="formData" :rules="rules" ref="formDataPublish">
        <el-form-item label="标题" prop="title">
          <el-input style="width:60%" v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <quill-editor type="textarea"
          style="height:300px; margin:90px 0"

          v-model="formData.content"
          ></quill-editor>
        </el-form-item>
        <el-form-item label="封面" prop="cover">
          <el-radio-group v-model="formData.cover.type" @change="changeType">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- {{formData.cover}} -->
        </el-form-item>
        <!-- 封面组件 -->
        <!-- 父传子三部曲 在子标签上写属性 传递数据 => 子组件用属性名接收 => 在子组件上渲染-->
        <cover-image :list="formData.cover.images" @selectTwo="reciveTwo"></cover-image>
        <el-form-item label="频道" prop="channel_id">
          <el-select v-model=formData.channel_id>
            <el-option v-for="item in channels"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label>
          <el-button @click="formRules(false)">发表</el-button>
          <el-button @click="formRules(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      channels: [], // 定义channels 接收获取的数据
      formData: {// 定义
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channels_id: null
      },
      rules: {
        // 校验规则制定（自动）
        title: [{ required: true, message: '标题不能为空' }, { min: 5, message: '不能小于5个字符' }, { max: 30, message: '不能超过22个自负' }],
        content: [{ required: true, message: '内容不能为空' }],
        channel_id: [{ required: true, message: '频道不能为空' }]
      }
    }
  },
  methods: {
    reciveTwo (url, index) { // 第二次传递接收到的url,以及index
    // 响应式更新
      // this.formData.cover.images = this.formData.cover.images.map(function (item, i) {
      //   if (index === i) {
      //     // 如果index等于i说明找到了要替换的地址
      //     return url
      //   } else {
      //     return item // 没找到返回元数据
      //   }
      // })上边的简写
      this.formData.cover.images = this.formData.cover.images.map((item, i) => index === i ? url : item)
    },
    getChannels () { // 获取频道
      this.$http({
        url: '/channels'
      }).then(res => {
        // console.log(res)
        this.channels = res.data.channels
      })
    },
    formRules (draft) { // 发布文章是调用的方法 验证表单
    // 通过传递的参数实现两个方法 发布/存入草稿
      this.$refs.formDataPublish.validate(isOk => {
        if (isOk) {
          // console.log('通过')
          // 判断是否有id
          let { id } = this.$route.params
          this.$http({
            method: id ? 'put' : 'post',
            url: id ? `articles/${id}` : '/articles',
            params: {
              draft// query参数
            },
            data: this.formData// 携带参数
          }).then(res => {
            this.$message({// 提示消息
              type: 'success',
              message: '保存成功'
            })
            this.$router.push('/home/a')// 跳转至页面
          })
          // if (id) {
          //   this.$http({
          //     url: `/articles/${id}`,
          //     method: 'put',
          //     params: {
          //       draft// query参数
          //     },
          //     data: this.formData// 携带参数
          //   }).then(res => {
          // this.$router.push('/home/a')// 跳转至页面
          //   })
          // } else {
          // this.$http({// 调用发布接口
          //   url: '/articles',
          //   method: 'post',
          //   params: {
          //     draft// query参数
          //   },
          //   data: this.formData// 携带参数
          // }).then(res => {
          //   this.$message({// 提示消息
          //     type: 'success',
          //     message: '保存成功'
          //   })
          //   this.$router.push('/home/a')// 跳转至页面
          // })
          // }
        }
      })
    },
    getSomeById (id) { // 通过id来获取数据
      this.loading = true
      this.$http({
        url: `/articles/${id}`
      }).then(res => {
        this.loading = false
        this.formData = res.data
      })
    },
    changeType () {
      // alert(this.formData.cover.type)
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        this.formData.cover.images = []// 无图或者自动
      } else if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']// 单图
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']// 三图
      }
    }
  },
  watch: {// 监听$route
  // 此处因为在点击修改页面后 添加数据后 然后点击发布文章的router时内容还在
  // 解决两个地址对应同个组件跳转时组件不销毁 数据内容无法重置
    $route: function (to, form) {
      console.log(to)
      if (to.params.id) {
        // 有id证明是修改
      } else {
        // 是发布时要将内容清空
        this.formData = {// 此处为默认值
          title: '',
          content: '',
          cover: {
            type: 0,
            images: []
          },
          channels_id: null
        }
      }
    }
  //   'formData.cover.type': function () { // 通过watch 监听type变化
  //     // alert(this.formData.cover.type)
  //     if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
  //       this.formData.cover.images = []// 无图或者自动
  //     } else if (this.formData.cover.type === 1) {
  //       this.formData.cover.images = ['']// 单图
  //     } else if (this.formData.cover.type === 3) {
  //       this.formData.cover.images = ['', '', '']// 三图
  //     }
  //   }
  },
  created () {
    this.getChannels()
    let { id } = this.$route.params// 获取动态路由参数
    id && this.getSomeById(id)// 只有携带id的情况下才可以调用此方法
  }
}
</script>

<style>
</style>
