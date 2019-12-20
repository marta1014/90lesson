import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'// 导入安装的依赖包
import 'element-ui/lib/theme-chalk/index.css' // 引入ele样式文件
import '../src/style/index.less'
import component from './components'// 引入
import axios from 'axios' // 引入包
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'// 常态值的优化
Vue.prototype.$http = axios // 实现全局共享
Vue.config.productionTip = false
Vue.use(ElementUI) // 全局注册ele
Vue.use(component)// 全局注册

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
