
export default [
  {
    name: 'Home',
    path: '/',
    component: require('@/views/home/index').default,
  },
  {
    name: 'Category',
    path: '/category/:cid',
    component: require('@/views/home/index').default,
  },
  {
    name: 'Detail',
    path: '/detail/:art_id',
    component: require('@/views/detail/index').default,
    meta: {
      title: ''
    }
  },
  {
    name: 'Achievement',
    path: '/achievement',
    component: require('@/views/achievement/index').default,
    meta: {
      title: ''
    }
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
  {
    name: 'Mine',
    path: '/mine',
    component: require('@/views/mine/index').default,
  },
  {
    name: 'Inviter',
    path: '/inviter',
    component: require('@/views/invite/inviter').default,
  },
  {
    name: 'Invitee',
    path: '/invitee',
    component: require('@/views/invite/invitee').default,
  }

]
