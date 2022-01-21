import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "/cooking", component: () => import("pages/Cooking.vue") },
      { path: "/friends", component: () => import("pages/Friends.vue") },
      { path: "/add-product", component: () => import("pages/AddProduct.vue") },
      { path: "/account", component: () => import("pages/Account.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
