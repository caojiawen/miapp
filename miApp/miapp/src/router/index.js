import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index/Index'
import ClassIfy from '@/components/classIfy/classIfy'
import Cart from '@/components/Cart/Cart'
import My from '@/components/My/My'
import detail from '@/components/detail/detail'
import login from '@/components/My/login/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'Index',
      component: Index,
      meta: {
        tabbar: true
      }
    },
    {
      path:'/',
      component:Index,
      meta: {
        tabbar: true
      }
    },
    {
      path: '/classIfy',
      name: 'ClassIfy',
      component: ClassIfy,
      meta: {
        tabbar: true
      }
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
      meta: {
        tabbar: true
      }
    },
    {
      path: '/my',
      name: 'My',
      component: My,
      meta: {
        tabbar: true
      }
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail,
      meta: {
        tabbar: false
      }
    },
    {
      path:'/login',
      name:'login',
      component:login,
      meta:{
        tabbar:false
      }
    }
  ]
})
