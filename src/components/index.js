import asideview from './home-aside/aside-view.vue'
import headerview from './home-header/header-view.vue'
import breadcrumb from './bread-s/index.vue'
import coverImage from '../components/publish/cover-image.vue'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  install (Vue) { // 切记install方法的格式
    Vue.component('asideIn', asideview)// 侧栏
    Vue.component('headerIn', headerview)// 头部
    Vue.component('breadcrumb', breadcrumb)// 面包屑
    Vue.component('quill-editor', quillEditor)// 注册全局富文本编辑器
    Vue.component('cover-image', coverImage)// 封面组件
  }
}
