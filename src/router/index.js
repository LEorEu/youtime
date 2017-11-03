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
import Mycourse from '../page/study/mycourse'
import Reservation from '../page/study/reservation'
import Guide from '../page/study/guide'
import Complete from '../page/study/children/complete'
import Nocourse from '../page/study/children/nocourse'

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
        component: Mycourse,
        redirect: '/study/mycourse/complete',
        children: [
          {
            path: 'complete',
            component: Complete
          },
          {
            path: 'nocourse',
            component: Nocourse
          }
        ]
      },
      {
        path: 'reservation',
        component: Reservation,
      },
      {
        path: 'guide',
        component: Guide,
      },
    ] 
    }
  ]
})