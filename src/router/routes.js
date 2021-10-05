
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
    ]
  },
  { path: '/game', name: 'game', component: () => import('pages/Index.vue'), props: true },
  { path: '/statistic', name: 'statistic', component: () => import('pages/Statistic.vue'), props: true },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
