/**
 * Created by yh on 2021/7/19
 */
export default [
    {
        path : '/topology',
        name : 'topology',
        component : () => import('./views/topology-editor'),
        meta: {
            title: 'examples-topology',
        },
    },
    {
        path : '/lib-topology',
        name : 'lib-topology',
        component : () => import('./views/topology-editor-lib'),
        meta: {
            title: 'examples-lib-topology',
        },
    },
    {
        path : '/topology-view',
        name : 'topology-view',
        component : () => import('./views/topology-view'),
        meta: {
            title: 'examples-topology-view',
        },
    },
    {
        path : '/markdown',
        name : 'markdown',
        component : () => import('./views/markdown-editor'),
        meta: {
            title: 'examples-markdown',
        },
    },
    {
        path : '/lib-markdown',
        name : 'lib-markdown',
        component : () => import('./views/markdown-editor-lib'),
        meta: {
            title: 'examples-lib-markdown',
        },
    },

]