export default [
  {
    path: '/map/draw-polygon',
    name: 'DrawPolygon',
    component: () => import('@/views/baidu-map/DrawPolygon')
  },
  {
    path: '/map/render-track',
    name: 'RenderTrack',
    component: () => import('@/views/baidu-map/RenderTrack')
  }
]
