<template>
<div>
    <el-container>
    <el-aside style="background:#00ced1;min-height:100vh;" width="200px"><asideIn></asideIn></el-aside>
    <el-container>
        <el-header style="background:#00ced1;"><headerIn></headerIn></el-header>
        <el-main>
            <!-- 放置二级路由容器 -->
            <router-view></router-view>
            </el-main>
    </el-container>
    </el-container>
</div>
</template>

<script>
export default {}
</script>
