import Vue from 'vue'
import Router from 'vue-router'
import Tool from '../assets/lib/Tool'

Vue.use(Router)

const router = new Router({
    routes: [
        // 引导页
        {
            path: '/guide',
            name: 'guide',
            component: resolve => require(['../views/guide/Guide'], resolve), // 用这种方法引用组件可实现懒加载,
            meta: {
                status: 0
            }
        },
        // 首页
        {
            path: '/',
            name: 'home',
            component: resolve => require(['../views/home/Home'], resolve), // 用这种方法引用组件可实现懒加载,
            meta: {
                status: 1
            }
        },
        // 订单
        {
            path: '/order',
            mame: 'order',
            component: resolve => require(['../views/order/Order'], resolve),
            meta: {
                status: 2
            }
        },
        // 我的
        {
            path: '/mine',
            mame: 'mine',
            component: resolve => require(['../views/mine/Mine'], resolve),
            meta: {
                status: 3
            }
        },
        // 登录
        {
            path: '/login',
            mame: 'login',
            component: resolve => require(['../views/auth/Login'], resolve),
            meta: {
                status: 4
            }
        }
    ]
})

/**
 * 判断用户是否第一次打开APP，是否启动引导页面
 * 设置路由之间的跳转动画
 * */
router.beforeEach((to, from, next) => {
    const store = this.a.app.$store
    if (store) {
        if (from.meta.status > to.meta.status) store.commit('SET_ANIMATE_NAME', 'vux-pop-out')
        else store.commit('SET_ANIMATE_NAME', 'vux-pop-in')
    }
    const is_not_first = Tool.dataToLocalStorageOperate.achieve('is_not_first')
        // Tool.dataToLocalStorageOperate.remove('is_not_first')
        // const is_not_first = false // always diaplay guide pages, just for testing
    if (!is_not_first && to.path !== '/guide') next('/guide')
    else if (is_not_first && to.path === '/guide') next('/')
    else next()
})

export default router
