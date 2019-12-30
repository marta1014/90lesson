<template>
  <el-row type="flex" justify="space-between" class="header">
    <el-col :span="18" class="left">
      <!-- 绑定class对象 实现图标点击切换 -->
      <i :class="{ 'el-icon-s-unfold' : !spread,'el-icon-s-fold' : spread }" @click="spreadOk"></i>
    </el-col>
    <el-col :span="6" class="right">
      <el-row justify="end" type="flex" align="middle">
        <!-- <img :src="userInfo.photo" alt /> -->
        <img :src="userInfo.photo ? userInfo.photo : defaultImg" alt />
          <!-- img固定地址的话 代码会被编译成base64字符串 此时可以预览 -->
          <!-- 若是动态变量 相对地址无法显示 -->
          <!-- 如果想用 需把图片转换成一个变量 -->
          <!-- 详见40行 defaultImg-->
        <el-dropdown @command="commands" style="">
          <!-- 此处用到了指令事件 -->
          <span class="el-dropdown-link">
            {{userInfo.name}}
            <!-- 插值表达式把请求回来的数据渲染至页面 -->
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="user">
              <el-popover placement="left" width="400" trigger="hover">
                <el-table :data="gridData">
                  <el-table-column width="120" property="date" label="日期"></el-table-column>
                  <el-table-column width="120" property="name" label="姓名"></el-table-column>
                  <el-table-column width="300" property="address" label="描述"></el-table-column>
                </el-table>
                <el-button slot="reference" style="border:none">周思涵</el-button>
              </el-popover>
            </el-dropdown-item>
            <el-dropdown-item command="weibo" style="text-align:center">微博</el-dropdown-item>
            <el-dropdown-item command="leave" style="text-align:center">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import eventBus from '../../utils/eventbus'
export default {
  data () {
    return {
      // 定义一个对象 接收请求回来的数据
      userInfo: {
        name: '',
        photo: ''
      },
      gridData: [{
        date: '2017-05-02',
        name: '感谢你曾来过',
        address: '发行和Ayo97合唱单曲'
      }, {
        date: '2019-01-30',
        name: '失眠',
        address: '创作词曲并制作发行'
      }, {
        date: '2016-05-01',
        name: '洒脱',
        address: '你走的时候别带走'
      }, {
        date: '2016-05-03',
        name: '备爱',
        address: '慢慢忘记从前'
      }],
      defaultImg: require('../../assets/img/avatar.jpg'),
      // 需要一个默认值 在没有头像的情况下给一个图片
      spread: true// 定义默认展开状态
    }
  },
  created () {
    // 页面创建完毕 请求数据 通过携带之前存储在本地的token令牌
    // let token = window.localStorage.getItem('user-token')
    // this.$http({
    //   url: '/user/profile'
    // headers: {
    //   // bearer 持有传递 姓名持有人
    //   Authorization: `Bearer ${token}`
    // }
    // }).then(res => {
    // console.log(res, res.data)
    // this.userInfo = res.data
    // console.log(this.userInfo)
    // })
    this.getUserInfo()
    eventBus.$on('sucPic', () => { // 监听数据变化作出反应
      this.getUserInfo()
    })
  },
  methods: {
    getUserInfo () { // 获取用户信息
      this.$http({
        url: '/user/profile'
      }).then(res => {
        this.userInfo = res.data
      })
    },
    spreadOk () { // 触发折叠
      // 展开或者折叠
      this.spread = !this.spread
      eventBus.$emit('changeStatus')
    },
    // 头部下拉菜单的指令事件
    commands (command) {
      if (command === 'user') {
      } else if (command === 'weibo') {
        window.location.href =
          'https://baike.baidu.com/item/%E9%98%BF%E6%B6%B5/23563743'
      } else {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.header {
  height: 40px;
  padding-top: 14px;
  .left {
    span {
      margin-left: 10px;
      font-size: 20px;
    }
    i {
      font-size: 30px;
    }
  }
  .right {
    img {
      width: 30px;
      margin-right: 6px;
      border-radius: 50%;
    }
  }
}
</style>
