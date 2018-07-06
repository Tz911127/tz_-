import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import active from './views/nav1/active.vue'
import floor from './views/nav1/floor.vue'
import state from './views/nav1/state.vue'
import activeMaterial from './views/nav2/activeMaterial.vue'
import screenMaterial from './views/nav2/screenMaterial.vue'
import firstPage from './views/nav2/firstPage'
import shopManagement from './views/nav3/shopManagement.vue'
import screenManagement from './views/nav4/screenManagement.vue'
import map from './views/nav5/map.vue'
import account from './views/nav6/account.vue'
import shopCount from './views/nav7/shopCount.vue'
import terminalCount from './views/nav7/terminalCount.vue'
import terminalManagement from './views/nav8/terminalManagement.vue'
import charts from './views/charts/echarts.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '基础管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/state', component: state, name: '业态数据' },
            { path: '/floor', component: floor, name: '楼层数据' },
            { path: '/active', component: active, name: '活动数据' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '商铺管理',
        iconCls: 'el-icon-share',
        leaf: true,
        children: [
            { path: '/shopManagement', component: shopManagement, name: '商铺管理' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '素材管理',
        iconCls: 'el-icon-setting',
        children: [
            { path: '/activeMaterial', component: activeMaterial, name: '活动素材' },
            { path: '/screenMaterial', component: screenMaterial, name: '屏保素材' },
            { path:'/firstPage',component:firstPage,name:'首页轮播'}
            
        ]
    },
    {
        path: '/',
        component: Home,
        name: '屏保管理',
        iconCls: 'el-icon-menu',
        leaf: true,        
        children: [
            { path: '/screenManagement', component: screenManagement, name: '屏保管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '终端管理',
        leaf: true,
        iconCls: 'el-icon-edit',
        children: [
            { path: '/terminalManagement', component: terminalManagement, name: '终端管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '地图管理',
        iconCls: 'el-icon-menu',
        leaf: true,
        children: [
            { path: '/map', component: map, name: '地图管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '账号管理',
        leaf: true,        
        iconCls: 'el-icon-search',
        children: [
            { path: '/account', component: account, name: '账号管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '统计分析',
        iconCls: 'el-icon-document',
        children: [
            { path: '/shopCount', component: shopCount, name: '商铺访问统计' },
            { path: '/terminalCount', component: terminalCount, name: '终端访问统计' }
        ]
    },
    
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;