import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: "", component: () => import("pages/Index.vue"), name: 'home' },
      { path: "/cooking/:username", component: () => import("pages/Cooking.vue") },
      { path: "/friends", component: () => import("pages/Friends.vue")},
      { path: "/add-product", component: () => import("pages/AddProduct.vue") },
      { path: "/account", component: () => import("pages/Account.vue"),
          children:[
            { path: "/account-info", component: () => import("pages/AccountInfo.vue") },
            { path: "/claimed-products", component: () => import("pages/ClaimedProducts.vue") },
          ]
      },
      { path: "/group/:group", component: () => import("pages/FriendGroup.vue") },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),
    children:[
      { path: "/login", component: () => import("pages/Login.vue"), name: "login" },
      { path: "/register", component: () => import("pages/Register.vue"), name: "register" },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
    name: "404"
  },
];

export default routes;
