<template>
<div>
    <el-container>
    <el-aside style="background:#808080;height:100vh;opacity:0.6"><asideIn></asideIn></el-aside>
    <el-container>
        <el-header style="background:#808080;opacity:0.6"><headerIn></headerIn></el-header>
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
