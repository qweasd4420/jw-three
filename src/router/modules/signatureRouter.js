import Layout from '@/layout'

const signatureRouter = {
  path: '/Signature',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Signature',
  meta: {
    title: '电子文件签章',
    icon: 'component'
  },
  children: [
    {
      path: 'Approval',
      component: () => import('@/views/signature/Approval'),
      name: 'Approval',
      meta: { title: '电子印章审批' }
    },
    {
      path: 'Manage',
      component: () => import('@/views/signature/Manage'),
      name: 'Manage',
      meta: { title: '电子印章管理' }
    },
    {
      path: 'EleDocSign',
      component: () => import('@/views/signature/EleDocSign'),
      name: 'EleDocSign',
      meta: { title: '电子文件签章' }
    },
    {
      path: 'SignTest',
      component: () => import('@/views/signature/SignTest'),
      name: 'SignTest',
      meta: { title: '测试' }
    },
    {
      path: 'TableTest',
      component: () => import('@/views/signature/TableTest'),
      name: 'TableTest',
      meta: { title: '表格生成' }
    }
  ]
}

export default signatureRouter
