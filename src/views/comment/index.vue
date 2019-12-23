<template>
  <el-card v-loading="loading">
      <breadcrumb slot="header">
      <template slot="title">历史漫游</template>
      </breadcrumb>
       <el-table :data="list">
        <!-- 放置列组件 -->
        <el-table-column prop="title" width="600" label="标题"></el-table-column>
        <el-table-column :formatter="formatter" prop="comment_status" label="评论状态"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="操作">
                <!-- 作用域插槽 -->
                <!-- {{obj.row}} obj.row.comment_status 得到布尔值 => 通过 slot-scoped 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据-->
                <!-- 下面的三元表达式实现了如果状态是true时显示关闭评论 否则打开评论 -->
            <template slot-scope="obj">
                <el-button type="text" size="small">修改</el-button>
                <el-button type="text" size="small" @click="changeStatus(obj.row)">{{obj.row.comment_status ? '关闭' : '打开'}}评论</el-button>
                <!-- 修改评论状态 需要先获取到状态 然后进行更改 -->
            </template>
        </el-table-column>
    </el-table>
   <el-row type="flex" justify="center" align="middle" style="height:60px">
        <el-pagination
        background
        layout="prev, pager, next"
        :current-page="page.currentPage"
        :total="page.total"
        :page-size="page.pageSize"
        @current-change="changePage"
        >
</el-pagination>
   </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      loading: false,
      page: {
        total: 0, // 总条数
        currentPage: 1, // 当前页
        pageSize: 10// 每页条数
      }
    }
  },
  methods: {
    changePage (newPage) {
    //   alert(newPage)
      // currentPage 改变时会触发 把newpage给当前页
      this.page.currentPage = newPage
      this.getCommend()
    },
    getCommend () { // 获取评论
      this.loading = true
      this.$http({
        url: '/articles',
        methods: 'get',
        // 请求回来的数据双向绑定渲染
        params: { response_type: 'comment', per_page: this.page.pageSize, page: this.page.currentPage }
        // params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(res => { // 响应数据赋值
        this.list = res.data.results
        this.page.total = res.data.total_count
        this.loading = false
      })
    },
    formatter (row, cloumn, cellValue, index) {
      // 由于 table不能处理布尔值 所以用到el-table里的格式化属性处理
      return cellValue ? '正常' : '关闭'
    },
    changeStatus (row) {
      // 点击修改状态 根据携带的数据 发送请求
      let mes = row.comment_status ? '关闭' : '打开'
      this.$confirm(`确定要${mes}评论嘛？`).then(() => {
        this.$http({
          url: '/comments/status',
          method: 'put', // 请求方式
          params: {// query参数
            article_id: row.id.toString()// row.id是对象
          },
          data: {// data参数
            // 是否允许评论 => 取决于状态
            allow_comment: !row.comment_status
          }
        }).then(res => {
          // 重新拉取数据
          this.getCommend()
        })
      })
    }
  },
  created () {
    this.getCommend()
  }

}
</script>

<style>

</style>
