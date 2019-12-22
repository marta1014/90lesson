import asideview from './home-aside/aside-view.vue'
import headerview from './home-header/header-view.vue'
import breadcrumb from './bread-s/index.vue'
export default {
  install (Vue) { // 切记install方法的格式
    Vue.component('asideIn', asideview)
    Vue.component('headerIn', headerview)
    Vue.component('breadcrumb', breadcrumb)
  }
}
