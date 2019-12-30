<template>
  <div>
      <div class="title"><img :src="collapseA ? bigImg : smallImg" alt=""></div>
    <el-menu style="background:#00ced1;border-right:none;" router :collapse="!collapseA">
      <!-- 路由设置就是给其设置一个router属性 值为布尔值 可省略  子项设置index-->
      <el-menu-item index="/home"><i class="el-icon-s-home"></i><span>发现音乐</span></el-menu-item>
      <el-menu-item index="/home/j"><i class="el-icon-s-grid"></i><span>私人FM</span></el-menu-item>
      <el-menu-item><i class="el-icon-s-opportunity"></i><span>iTunes音乐</span></el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-share"></i>
          <span>下载管理</span>
        </template>
        <el-menu-item index='/home/a'>会员专属</el-menu-item>
        <el-menu-item index='/home/b'>正在下载</el-menu-item>
        <el-menu-item index='/home/c'>历史漫游</el-menu-item>
        <el-menu-item index='/home/d'>本地音乐</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
           <template slot="title">
             <i class="el-icon-loading"></i>
          <span>我的收藏</span>
        </template>
        <el-menu-item index='/home/e'>旋律控</el-menu-item>
        <el-menu-item index='/home/f'>神仙翻唱</el-menu-item>
        <el-menu-item index='/home/g'>程序员</el-menu-item>
        <el-menu-item index='/home/h'>OST精选</el-menu-item>
      </el-submenu>
      <el-menu-item index="/home/i"><i class="el-icon-edit"></i><span>播放历史</span></el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bigImg: require('../../assets/img/Apple_Music_logo_black.png'),
      smallImg: require('../../assets/img/collect.png')
    }
  },
  props: ['collapseA']// 接收传递值把它作为文字是否隐藏的条件
}
</script>

<style lang="less" scoped>
.title {
  padding-top: 20px;
  padding-left: 10px;
  text-align: center;
  img {
    height: 34px;
  }
}
</style>
