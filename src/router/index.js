import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/user',
            name: 'user',
            components: {
                top: () =>
                    import ('../components/common/topbar'),
                bar: () =>
                    import ('../components/common/leftbar'),
                content: () =>
                    import ('../components/user/user')
            },
            meta: { requiresAuth: true }
        },
        {
            path: '/task',
            name: 'task',
            components: {
                top: () =>
                    import ('../components/common/topbar'),
                bar: () =>
                    import ('../components/common/leftbar'),
                content: () =>
                    import ('../components/task/task')
            },
            meta: { requiresAuth: true }
        },
        {
            path: '/server',
            name: 'server',
            components: {
                top: () =>
                    import ('../components/common/topbar'),
                bar: () =>
                    import ('../components/common/leftbar'),
                content: () =>
                    import ('../components/server/server')
            },
            meta: { requiresAuth: true }
        },
        {
            path: '/group',
            name: 'group',
            components: {
                top: () =>
                    import ('../components/common/topbar'),
                bar: () =>
                    import ('../components/common/leftbar'),
                content: () =>
                    import ('../components/group/group')
            },
            meta: { requiresAuth: true }
        },
        {
            path: '/detail',
            name: 'detail',
            components: {
                top: () =>
                    import ('../components/common/topbar'),
                bar: () =>
                    import ('../components/common/leftbar'),
                content: () =>
                    import ('../components/server/detial')
            }
        },
        {
            path: '/console',
            name: 'console',
            components: {
                top: () =>
                    import ('../components/common/topbar'),
                bar: () =>
                    import ('../components/common/leftbar'),
                content: () =>
                    import ('../components/console/console')
            }
        },
        {
            path: '/shell',
            name: 'shell',
            components: {
                top: () =>
                    import ('../components/common/topbar'),
                bar: () =>
                    import ('../components/common/leftbar'),
                content: () =>
                    import ('../components/console/shell')
            }
        },
        {
            path: '/monitor',
            name: 'monitor',
            components: {
                top: () =>
                    import ('../components/common/topbar'),
                bar: () =>
                    import ('../components/common/leftbar'),
                content: () =>
                    import ('../components/monitor/monitor')
            }
        },
        {
            path: '*',
            name: '*',
            component: () =>
                import ('../components/common/Error')
        },
    ]
})