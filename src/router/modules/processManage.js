import Layout from '@/layout'

const processRouter = {
  path: '/Process',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Process',
  meta: {
    title: '签章流程管理',
    icon: 'component'
  },
  children: [
    {
      path: 'ApprovalProcessManage',
      component: () => import('@/views/signature/ApprovalProcessManage'),
      name: 'ApprovalProcessManage',
      meta: { title: '审批流程管理' }
    },
    {
      path: 'SignProcessManage',
      component: () => import('@/views/signature/SignProcessManage'),
      name: 'SignProcessManage',
      meta: { title: '签署流程管理' }
    },
    {
      path: 'SignTest',
      component: () => import('@/views/signature/SignTest'),
      name: 'SignTest',
      meta: { title: '测试打开pdf' }
    }
  ]
}

export default processRouter
