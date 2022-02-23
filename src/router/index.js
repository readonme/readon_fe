export default [
  {
    name: 'Home',
    path: '/',
    component: require('@/views/home/index').default,
  },
  {
    name: 'Login',
    path: '/login',
    component: require('@/views/login/login').default,
  },
  {
    name: 'Register',
    path: '/register',
    component: require('@/views/login/register').default,
  },
  {
    name: 'Wallet',
    path: '/wallet',
    component: require('@/views/components/wallet').default,
  },

]
