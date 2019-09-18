import Layout from '@/layout'
import grouptxl from '../../views/test/grouptxl'

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
      path: 'grouptxl',
      component: grouptxl,
      name: 'grouptxl',
      meta: { title: 'SQL编辑' }
    }
  ]
}

export default groupRouter
