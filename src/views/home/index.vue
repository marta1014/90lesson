<template>
  <div>
    <el-container>
      <el-aside
        style="background:#00ced1;min-height:100vh;transition:all 0.3s"
        :style="{width:spread ? '200px': '50px'}">
        <!-- 侧栏 -->
        <!-- 把父组件的spread属性传递给aside 实现同步变化 -->
        <asideIn :collapseA="spread"></asideIn>
      </el-aside>
      <el-container>
        <el-header style="background:#00ced1;">
            <!-- 头部 -->
          <headerIn></headerIn>
        </el-header>
        <el-main>
          <!-- 放置二级路由容器 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import eventBus from '../../utils/eventbus' // 引入事件池
export default {
  data () {
    return {
      spread: true // 同样定义一个开闭状态
    }
  },
  created () {
    eventBus.$on('changeStatus', () => { // 监听折叠状态
      // 通知组件改变
      this.spread = !this.spread
      console.log(this.spread)
    })
  }
}
</script>
