/** 练习路由地址 **/

import Layout from '@/layout'

const practiceRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Practice',
  meta: {
    title: '页面练习',
    icon: 'component'
  },
  children: [
    {
      path: 'Hello',
      component: () => import('@/views/practice/Hello'),
      name: 'Hello',
      meta: { title: '页面练习' }
    },
    {
      path: 'Hello2',
      component: () => import('@/views/practice/Hello2'),
      name: 'Hello2',
      meta: { title: '页面练习2' }
    }
  ]
}

export default practiceRouter
