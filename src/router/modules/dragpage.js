/** 练习路由地址 **/

import Layout from '@/layout'

const dragPageRouter = {
  path: '/DragPage',
  component: Layout,
  redirect: 'noRedirect',
  name: 'DragPage',
  meta: {
    title: '人机界面',
    icon: 'component'
  },
  children: [
    {
      path: 'dragPage',
      component: () => import('@/views/dragpage/DragPage'),
      name: 'dragPage',
      meta: { title: '树形管理界面' }
    }
  ]
}

export default dragPageRouter
