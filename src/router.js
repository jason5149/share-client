export default {
  mode:   'history',
  routes: [
    { path: '/', redirect: () => '/home' },
    { path: '/auth', name: 'auth', component: () => import('@page/auth') },
    { path: '/home', name: 'home', component: () => import('@page/home') },
  ]
}