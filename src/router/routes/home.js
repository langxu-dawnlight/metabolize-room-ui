const routes = [
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/index'),
      children: [
        {
          path: 'room/:id',
          component: () => import('@/views/home/room'),
          meta: { title: 'room' },
        },
       
      ]
    }
  ]
  
  export default routes
  