const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const userList = r => require.ensure([], () => r(require('@/page/components/_table_user')), 'userList');
const userChange = r => require.ensure([], () => r(require('@/page/components/_user_change')), 'userChange');
const couponList = r => require.ensure([], () => r(require('@/page/components/_table_coupon')), 'couponList');
const couponChange = r => require.ensure([], () => r(require('@/page/components/_coupon_change')), 'couponAdd');
const couponSet = r => require.ensure([], () => r(require('@/page/components/_coupon_set')), 'couponSet');

const accountManage = r => require.ensure([], () => r(require('@/page/components/_table_account')), 'accountManage'); // 账户管理
const roleManage = r => require.ensure([], () => r(require('@/page/components/_table_role')), 'roleManage'); // 角色管理
const accessManage = r => require.ensure([], () => r(require('@/page/components/_table_access')), 'accessManage'); // 权限管理
const entryManage = r => require.ensure([], () => r(require('@/page/components/_table_entry')), 'entryManage'); // 入口目录管理


// 复制的角色管理，尝试工程化，代码复用处理table页的增删改查，最终会删掉
const roleMixManage = r => require.ensure([], () => r(require('@/page/components/_table_role_mix')), 'roleMixManage'); // 角色mix管理

export default [{
        path: '/login',
        name: '',
        component: login
    },
    {
        path: '/manage',
        component: manage,
        name: '',
        children: [{
                path: '/user',
                component: userList,
                meta: { requiresAuth: true }
            },
            {
                path: '/userChange',
                component: userChange,
                name: 'userChange',
                meta: { requiresAuth: true }
            },
            {
                path: '/coupon',
                component: couponList,
                meta: { requiresAuth: true }
            },
            {
                path: '/couponChange',
                name: 'couponChange',
                component: couponChange,
                meta: { requiresAuth: true }
            },
            {
                path: '/couponSet',
                component: couponSet,
                meta: { requiresAuth: true }
            },
            {
                path: '/accountManage',
                component: accountManage,
                meta: { requiresAuth: true }
            },
            {
                path: '/roleManage',
                component: roleManage,
                meta: { requiresAuth: true }
            },
            {
                path: '/roleMixManage',
                component: roleMixManage,
                meta: { requiresAuth: true }
            },
            {
                path: '/accessManage',
                component: accessManage,
                meta: { requiresAuth: true }
            },
            {
                path: '/entryManage',
                component: entryManage,
                meta: { requiresAuth: true }
            }
        ]
    }
];
