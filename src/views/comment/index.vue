<template>
  <el-card>
      <breadcrumb slot="header">
      <template slot="title">历史漫游</template>
      </breadcrumb>
       <el-table>
        <!-- 放置列组件 -->
        <el-table-column width="600" label="标题"></el-table-column>
        <el-table-column label="评论状态"></el-table-column>
        <el-table-column label="总评论数"></el-table-column>
        <el-table-column label="粉丝评论数"></el-table-column>
        <el-table-column label="操作"></el-table-column>

    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  }

}
</script>

<style>

</style>
