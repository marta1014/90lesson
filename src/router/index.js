import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'
import Home from '../views/home'
import homeA from '../views/home/home-a.vue'// 导入二级组件
Vue.use(VueRouter)

const routes = [// 配置路由
  {
    path: '/',
    component: Login
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    // 配置二级路由
    // path不写路径 默认跳转
    children: [{ path: '', component: homeA },
      { path: '/home/a', component: () => import('../views/articles/index.vue') },
      { path: '/home/b', component: () => import('../views/publish/index.vue') }, // 发布文章
      { path: '/home/c', component: () => import('../views/comment/index.vue') },
      { path: '/home/d', component: () => import('../views/material/index.vue') },
      { path: '/home/b/:id', component: () => import('../views/publish/index.vue') }// 修改文章
    ]
  }
  // {
  // path: '/about',
  // name: 'about',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
