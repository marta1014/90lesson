<template>
  <el-card v-loading="loading">
    <breadcrumb slot="header">
      <template slot="title">素材管理</template>
    </breadcrumb>
    <!-- 上传组件 -->
    <el-row type="flex" justify="end">
      <el-upload action :http-request="uploadImg" :show-file-list="false">
        <el-button type="primary" size="small">上传</el-button>
      </el-upload>
    </el-row>
    <el-tabs v-model="activeName" @tab-click="toOther">
      <el-tab-pane label="全部" name="all">
        <!-- 生成数据 -->
        <div class="imgClass">
          <el-card v-for="(item,index) of list" :key="item.id" class="img-card">
            <img :src="item.url" alt @click="openDialog(index)" />
            <el-row class="pos" type="flex" justify="space-around" align="middle">
              <i
                @click="collectOrCancel(item)"
                :style="{color:item.is_collected ? 'red' : '#000'}"
                class="el-icon-sunrise"
                ref="state"
              ></i>
              <i class="el-icon-delete" @click="delItem(item.id)"></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏" name="collect">
        <div class="imgClass">
          <el-card v-for="item of list" :key="item.id" class="img-card">
            <img :src="item.url" alt />
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 公共分页组件 -->
    <el-row type="flex" justify="center">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="page.pageSize"
        :current-page="page.currentPage"
        :total="page.total"
        @current-change="changePage"
      ></el-pagination>
    </el-row>
    <el-dialog :visible="visibleDialog" @opened="openEnd" @close="visibleDialog = false">
      <el-carousel :interval="5000" arrow="always" ref="myCarousel">
        <el-carousel-item  v-for="(item,index) in list" :key="index">
          <img :src="item.url" alt style="width:100%;height:100%;" />
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      page: {
        pageSize: 8, // 每页显示个数
        total: 0, // 总条目
        currentPage: 1 // 当前页
      },
      loading: false,
      visibleDialog: false, // 默认弹层隐藏
      list: [],
      activeName: 'all', // 默认选中
      clickIndex: -1// 设置变量1 在下边完成传递（openDialog）在openend中使用
    }
  },
  methods: {
    openDialog (index) {
      this.visibleDialog = true
      this.clickIndex = index
    },
    openEnd () {
      this.$refs.myCarousel.setActiveItem(this.clickIndex)
      // opened是dialog打开动画结束时的回调
      // 获取到走马灯 通过走马灯的这个手动切换幻灯片方法 利用index
      // 实现了点击 至目标图片
    },
    changePage (newpage) { // 改变页码
      this.page.currentPage = newpage
      this.getMaterial()
      console.log(this.page.total)
    },
    collectOrCancel (item) { // 是否收藏
      this.$http({
        url: `/user/images/${item.id}`,
        method: 'put',
        data: {
          collect: !item.is_collected// 点击时传递不同的结果发送请求
        }
      }).then(res => {
        this.getMaterial()
      })
    },
    // 删除项目
    delItem (id) {
      this.$confirm('确定').then(res => {
        this.$http({
          url: `/user/images/${id}`,
          method: 'delete'
        }).then(res => {
          console.log(res)
          this.getMaterial()
        })
      })
    },
    getMaterial () {
      // 获取素材
      this.$http({
        url: '/user/images',
        params: {
          per_page: this.page.pageSize,
          page: this.page.currentPage,
          collect: this.activeName === 'collect'
          // true false 代表是否收藏 这句话神奇的简化了代码 实现了两个功能的
        }
      }).then(res => {
        // console.log(res)
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    },
    // 切换tab
    toOther () {
      this.page.currentPage = 1 // 重置回第一页
      this.getMaterial()
    },
    // 上传图片
    uploadImg (params) {
      console.log(params)
      this.loading = true
      let data = new FormData()
      data.append('image', params.file)
      this.$http({
        url: '/user/images',
        method: 'post',
        data
      }).then(res => {
        this.loading = false
        this.getMaterial()
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.imgClass {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .img-card {
    width: 200px;
    height: 230px;
    margin: 20px 20px;
    position: relative;
    img {
      width: 100%;
    }
    .pos {
      position: absolute;
      width: 100%;
      font-size: 20px;
      left: 0;
      bottom: 0;
      height: 40px;
      background-color: #f4f5f6;
    }
  }
}
</style>
