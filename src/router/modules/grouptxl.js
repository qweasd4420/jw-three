import Layout from '@/layout'
import GroupTxl from '../../views/test/grouptxl'

const groupRouter = {
  path: '/grouptxl',
  component: Layout,
  redirect: 'noRedirect',
  name: 'grouptxl',
  meta: {
    title: '测试',
    icon: 'component'
  },
  children: [
    {
      path: 'GroupTxl',
      component: GroupTxl,
      name: 'GroupTxl',
      meta: { title: 'SQL编辑' }
    }
  ]
}

export default groupRouter
