import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'// 导入安装的依赖包
import 'element-ui/lib/theme-chalk/index.css' // 引入ele样式文件
import '../src/style/index.less'
Vue.config.productionTip = false
Vue.use(ElementUI) // 全局注册ele

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
