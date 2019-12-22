<template>
  <el-breadcrumb separator=">">
      <el-breadcrumb-item to="/home">下载管理</el-breadcrumb-item>
      <el-breadcrumb-item><slot name="title"></slot></el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>
