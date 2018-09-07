import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import login from '@/components/login'
import register from '@/components/register'
import notFound from '@/components/notFound'
import remarkManage from '@/components/remarkManage/list'
import orderListFront from '@/components/orderListFront/orderList'
import userManage from '@/components/userManage/userManage'
import blogManage from '@/components/blogManage/list'
import addBlog from '@/components/blogManage/addBlog'
import editBlog from '@/components/blogManage/editBlog'
import praiseManage from '@/components/praiseManage'
import collectManage from '@/components/collectManage/list'
import accountManage from '@/components/accountManage'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'login',
            component: login
        }, {
            path: '/login',
            name: 'login',
            component: login
        },
        // register
        {
            path: '/register',
            component: register,
            name: 'register'
        },
        {
            path: '/home',
            name: 'home',
            component: home,
            children: [
                // 用户管理
                {
                    path: '/userManage',
                    component: userManage,
                    name: 'userManage'
                },
                // 博客管理
                {
                    path: '/blogManage',
                    component: blogManage,
                    name: 'blogManage'
                },
                // 添加博客
                {
                    path: '/blogManage/addBlog',
                    component: addBlog,
                    name: addBlog
                },
                // 编辑博客
                {
                    path: '/blogManage/editBlog',
                    component: editBlog,
                    name: editBlog
                },
                // 评论管理
                {
                    path: '/remarkManage',
                    component: remarkManage,
                    name: 'remarkManage'
                },
                // 点赞管理
                {
                    path: '/praiseManage',
                    component: praiseManage,
                    name: 'praiseManage'
                },
                // 收藏管理
                {
                    path: '/collectManage',
                    component: collectManage,
                    name: 'collectManage'
                },
                // 账户管理
                {
                    path: '/accountManage',
                    component: accountManage,
                    name: 'accountManage'
                },
                // page7
                {
                    path: '/orderListFront',
                    component: orderListFront,
                    name: 'orderListFront'
                },
                // 404
                {
                    path: '/notFound',
                    component: notFound,
                    name: 'notFound'
                }
            ]
        },
        {
            path: '*',
            redirect: { path: '/notFound' }
        }
    ]
})