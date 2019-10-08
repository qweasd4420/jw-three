import Layout from '@/layout'

const groupRouter = {
  path: '/GroupTxl',
  component: Layout,
  redirect: 'noRedirect',
  name: 'GroupTxl',
  meta: {
    title: '测试',
    icon: 'component'
  },
  children: [
    {
      path: 'CodeMirror',
      component: () => import('@/views/test/CodeMirror'),
      name: 'CodeMirror',
      meta: { title: 'SQL编辑' }
    }
  ]
}

export default groupRouter
