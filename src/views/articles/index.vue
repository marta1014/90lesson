<template>
<!-- 步骤
新建内容页面并挂载路由
结构 => 条件搜索筛选栏区域 => 主体
文章数据请求
******搜索筛选 两种方法：1 单组件注册事件  2  通过watch对象的方法（深度监测）******
******分页请求********
删除内容
本页难点就在于条件改变时要获取照顾到每一个项（状态，频道，时间）
 -->
  <el-card>
    <!-- 面包屑组件 -->
    <breadcrumb slot="header">
      <template slot="title">文章管理</template>
    </breadcrumb>
    <!-- 文章状态 -->
    <el-form class="articles">
      <el-form-item label="文章状态 :">
        <el-radio-group v-model="searchForm.status">
        <!-- <el-radio-group v-model="searchForm.status" @change="changeRadio"> -->
            <!-- 两种筛选条件 第一种是给每个组件注册监听change事件 第二种是直接（深度监听对象方式）watch-->
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">已审核</el-radio>
          <el-radio :label="3">审核通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 频道列表 -->
      <el-form-item label="频道列表 :">
        <el-select placeholder="请选择" v-model="searchForm.channel_id" >
        <!-- <el-select placeholder="请选择" v-model="searchForm.channel_id" @change="changeRadio"> -->
          <el-option
            v-for="item in channels"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 时间选择器 -->
      <el-form-item label="时间选择 :">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="searchForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
      </el-form-item>
        <el-row class="total">
        <span>根据条件共搜索到{{page.total}}条相关内容</span>
    </el-row>
    </el-form>
    <div class="item" v-for="item of list" :key="item.id.toString()">
        <!-- 大数字的问题 此时显示的是bignummber类型 -->
        <div class="left">
            <img :src="item.cover.images.length ? item.cover.images[0] :defaultImg" alt="">
            <!-- 针对无图的处理 -->
            <div class="info">
                <span>{{item.title}}</span>
                <el-tag class="info-tag" :type='item.status | filterType'>{{item.status | filterStatus}}</el-tag>
                <!-- 通过该状态 利用过滤器 实现样式的体现 -->
                <span class="date">{{item.pubdate}}</span>
            </div>
        </div>
        <div class="right">
            <span>
                <i class="el-icon-edit"></i>修改
                </span>
            <span @click="delItem(item.id)">
                <i class="el-icon-delete"></i>删除
            </span>
        </div>
    </div>
    <el-row type="flex" justify="center">
        <el-pagination
        background
        layout="prev, pager, next"
        :page-size="page.pageSize"
        :current-page="page.currentPage"
        :total="page.total"
        @current-change="changePage">
</el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        status: 5, // 没法给null 默认全部
        channel_id: null, // 默认不选中任何分类频道
        dateRange: [] // 时间范围
      },
      channels: [], // 接收频道数据
      list: [],
      defaultImg: require('../../assets/img/avatar.jpg'), // 解决无图
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      }

    }
  },
  methods: {
    getChannel () { // 请求频道列表
      this.$http({
        url: 'channels'
      }).then(res => {
        // console.log(res)
        this.channels = res.data.channels
      })
    },
    getArticles (params) { // 请求文章列表
      this.$http({
        url: '/articles',
        params// 此处本不需传参 改造为了下边使用
      }).then(res => {
        console.log(res)
        this.list = res.data.results// 大数字的问题
        this.page.total = res.data.total_count
      })
    },
    getMore () {
      // 组装参数用来发送请求  监听文章状态 频道列表 时间筛选 无论时以上那个值变化 都要“照顾”到
      let params = {
        page: this.page.currentPage,
        per_page: this.page.pageSize,
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        // 5是自己定义的标识 后台没有该值 所以要通过三元判断 等于5时为null 间接跳过该值
        channel_id: this.searchForm.channel_id,
        begin_pubdate: this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null, // 开始时间
        // 时间范围的长度
        end_pubdate: this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null // 截止时间
      }
      this.getArticles(params)
    },
    changeRadio () { // 改变条件
      this.page.currentPage = 1 // 强制将页码重置第一页
      this.getMore()
    //  条件改变时 => 设置最新页码 => 收集原来的条件参数 => 组合 =>查询
    },
    changePage (newPage) { // 改变页码
      this.page.currentPage = newPage
      this.getMore()
      // 页码改变时 => 设置最新页码 => 收集原来的条件参数 => 组合 =>查询
    },
    delItem (id) { // 删除 只能删除草稿
      this.$http({
        url: `/articles/${id.toString()}`,
        method: 'delete'
      }).then(res => {
        this.$confirm('确定删除？').then(res => { // 成功后提示消息 然后
          // 提示
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          //   this.getArticles()
          this.changeRadio()// 拉取数据
        })
      })
    }
  },
  filters: {
    filterStatus (vla) { // 文章状态处理
      switch (vla) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    filterType (vla) { // 状态图标样式处理
      switch (vla) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  // 第二种处理筛选的方法 利用监听对象的方法
  watch: {
    searchForm: {
      handler: function () { // 触发函数 handler是固定写法 默认对象中任何的变化都会触发
        // this.changeRadio()
        this.getMore()
      },
      deep: true// 深度检测 无论嵌套多少层都能监听到改变
    }
  },
  created () {
    this.getChannel()
    this.getArticles({ page: 1, per_page: 10 })
  }
}
</script>

<style lang="less" scoped>
    .articles {
        .total{
            height: 50px;
            border-bottom: 1px dashed #666;
        }
    }
    .item{
        padding-top: 20px;
        display: flex;
        justify-content: space-between;
        .left{
            display: flex;
            img{
                width: 120px;
                height: 120px;
            }
            .info{
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                margin-left: 20px;
                .info-tag{
                    text-align: center;
                    width: 60px;
                }
                .date{
                    color:#999;
                }
            }
        }
        .right{
            font-size: 12px;
            span {
                margin-right: 20px;
                cursor: pointer;
            }
        }
    }
</style>
