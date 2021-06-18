import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import Login from '../views/login/index'
import Saler from '../views/dashboard/saler'
import User from '../views/dashboard/user'
import  Comment  from  '../views/manage/user/comment'
import List from '../views/manage/user/list'
import Trolly from '../views/manage/user/trolly'
/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Login,
        redirect: '/login',
        name: 'Login',
        hidden: true,
        children: [{
            path: 'login',
            component: () =>
                import ('@/views/login/index')
        }]

    },
    {
        path: '/shop',
        component: User,
        redirect: '/shop',
        name: 'Shop',
        hidden: true,
        children: [{
            path: 'user',
            component: () =>
                import ('@/views/dashboard/user')
        }]

    }, {
        path: '/user',
        component: Trolly,
        redirect: '/user',
        name: 'User',
        hidden: true,
        children: [

            {
                path: 'trolly',
                component: () =>
                    import ('@/views/manage/user/trolly')
            }
        ]

    },
    {    
        path:   '/user',
            component:  Comment,
            redirect:   '/user',
            name:   'User',
            hidden:  true,
            children:  [          {      
            path:   'comment',
                  component:  ()  =>  
                import ('@/views/manage/user/comment')    
        }  ]      
    }, {
        path: '/user',
        component: List,
        redirect: '/user',
        name: 'User',
        hidden: true,
        children: [

            {
                path: 'list',
                component: () =>
                    import ('@/views/manage/user/list')
            }
        ]

    },
    {
        path: '/saler',
        component: Saler,
        redirect: '/saler',
        name: 'Saler',
        hidden: true,
        children: [{
            path: 'saler',
            component: () =>
                import ('@/views/dashboard/saler')
        }]

    },
    {
        path: '/dashboard',
        component: Layout,
        redirect: '/dashboard',
        name: 'Dashboard',
        hidden: true,
        children: [{
            path: 'dashboard',
            component: () =>
                import ('@/views/dashboard/index')
        }]

    },
    {
        path: '/register',
        component: () =>
            import ('@/views/manage/user/register'),
        hidden: true
    },
    {
        path: '/register_saler',
        component: () =>
            import ('@/views/manage/saler/register'),
        hidden: true
    },

    {
        path: '/manage1',
        component: Layout,
        redirect: '/manage1/admin',
        name: '审核',
        meta: { title: '审核', icon: 'example' },
        children: [{
                path: 'u_list',
                name: '用户注册',
                component: () =>
                    import ('@/views/manage/admin/u_list'),
                meta: { title: '用户注册', icon: 'table' }
            },
            {
                path: 's_list',
                name: '商家注册',
                component: () =>
                    import ('@/views/manage/admin/s_list'),
                meta: { title: '商家注册', icon: 'table' }
            },
            {
                path: 'g_list',
                name: '商家商品',
                component: () =>
                    import ('@/views/manage/admin/g_list'),
                meta: { title: '商家商品', icon: 'table' }
            }
        ]
    }, {
        path: '/manage2',
        component: Layout,
        redirect: '/manage2/admin',
        name: '管理',
        meta: { title: '管理', icon: 'example' },
        children: [{
                path: 'userlist',
                name: '用户列表',
                component: () =>
                    import ('@/views/manage/admin/userlist'),
                meta: { title: '用户列表', icon: 'table' }
            },
            {
                path: 'u_update/:id',
                name: '用户编辑',
                component: () =>
                    import ('@/views/manage/admin/u_update'),
                meta: { title: '用户编辑', noCache: true },
                hidden: true
            },
            {
                path: 'salerlist',
                name: '商家等级列表',
                component: () =>
                    import ('@/views/manage/admin/salerlist'),
                meta: { title: '商家等级列表', icon: 'table' }
            },
            // {
            //   path: 's_update/:id',
            //   name: '商家等级评定',
            //   component: () => import('@/views/manage/admin/s_update'),
            //   meta: { title: '商家等级评定', noCache:true },
            //   hidden:true
            // }
        ]
    },
    // {
    //   path: '/manage2',
    //   component: Layout,
    //   redirect: '/manage2/admin',
    //   name: '管理',
    //   meta: { title: '管理', icon: 'example' },
    //   children: [
    //     {
    //       path: 'userlist',
    //       name: '用户列表',
    //       component: () => import('@/views/manage/admin/userlist'),
    //       meta: { title: '用户列表', icon: 'table' }
    //     },
    //     {
    //       path: 'u_update/:id',
    //       name: '用户编辑',
    //       component: () => import('@/views/manage/admin/u_update'),
    //       meta: { title: '用户编辑', noCache:true },
    //       hidden:true
    //     }
    //   ]
    // }, {
    //   path: '/manage3',
    //   component: Layout,
    //   redirect: '/manage3/admin',
    //   name: '管理',
    //   meta: { title: '管理', icon: 'example' },
    //   children: [
    //     {
    //       path: '',
    //       name: '商家等级列表',
    //       component: () => import('@/views/manage/admin/salerlist'),
    //       meta: { title: '商家等级列表', icon: 'table' }
    //     },
    //     {
    //       path: 's_update/:id',
    //       name: '商家等级评定',
    //       component: () => import('@/views/manage/admin/s_update'),
    //       meta: { title: '商家等级评定', noCache:true },
    //       hidden:true
    //     }
    //   ]
    // },



    { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})