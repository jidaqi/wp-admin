/*
 * @Author: Peihua
 * @Date: 2024-12-28 23:49:34
 * @LastEditors: Peihua
 * @LastEditTime: 2024-12-28 23:54:02
 * @FilePath: \fe\src\router\modules\account.ts
 * @Description: 账号模块路由配置
 */
import Layout from '@/layouts/index.vue';
import accountIcon from '@/assets/account-box-multiple-outline.svg';

export default [
  {
    path: '/account',
    name: 'account',
    component: Layout,
    redirect: '/account/index',
    meta: { title: '账号管理', icon: accountIcon, single: false },
    children: [
      {
        path: 'index',
        name: 'AccountIndex',
        component: () => import('@/pages/account/index.vue'),
        meta: { title: '账号列表' },
      },
    ],
  },
];
 