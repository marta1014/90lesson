import router from '../../router'
import progress from 'nprogress'// 引入插件
import 'nprogress/nprogress.css'
router.beforeEach(function (to, from, next) {
  progress.start()// 开启进度条
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
  if (to.path === ('/') || to.path.startsWith('/login')) {
    window.localStorage.removeItem('user-token')
  }
})
// 前置导航守卫
router.afterEach(function () {
  progress.done()// 关闭进度条
})
