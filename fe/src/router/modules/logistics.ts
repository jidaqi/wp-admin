/*
 * @Author: Peihua
 * @Date: 2024-12-09 11:40:51
 * @LastEditors: Peihua
 * @LastEditTime: 2024-12-23 00:49:43
 * @FilePath: \fe\src\router\modules\logistics.ts
 * @Description: 物流模块路由配置
 */
import Layout from '@/layouts/index.vue';
import truckIcon from '@/assets/truck-cargo-container.svg';

export default [
  {
    path: '/logistics',
    name: 'logistics',
    component: Layout,
    redirect: '/logistics/index',
    meta: { title: '菜鸟物流订单', icon: truckIcon, single: true },
    children: [
      {
        path: 'index',
        name: 'LogisticsIndex',
        component: () => import('@/pages/logistics/index.vue'),
        meta: { title: '菜鸟物流订单' },
      },
      {
        path: 'edit',
        name: 'LogisticsEdit',
        component: () => import('@/pages/logistics/edit/index.vue'),
        meta: { title: '创建物流单' },
      },
    ],
  },
];
