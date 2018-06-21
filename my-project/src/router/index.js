import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/views/HelloWorld'
import secondponents from '@/components/views/secondponents'
import wow from '@/components/views/wow'
import firstcomponents from '@/components/views/firstcomponents'
import form from '@/components/views/form'
import table from '@/components/views/table'
import menu from '@/components/views/menu'
import sale from '@/components/views/sale.vue'
import home from '@/components/home.vue'
import demo_1 from '@/components/views/demo_1.vue'
import demo_2 from '@/components/views/demo_2.vue'
import demo_3 from '@/components/views/demo_3.vue'
import marketactions from '@/components/views/marketactions.vue'
import brandactions from '@/components/views/brandactions.vue'
import com from '@/components/views/component.vue'





Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: home,
    
    },
    {
      path: '/sale',
      name: 'sale',
      component: sale
    },
    {
      path: '/demo_1',
      name: 'demo_1',
      component: demo_1
    },
    {
      path: '/demo_2',
      name: 'demo_2',
      component: demo_2
    },
    {
      path: '/demo_3',
      name: 'demo_3',
      component: demo_3
    },
    {
      path: '/first',
      name: 'first',
      component: firstcomponents
    },
    {
      path: '/form',
      name: 'form',
      component: form
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/marketactions',
      name: 'marketactions',
      component: marketactions
    },
    {
      path: '/brandactions',
      name: 'brandactions',
      component: brandactions
    },
    {
      path: '/table',
      name: 'table',
      component: table
    },
    {
      path: '/com',
      name: 'com',
      component: com
    }
  ]
})
