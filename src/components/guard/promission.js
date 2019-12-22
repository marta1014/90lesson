import router from '../../router'

router.beforeEach(function (to, from, next) {
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
