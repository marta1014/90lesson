<template>
  <div>
      <div class="title"><img src="" alt=""></div>
    <el-menu style="background:#808080;border-right:none;" router>
      <!-- 路由设置就是给其设置一个router属性 值为布尔值 可省略  子项设置index-->
      <el-menu-item>梦里</el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <span>失眠</span>
        </template>
        <el-menu-item index='/home/a'>3</el-menu-item>
        <el-menu-item index='/home/b'>3</el-menu-item>
        <el-menu-item index='/home/c'>3</el-menu-item>
        <el-menu-item index='/home/d'>3</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
           <template slot="title">
          <span>变化</span>
        </template>
        <el-menu-item index='/home/e'>2</el-menu-item>
        <el-menu-item index='/home/f'>2</el-menu-item>
        <el-menu-item index='/home/g'>2</el-menu-item>
        <el-menu-item index='/home/h'>2</el-menu-item>
      </el-submenu>
      <el-menu-item>花落</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
