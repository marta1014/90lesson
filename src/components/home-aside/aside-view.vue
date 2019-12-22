<template>
  <div>
      <div class="title"><img src="../../assets/img/Apple_Music_logo_black.png" alt=""></div>
    <el-menu style="background:#00ced1;border-right:none;" router>
      <!-- 路由设置就是给其设置一个router属性 值为布尔值 可省略  子项设置index-->
      <el-menu-item>发现音乐</el-menu-item>
      <el-menu-item>私人FM</el-menu-item>
      <el-menu-item>iTunes音乐</el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <span>下载管理</span>
        </template>
        <el-menu-item index='/home/a'>会员专属</el-menu-item>
        <el-menu-item index='/home/b'>正在下载</el-menu-item>
        <el-menu-item index='/home/c'>历史漫游</el-menu-item>
        <el-menu-item index='/home/d'>本地音乐</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
           <template slot="title">
          <span>我的收藏</span>
        </template>
        <el-menu-item index='/home/e'>旋律控</el-menu-item>
        <el-menu-item index='/home/f'>神仙翻唱</el-menu-item>
        <el-menu-item index='/home/g'>程序员</el-menu-item>
        <el-menu-item index='/home/h'>OST精选</el-menu-item>
      </el-submenu>
      <el-menu-item>播放历史</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.title {
  padding-top: 20px;
  text-align: center;
  img {
    height: 34px;
  }
}
</style>
