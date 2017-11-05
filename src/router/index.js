import Vue from 'vue'
import Router from 'vue-router'

// 首页
import home from '../page/home'

// 登录
import login from '../page/login'
import tabmail from '../page/login/tabmail'
import tabtel from '../page/login/tabtel'
// --------------------------------------------

// 注册
import register from '../page/register'
import regmail from '../page/register/regmail'
import regtel from '../page/register/regtel'
// --------------------------------------------

// 学习页
import Study from '../page/study'
import MyCourse from '../page/study/mycourse'
import Reservation from '../page/study/reservation'
import Guide from '../page/study/guide'
import Cart from '../page/study/cart'
import Pay from '../page/study/pay'
import Undone from '../page/study/children/undone'
import Complete from '../page/study/children/complete'

// --------------------------------------------

// 购买页
// import Cart from '../page/cart'
// import Pay from '../page/cart/pay'

// --------------------------------------------

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    //首页
    {
      path: '/home',
      component: home
    },
    //登录
    {
      path: '/login',
      component: login,
      redirect: '/login/tabmail',
      children: [{
          path: 'tabmail',
          component: tabmail
        },
        {
          path: 'tabtel',
          component: tabtel
        }]
    },
    //注册
    {
      path: '/register',
      component: register,
      redirect: '/register/regtel',
      children: [{
          path: 'regmail',
          component: regmail
        },
        {
          path: 'regtel',
          component: regtel
      }]
    },
    //学习
    {
      path: '/study',
      component: Study,
      redirect: '/study/mycourse',
      children: [{
        path: 'mycourse',
        component: MyCourse,
        redirect: '/study/mycourse/undone',
        children: [{
          path: 'undone',
          component: Undone
        },
        {
          path: 'complete',
          component: Complete
        }]
      },
      {
        path: 'reservation',
        component: Reservation
      },
      {
        path: 'guide',
        component: Guide
      },
      {
        path: 'cart',
        component: Cart
      },
      {
        path: 'pay',
        component: Pay
      }]
    },
    //购买中心
    // {
    //   path: '/cart',
    //   component: Cart,
    //   redirect: '/cart',
    //   children: [{
    //     path: 'pay',
    //     component: Pay
    //   }]
    // }
  ]
})