export default [
  {
    path: '/interview/list',
    name: 'List',
    component: () => import('@/views/interview/List')
  },
  {
    path: '/interview/detail',
    name: 'Detail',
    component: () => import('@/views/interview/Detail')
  }
]
