import Vue from 'vue'
import Router from 'vue-router'

// 首页
import home from '../page/home'

// 课程介绍
import Curriculum from '../page/curriculum'

// 客户端下载
import Client from '../page/client'

// 介绍
import china from '../page/china'
import landscape from '../page/china/landscape'
import story from '../page/china/story'
import newchina from '../page/china/newchina'
import art from '../page/china/art'
import chinafood from '../page/china/chinafood'
import folk from '../page/china/folk'
import poetry from '../page/china/poetry'
import recite from '../page/china/recite'

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
import Guide from '../page/study/guide'
import Details from '../page/study/details'
import MyScore from '../page/study/myscore'

import Cart from '../page/study/cart'
import Pay from '../page/study/pay'

import MyCourse from '../page/study/mycourse'
import Undone from '../page/study/children/undone'
import Complete from '../page/study/children/complete'

import Reservation from '../page/study/reservation'
import Onebyone from '../page/study/children/onebyone'
import Onebyfour from '../page/study/children/onebyfour'
import Test from '../page/study/children/test'

// 个人中心
import Ucenter from '../page/usercenter'

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
      redirect: '/home'
    },
    //首页
    {
      path: '/home',
      component: home
    },
    //客户端下载
    {
      path: '/client',
      component: Client
    },
    //课程体系
    {
      path: '/curriculum',
      component: Curriculum
    },
    //介绍
    {
      path: '/china',
      component: china,
      redirect: '/china/landscape',
      children: [{
        path: 'landscape',
        component: landscape
      },
      {
        path: 'story',
        component: story
      },
      {
        path: 'newchina',
        component: newchina
      },
      {
        path: 'art',
        component: art
      },
      {
        path: 'chinafood',
        component: chinafood
      },
      {
        path: 'folk',
        component: folk
      },
      {
        path: 'poetry',
        component: poetry
      },
      {
        path: 'recite',
        component: recite
      }]
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
    // 个人中心
    {
      path: '/usercenter',
      component: Ucenter
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
      // 预约课程
      {
        path: 'reservation',
        component: Reservation,
        children: [{
          path: 'onebyone',
          component: Onebyone
        },
        {
          path: 'onebyfour',
          component: Onebyfour
        },
        {
          path: 'test',
          component: Test
        }]
      },
      // 课前指导
      {
        path: 'guide',
        component: Guide
      },
      // 课时明细
      {
        path: 'details',
        component: Details
      },
      // 我的成绩
      {
        path: 'myscore',
        component: MyScore
      },
      // 购买课程
      {
        path: 'cart',
        component: Cart
      },
      {
        path: 'pay',
        component: Pay
      }]
    }
  ]
})