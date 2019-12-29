<template>
  <el-tabs v-model="activeName" v-loading="loading">
    <el-tab-pane label="素材库" name="material">
        <div class="select-image">
            <el-card class="card-image" v-for="item of list" :key="item.id">
                <!-- {{item.url}} -->
                <img :src="item.url" alt="" @click="clickImg(item.url)">
            </el-card>
        </div>

    </el-tab-pane>
    <el-tab-pane label="上传图片" name="upload">
        <el-upload class="uploadImg" action="" :show-file-list="false" :http-request="upload">
            <i class="el-icon-plus"></i>
        </el-upload>
    </el-tab-pane>
           <el-row type="flex" justify="center" style="height:40px">
  <el-pagination
  background
  layout="prev, pager, next"
  :total="page.total"
  :current-page="page.currentPage"
  :page-size="page.pageSize"
  @current-change="changePage"
  >
</el-pagination>
 </el-row>
  </el-tabs>

</template>

<script>
export default {
  data () {
    return {
      loading: false,
      activeName: 'material',
      list: [],
      page: {
        pageSize: 9,
        total: 0,
        currentPage: 1
      }
    }
  },
  methods: {
    clickImg (url) {
      // 点击图片 要把图片显示给封面 子传父 自定义时事件
      this.$emit('selectImg', url)
    },
    getImg () { // 获取图片
      this.$http({
        url: '/user/images',
        params: { collect: false, page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    },
    changePage (newPage) { // 页码改变
      this.page.currentPage = newPage
      this.getImg()
    },
    upload (params) { // 上传组件
      this.loading = true
      let data = new FormData()
      data.append('image', params.file)
      this.$http({
        url: '/user/images',
        method: 'post',
        data
      }).then(res => {
        this.$emit('selectImg', res.data.url)// 把图片传给封面（父组件）
        this.loading = false
      })
    }
  },
  created () {
    this.getImg()
  }
}
</script>

<style lang="less" scoped>
.select-image{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .card-image{
        width: 100px;
        height: 100px;
        margin: 20px 0;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
.uploadImg{
    display: flex;
    justify-content: center;
    i{
        font-size: 50px;
        padding: 50px;
        border-radius: 10px;
        border: 1px dashed #ccc;
    }
}
</style>
